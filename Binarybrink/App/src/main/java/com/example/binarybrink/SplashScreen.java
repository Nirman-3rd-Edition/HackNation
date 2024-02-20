package com.example.binarybrink;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.airbnb.lottie.LottieAnimationView;

public class SplashScreen extends AppCompatActivity {
    TextView app_name_top,app_name_bottom;
    LottieAnimationView lottie;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);

        app_name_top = findViewById(R.id.textView2);
        app_name_bottom = findViewById(R.id.textView1);
        lottie = findViewById(R.id.lottie);

        app_name_bottom.animate().translationY(-818).setDuration(1700).setStartDelay(0);
        app_name_top.animate().translationY(1400).setDuration(1700).setStartDelay(0);

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent Inext = new Intent(getApplicationContext(),MainActivity.class);
                startActivity(Inext);
                finish();
            }
        },3000);
    }
}