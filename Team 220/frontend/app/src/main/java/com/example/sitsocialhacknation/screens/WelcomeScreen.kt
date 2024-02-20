package com.example.sitsocialhacknation.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.sitsocialhacknation.R
import com.example.sitsocialhacknation.ui.theme.AccentColor
import com.example.sitsocialhacknation.ui.theme.BackgroundColor
import com.example.sitsocialhacknation.ui.theme.fontAccentFamily


@Composable
fun WelcomeScreen(navController: NavController){
    Column (
        verticalArrangement = Arrangement.SpaceAround,
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundColor)
    ){
        LogoText(size = 45, modifier = Modifier.padding(bottom = 24.dp))
        Image(painter = painterResource(id = R.drawable.welcome_illustration), contentDescription = "Welcome illustration")
        Column(
            verticalArrangement = Arrangement.SpaceBetween,
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier
                .fillMaxWidth()
                .height(165.dp)
                .padding(24.dp)
        ) {
            Button(onClick = { signupClickEvent(navController) },
                colors = ButtonDefaults.buttonColors(containerColor = AccentColor),
                modifier = Modifier.size(width = 400.dp, height = 50.dp),
                elevation = ButtonDefaults.buttonElevation(20.dp)
            ) {
                Text(text = "Create new account",
                    fontSize = 24.sp,
                    fontFamily = fontAccentFamily,
                    color = Color.White
                )
            }
            OutlinedButton(
                onClick = { loginClickEvent(navController) },
                modifier = Modifier.size(width = 400.dp, height = 50.dp),
                border = BorderStroke(1.dp, AccentColor)
            ) {
                Text(text = "Login",
                    fontSize = 24.sp,
                    fontFamily = fontAccentFamily,
                    color = Color.White
                )
            }
        }
    }
}

fun loginClickEvent(navController: NavController){
    navController.navigate("LoginScreen")
}
fun signupClickEvent(navController: NavController){
    navController.navigate("SignupScreen")
}