package com.example.sitsocialapp

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material.icons.filled.AddCircle
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Language
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.outlined.AccountCircle
import androidx.compose.material.icons.outlined.AddCircleOutline
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.Notifications
import androidx.compose.ui.graphics.vector.ImageVector

sealed class BottomBarScreen (
    val route: String,
    val title: String,
    val icon_filled: ImageVector,
    val icon_outlined: ImageVector
){
    object Home : BottomBarScreen(
        route = "HomeScreen",
        title = "Home",
        icon_filled = Icons.Filled.Home,
        icon_outlined = Icons.Outlined.Home
    )
    object Community : BottomBarScreen(
        route = "CommunityScreen",
        title = "Community",
        icon_filled = Icons.Filled.Language,
        icon_outlined = Icons.Filled.Language
    )
    object CreatePost : BottomBarScreen(
        route = "CreatePostScreen",
        title = "Create Post",
        icon_filled = Icons.Filled.AddCircle,
        icon_outlined = Icons.Outlined.AddCircleOutline
    )
    object Notification : BottomBarScreen(
        route = "NotificationScreen",
        title = "Notification",
        icon_filled = Icons.Filled.Notifications,
        icon_outlined = Icons.Outlined.Notifications
    )
    object Profile : BottomBarScreen(
        route = "ProfileScreen",
        title = "Profile",
        icon_filled = Icons.Filled.AccountCircle,
        icon_outlined = Icons.Outlined.AccountCircle
    )
}