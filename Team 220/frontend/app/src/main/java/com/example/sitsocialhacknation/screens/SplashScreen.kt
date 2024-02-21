package com.example.sitsocialhacknation.screens
import android.view.animation.OvershootInterpolator
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.sitsocialhacknation.ui.theme.BackgroundColor
import com.example.sitsocialhacknation.ui.theme.fontLogoFamily
import kotlinx.coroutines.delay


@Composable
fun SplashScreen(navController: NavController, splashDisplayed: ()-> Unit) {

    val scale=remember{
        Animatable(0f)
    }
    LaunchedEffect(key1 = true){
        scale.animateTo(
            targetValue = 0.7f,
            animationSpec = tween(
                durationMillis = 1000,
                easing = {
                    OvershootInterpolator(3f).getInterpolation(it)
                }

            )
        )
        delay(2000)
        splashDisplayed()
//        navController.navigate("WelcomeScreen")
    }
    Box(
        contentAlignment = Alignment.Center,
        modifier = Modifier.fillMaxSize()
            .background(BackgroundColor)
    ){
        Text(
            text = "Sit Social",
            fontSize = 80.sp,
            fontFamily = fontLogoFamily,
            color = Color.White,
            modifier = Modifier.scale(scale.value)
        )
    }
}