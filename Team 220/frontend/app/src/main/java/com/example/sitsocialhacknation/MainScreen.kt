package com.example.sitsocialhacknation

import android.annotation.SuppressLint
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.RowScope
import androidx.compose.material.BottomNavigation
import androidx.compose.material.BottomNavigationItem
import androidx.compose.material.ContentAlpha
import androidx.compose.material3.Icon
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.navigation.NavDestination
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHostController
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun MainScreen(){
    val navController = rememberNavController()
    Scaffold (
        bottomBar = { BottomBar(navController = navController) }
    ){
        BottomNavGraph(navController = navController)
    }

}

@Composable
fun BottomBar(navController: NavHostController){
    val screens = listOf(
        BottomBarScreen.Home,
        BottomBarScreen.Community,
        BottomBarScreen.CreatePost,
        BottomBarScreen.Notification,
        BottomBarScreen.Profile
    )
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentDestination = navBackStackEntry?.destination

    BottomNavigation {
        screens.forEach{screen ->
            AddScreen(screen = screen, currentDestination = currentDestination, navController = navController)
        }
    }
}

@Composable
fun RowScope.AddScreen(
    screen : BottomBarScreen,
    currentDestination: NavDestination?,
    navController: NavHostController
){

    val selected = currentDestination?.hierarchy?.any{
        it.route == screen.route
    } == true

    BottomNavigationItem(
        selected = selected,
        modifier = Modifier.background(Color.Black),
        onClick = { navController.navigate(screen.route){
            popUpTo(navController.graph.findStartDestination().id)
            launchSingleTop = true
        } },
        icon = { Icon(imageVector = if(selected){screen.icon_filled}else{screen.icon_outlined}, contentDescription = "icon", tint = if(selected){
            Color.White}else{
            Color.White.copy(alpha = ContentAlpha.disabled)}) })
}