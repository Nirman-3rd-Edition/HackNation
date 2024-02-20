package com.example.binarybrink;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;

public class Map extends AppCompatActivity {

    //initialize variables
    Spinner spType;
    Button btFind;
    SupportMapFragment supportMapFragment;
    GoogleMap map;
    FusedLocationProviderClient fusedLocationProviderClient;
    double currentLat = 0, currentLong = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_map);

//        ActivityCompat.requestPermissions(this,
//                new String[ACCESS_CO]);

        //Assign variable
        spType = findViewById(R.id.sp_type);
        btFind = findViewById(R.id.bt_find);
        supportMapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.google_map);

        //Initilize array of place type
        String[] placeTypeList = {"bank","ev_charging_station", "ev_showroom"};
        //Initilize array of place name
        String[] placeNameList = {"BANK","EV Charging Station", "EV Showroom"};

        //set adapter on spinner
        spType.setAdapter(new ArrayAdapter<>(Map.this, android.R.layout.simple_spinner_dropdown_item, placeNameList));

        //Initialize fused location provider client
        fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(this);
        //check permission
        if (ActivityCompat.checkSelfPermission(Map.this, android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            //when permission granted
            //call method
            getCurrentLocation();
        } else {
            //when permission denied
            //request paemission
            ActivityCompat.requestPermissions(Map.this
                    , new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 44);
        }

        btFind.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //Get selected position of spinner
                int i = spType.getSelectedItemPosition();
                //Initialize url
                String url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json" + //url
                         "?location=" + currentLat + "," + currentLong + //Location latitude and Longitude
                         "&radius=5000" + //Nearby radius
                         "&type=" + placeTypeList[i] + //place type
                         "&sensor=true" + //Sensor
                         "&key=" + getResources().getString(R.string.google_map_key);//Google map key

                //Execute place task method to download json data
                new PlaceTask().execute(url);
            }
        });
    }

    private void getCurrentLocation() {
        //Initialize task location
        if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        Task<Location> task = fusedLocationProviderClient.getLastLocation();
        task.addOnSuccessListener(new OnSuccessListener<Location>() {
            @Override
            public void onSuccess(Location location) {
                //When success
                if(location != null)
                {
                    //When location is not equal to null
                    //get current latitude                   // fetch  // fetch  // fetch  // fetch  // fetch
                    currentLat = location.getLatitude();
                    //get current longitude
                    currentLong = location.getLongitude();
                    //sync map
                    supportMapFragment.getMapAsync(new OnMapReadyCallback() {
                        @Override
                        public void onMapReady(@NonNull GoogleMap googleMap) {
                            //when map is ready
                            map = googleMap;

                            // Enable the "My Location" layer
                            if (ActivityCompat.checkSelfPermission(Map.this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                                map.setMyLocationEnabled(true);
                                // Zoom to current Location on map
                                map.animateCamera(CameraUpdateFactory.newLatLngZoom(
                                        new LatLng(currentLat, currentLong), 15
                                ));
                            } else {
                                ActivityCompat.requestPermissions(Map.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 44);
                            }
//                            // Add marker at current location
//                            map.addMarker(new MarkerOptions().position(new LatLng(currentLat,currentLong)).title("Current Location"));
                            // Add marker at current location with custom icon
//                            MarkerOptions markerOptions = new MarkerOptions()
//                                    .position(new LatLng(currentLat,currentLong))
//                                    .title("Current Location")
//                                    .icon(BitmapDescriptorFactory.fromResource(R.drawable.thunder)); // Replace custom_marker_icon with your custom icon
//                            map.addMarker(markerOptions);
                        }
                    });
                }
            }
        });
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == 44) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                //when permission granted
                //Call method
                getCurrentLocation();
            }
        }
    }

    private class PlaceTask extends AsyncTask<String,Integer,String>
    {
        @Override
        protected String doInBackground(String... strings)
        {
            String data = null;
            try {
                //Initialize data
                data = downloadUrl(strings[0]);
            } catch (IOException e) {
                e.printStackTrace();
            }
            return data;
        }

        @Override
        protected void onPostExecute(String s) {
            //Execute parset task
            new ParserTask().execute(s);
        }
    }

    private String downloadUrl(String string) throws IOException
    {
        //Initialize url
        URL url = new URL(string);
        //Initialize connection
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        //Connect connection
        connection.connect();
        //Initialize input stream
        InputStream stream = connection.getInputStream();
        //Initialize buffer reader
        BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
        //Initialize string builder
        StringBuilder builder = new StringBuilder();
        //Initialize string variable
        String line = "";
        //Use while loop
        while ((line = reader.readLine()) != null)
        {
            //Append line
            builder.append(line);
        }
        //Get append data
        String data = builder.toString();
        //close reader
        reader.close();
        //return data
        return data;
    }

    private class ParserTask extends AsyncTask<String,Integer, List<HashMap<String,String>>>
    {

        @Override
        protected List<HashMap<String, String>> doInBackground(String... strings) {
            //Creating jason parser class object
            JsonParser jsonParser = new JsonParser();
            //Initialize hash map list
            List<HashMap<String,String>> mapList = null;
            JSONObject object = null;
            try {
                //Initialize json object
                object = new JSONObject(strings[0]);
                //Parse jason object
                mapList = jsonParser.parseResult(object);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            //return map list
            return mapList;
        }

        @Override
        protected void onPostExecute(List<HashMap<String, String>> hashMaps) {
                // Clear the map
                map.clear();
            // Enable the "My Location" layer
            if (ActivityCompat.checkSelfPermission(Map.this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                map.setMyLocationEnabled(true);
                // Zoom to current Location on map
                map.animateCamera(CameraUpdateFactory.newLatLngZoom(
                        new LatLng(currentLat, currentLong), 15
                ));
            } else {
                ActivityCompat.requestPermissions(Map.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 44);
            }
                //use for loop
                for (int i = 0; i < hashMaps.size(); i++) {
                    //Initialize hash map
                    HashMap<String, String> hashMapList = hashMaps.get(i);
                    //get latitude
                    double lat = Double.parseDouble(hashMapList.get("lat"));
                    //get longitude
                    double lng = Double.parseDouble(hashMapList.get("lng"));
                    //get name
                    String name = hashMapList.get("name");
                    //contact latitude and longitude
                    LatLng latLng = new LatLng(lat, lng);
                    //Initialize marker options
                    MarkerOptions options = new MarkerOptions();
                    //set position
                    options.position(latLng);
                    //set title
                    options.title(name);
                    //add marker on map
                    map.addMarker(options);
                }
        }
    }
}