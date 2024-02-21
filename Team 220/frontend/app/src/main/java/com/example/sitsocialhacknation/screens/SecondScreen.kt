package com.example.sitsocialhacknation.screens

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.sp
import com.example.sitsocialhacknation.ui.theme.fontAccentFamily

@Composable
fun SecondScreen(){
    Box(modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ){
        Text(text = "Second Screen",
            fontSize = 24.sp,
            fontFamily = fontAccentFamily,
            color = Color.Black
        )
    }
}