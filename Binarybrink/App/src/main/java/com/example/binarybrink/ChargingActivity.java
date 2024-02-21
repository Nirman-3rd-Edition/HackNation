package com.example.binarybrink;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class ChargingActivity extends AppCompatActivity {
    private Button ChargingStop;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_charging);

        ChargingStop = findViewById(R.id.ChargingStop_button);
        ChargingStop.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(ChargingActivity.this, ChargeDoneActivity.class);
                startActivity(intent);
            }
        });
    }
}