package com.example.sitsocialhacknation.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Divider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.sitsocialhacknation.ui.theme.BackgroundColor
import com.example.sitsocialhacknation.ui.theme.fontPrimaryFamily
@Preview
@Composable
fun CommunityScreen(){
    Column (modifier = Modifier
        .fillMaxSize()
        .background(BackgroundColor)
    ){
        TopBar("Community")
        Column (modifier = Modifier.fillMaxSize().padding(10.dp)){
            Row (horizontalArrangement = Arrangement.Start,
                verticalAlignment = Alignment.CenterVertically){
                Text(
                    text = "Followed Communities",
                    color = Color.White,
                    fontFamily = fontPrimaryFamily,
                    fontSize = 20.sp
                )
            }
            FollowedCommunities()
            Divider(
                modifier = Modifier
                    .fillMaxWidth()
                    .width(2.dp)
                    .padding(top = 6.dp, bottom = 6.dp),
                color = Color.LightGray.copy(alpha = 0.4f)
            )
            NewCommunities()
        }


    }
}
