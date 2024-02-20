package com.example.sitsocialapp

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.example.sitsocialapp.screens.CommunityScreen
import com.example.sitsocialapp.screens.CreatePostScreen
import com.example.sitsocialapp.screens.HomeScreen
import com.example.sitsocialapp.screens.NotificationScreen
import com.example.sitsocialapp.screens.ProfileScreen

@Composable
fun BottomNavGraph(navController: NavHostController){
    NavHost(navController = navController,
        startDestination = BottomBarScreen.Home.route){
        composable(route = BottomBarScreen.Home.route){
            HomeScreen()
        }
        composable(route = BottomBarScreen.Community.route){
            CommunityScreen()
        }
        composable(route = BottomBarScreen.CreatePost.route){
            CreatePostScreen()
        }
        composable(route = BottomBarScreen.Notification.route){
            NotificationScreen()
        }
        composable(route = BottomBarScreen.Profile.route){
            ProfileScreen()
        }
    }
}