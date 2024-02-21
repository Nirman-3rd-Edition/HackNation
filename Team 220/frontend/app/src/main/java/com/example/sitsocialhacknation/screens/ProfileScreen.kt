@file:OptIn(ExperimentalMaterial3Api::class)

package com.example.sitsocialhacknation.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row

//import androidx.compose.foundation.layout.FlowColumnScopeInstance.weight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.LocalTextStyle
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldColors
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.sitsocialhacknation.R
import com.example.sitsocialhacknation.ui.theme.BackgroundColor
import com.example.sitsocialhacknation.ui.theme.fontPrimaryFamily
import com.example.sitsocialhacknation.ui.theme.gradient

@Preview
@Composable
fun ProfileScreen(){
   Column (
       modifier = Modifier
           .fillMaxSize()
           .background(BackgroundColor)
   ){

      Box (Modifier.weight(0.4f)){
          Box(
              modifier = Modifier
//                  .weight(0.6f)
                  .fillMaxSize()
                  .padding(bottom = 80.dp)
                  .clip(shape = RoundedCornerShape(0, 0, 10, 10))
                  .background(gradient),
          )
          Column (
              horizontalAlignment = Alignment.CenterHorizontally,
              verticalArrangement = Arrangement.SpaceBetween,
              modifier = Modifier.fillMaxSize()
          ){
              TopBar(screenName = "Profile")
              Text(text = "Amit Pritam".uppercase(), fontFamily = fontPrimaryFamily, fontWeight = FontWeight.Bold, fontSize = 24.sp, color = Color.White)
              Row (horizontalArrangement = Arrangement.SpaceEvenly,
                  verticalAlignment = Alignment.Top,
                  modifier = Modifier.fillMaxWidth()
                  ){
                  Text(text = "3K\n"+"followers",fontFamily = fontPrimaryFamily, fontWeight = FontWeight.Bold, fontSize = 18.sp, color = Color.White, textAlign = TextAlign.Center)
                  Image(painter = painterResource(id = R.drawable.user_image),
                      contentScale = ContentScale.Crop,
                      modifier = Modifier
                          .size(160.dp)
                          .clip(CircleShape),
                      contentDescription = "Circle Story")
                  Text(text = "3K\n"+"following",fontFamily = fontPrimaryFamily, fontWeight = FontWeight.Bold, fontSize = 18.sp, color = Color.White, textAlign = TextAlign.Center)
              }
          }
      }
       Column (verticalArrangement = Arrangement.SpaceBetween,
           modifier = Modifier.weight(0.1f).padding(start = 20.dp, top = 10.dp, end = 20.dp)){
           Text(text = "Description",fontFamily = fontPrimaryFamily, fontWeight = FontWeight.Bold, fontSize = 18.sp, color = Color.White)
           val state = remember{ mutableStateOf("") }
           TextField(
               colors = TextFieldDefaults.textFieldColors(
                   containerColor = Color.Transparent,
               ),
               maxLines = 3,
               modifier = Modifier.fillMaxWidth(),
               value = state.value,
               onValueChange = {
                   state.value=it
               }
           )
       }
       Column (Modifier.weight(0.5f)){
       }
   }
}

