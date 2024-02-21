package com.example.sentinex;

import static android.content.ContentValues.TAG;
import androidx.fragment.app.Fragment;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.annotation.SuppressLint;
import android.app.Dialog;
import android.content.Intent;
import android.graphics.drawable.GradientDrawable;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.PopupMenu;
import android.widget.Toast;

import com.example.sentinex.Fragments.AddFragment;
import com.example.sentinex.Fragments.HomeFragment;
import com.example.sentinex.Fragments.NotificationsFragment;
import com.example.sentinex.Fragments.ProfileFragment;
import com.example.sentinex.Fragments.SearchFragment;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.common.GoogleApiAvailabilityLight;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.navigation.NavigationBarView;
import com.google.firebase.auth.FirebaseAuth;

public class MainActivity extends AppCompatActivity {
    private final int CAMERA_REQ_CODE = 100;
    private static final String TAG = "MainActivity";
    // FirebaseAuth auth;
    private static final int ERROR_DIALOG_REQUEST = 9001;
    FirebaseAuth auth;
    BottomNavigationView bottomNavigationView;

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        bottomNavigationView = (BottomNavigationView) findViewById(R.id.bttom_nav);
        FragmentManager fm = (FragmentManager) getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fm.beginTransaction();
        fragmentTransaction.replace(R.id.container, new HomeFragment());
        fragmentTransaction.commit();
        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }
        bottomNavigationView.setOnItemSelectedListener(new NavigationBarView.OnItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                int id = item.getItemId();
                if (id == R.id.nav_home) {
                    loadFragment(new HomeFragment());
                } else if (id == R.id.nav_search) {
                    loadFragment(new SearchFragment());
                }
//                else if (id == R.id.nav_add) {
//                    loadFragment(new AddFragment());
//                }
                else if (id == R.id.nav_notifications) {
                    loadFragment(new NotificationsFragment());
                } else if (id == R.id.nav_profile) {
                    loadFragment(new ProfileFragment());
                }
                return false;
            }
        });

    }


    private void loadFragment(Fragment fragment) {
        FragmentManager fm = (FragmentManager) getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fm.beginTransaction();
        fragmentTransaction.replace(R.id.container, fragment);
        fragmentTransaction.commit();
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
    }



//        Button signupbutton1 = findViewById(R.id.signupbutton1);
//
//        signupbutton1.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Intent icamera = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
//                startActivityForResult(icamera, CAMERA_REQ_CODE);
//            }
//        });
    // Create a GradientDrawable with the desired colors
    //Button btnmap = findViewById(R.id.signupbutton4);  // edit it laater map button
    //done
//        Button signupbutton4 = findViewById(R.id.signupbutton4);
//        signupbutton4.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Intent intent = new Intent(MainActivity.this, UploadActivity.class);
//                startActivity(intent);
//            }
//        });
//        auth =FirebaseAuth.getInstance();
//        if(auth.getCurrentUser()==null)
//
//        {
//            Intent intent = new Intent(MainActivity.this, login.class);
//            startActivity(intent);
//        }
//    }
//    public void showDropdownMenu(View view) {
//        PopupMenu popupMenu = new PopupMenu(this, view);
//        popupMenu.getMenuInflater().inflate(R.menu.dropdown_menu, popupMenu.getMenu());
//
//        // Set a listener for menu item clicks
//        popupMenu.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
//            @Override
//            public boolean onMenuItemClick(MenuItem menuItem) {
//                // Handle menu item clicks here
//
//                return true;
//            }
//        });
//
//        popupMenu.show();
//    }

    public boolean isServiceOK() {
        Log.d(TAG, "isServiceOK: checking Google services");
        int available = GoogleApiAvailabilityLight.getInstance().isGooglePlayServicesAvailable(MainActivity.this);
        if (available == ConnectionResult.SUCCESS) {
            Log.d(TAG, "isServiceOK: WORKING");
            return true;
        } else if (GoogleApiAvailability.getInstance().isUserResolvableError(available)) {
            Log.d(TAG, "isServiceOK: error but fixed");
            Dialog dialog = GoogleApiAvailability.getInstance().getErrorDialog(MainActivity.this, available, ERROR_DIALOG_REQUEST);
            dialog.show();
        } else {
            Toast.makeText(this, "You cannot do anything", Toast.LENGTH_SHORT).show();
        }
        return false;
    }






}