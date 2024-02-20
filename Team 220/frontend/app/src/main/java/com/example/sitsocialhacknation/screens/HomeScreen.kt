package com.example.sitsocialhacknation.screens

//import android.graphics.drawable.Icon
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Divider
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.sitsocialhacknation.ui.theme.BackgroundColor
import com.example.sitsocialhacknation.ui.theme.BackgroundColor

@Preview
@Composable
fun HomeScreen(){
    Column(modifier = Modifier
        .fillMaxSize()
        .background(BackgroundColor)) {
        TopBar("Home")
        Story()
        Divider(
            modifier = Modifier
                .fillMaxWidth()
                .width(2.dp)
                .padding(top = 6.dp, bottom = 6.dp),
            color = Color.LightGray.copy(alpha = 0.4f)
        )
        Feed()
    }
}
