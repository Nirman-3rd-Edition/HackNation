package com.example.binarybrink;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class ChargeActivity extends AppCompatActivity {
    private Button charge;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_charge);
        charge = findViewById(R.id.charge_button);
        charge.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(ChargeActivity.this, ChargingActivity.class);
                startActivity(intent);
            }
        });
    }
}