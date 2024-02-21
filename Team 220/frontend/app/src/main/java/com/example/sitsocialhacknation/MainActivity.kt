package com.example.sitsocialhacknation

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.example.sitsocialhacknation.screens.LoginScreen
import com.example.sitsocialhacknation.screens.SecondScreen
import com.example.sitsocialhacknation.screens.SignupScreen
import com.example.sitsocialhacknation.screens.SplashScreen
import com.example.sitsocialhacknation.screens.WelcomeScreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MainScreen()
//            val navController = rememberNavController()
//            val rememberSplash = remember{ mutableStateOf(false) }
//            Navigation(navController = navController, rememberSplash)
        }
    }
}

@Composable
fun Navigation(navController: NavHostController, rememberSplash: MutableState<Boolean>){
    NavHost(navController = navController, startDestination = if(!rememberSplash.value){"SplashScreen"}else{"HomeScreen"}){
        composable("SplashScreen"){
            SplashScreen(navController = navController) {
                navController.popBackStack()
                rememberSplash.value = true
                navController.navigate("WelcomeScreen")
            }
        }
        composable("WelcomeScreen"){
            WelcomeScreen(navController = navController)
        }
        composable("LoginScreen"){
            LoginScreen()
        }
        composable("SignupScreen"){
            SignupScreen()
        }
        composable("HomeScreen"){
//            HomeScreen(navController = navController)
        }
        composable("SecondScreen"){
            SecondScreen()
        }

    }
}