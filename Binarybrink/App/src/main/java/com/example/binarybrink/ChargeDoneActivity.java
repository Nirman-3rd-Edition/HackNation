package com.example.binarybrink;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class ChargeDoneActivity extends AppCompatActivity {
    private Button PayButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_charge_done);
        PayButton = findViewById(R.id.Pay_button);
        PayButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(ChargeDoneActivity.this, PayActivity.class);
                startActivity(intent);
            }
        });
    }
}