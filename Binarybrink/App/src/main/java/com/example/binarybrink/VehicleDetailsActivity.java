package com.example.binarybrink;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

public class VehicleDetailsActivity extends AppCompatActivity {
    private ImageView imageView;
    private TextView titleTextView;
    private TextView descriptionTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_vehicle_details);

        imageView = findViewById(R.id.imageView_id);
        titleTextView = findViewById(R.id.title_id);
        descriptionTextView = findViewById(R.id.description_id);

        // Retrieve data passed from VehicleFragment
        Intent intent = getIntent();
        if (intent != null) {
            String title = intent.getStringExtra("title");
            String description = intent.getStringExtra("description");
            int imageResource = intent.getIntExtra("imageResource", R.drawable.thunder);

            // Set data to views
            titleTextView.setText(title);
            descriptionTextView.setText(description);
            imageView.setImageResource(imageResource);
        }
    }
}