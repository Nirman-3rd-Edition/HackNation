package com.example.binarybrink;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class JsonParser {
    private HashMap<String,String> parseJasonObject(JSONObject object)
    {
        //Initialize hash map
        HashMap<String,String> dataList = new HashMap<>();
        try {
            //get name from object;
            String name = object.getString("name");
            //get latitude from object
            String latitude = object.getJSONObject("geometry")
                    .getJSONObject("location").getString("lat");
            //get longitude
            String longitude = object.getJSONObject("geometry")
                    .getJSONObject("location").getString("lng");
            //Put all value in hash map
            dataList.put("name",name);
            dataList.put("lat",latitude);
            dataList.put("lng",longitude);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        //Return hash map
        return dataList;
    }

    private List<HashMap<String,String>> parseJsonArray(JSONArray jsonArray)
    {
        //Initialize hash map list
        List<HashMap<String,String>> dataList = new ArrayList<>();
        for(int i=0;i<jsonArray.length();i++)
        {
            try {
                //Initialize hash map
                HashMap<String,String> data = parseJasonObject((JSONObject) jsonArray.get(i));
                //Add data in hash map list
                dataList.add(data);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        //Return hash map list
        return dataList;
    }
    public List<HashMap<String,String>> parseResult(JSONObject object)
    {
        //Initialize jason array
        JSONArray jsonArray = null;
        //Get result array
        try {
            jsonArray = object.getJSONArray("results");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        //Return array
        return parseJsonArray(jsonArray);
    }
}
