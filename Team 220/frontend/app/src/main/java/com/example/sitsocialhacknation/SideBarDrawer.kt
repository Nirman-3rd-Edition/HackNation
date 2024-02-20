package com.example.sitsocialhacknation

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Help
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.Icon
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.sitsocialapp.SideBarMenuItem

@Composable
fun SideBarDrawer(){
    val scope = rememberCoroutineScope()
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    ModalNavigationDrawer(
        drawerContent = {
        DrawerHeader()
        DrawerBody(
            items = listOf(
                SideBarMenuItem(
                    id = "Home",
                    title = "home",
                    contentDescription = "Go to home Screen",
                    icon = Icons.Filled.Home
                ),
                SideBarMenuItem(
                    id = "Settings",
                    title = "Settings",
                    contentDescription = "Go to Settings",
                    icon = Icons.Filled.Settings
                ),
                SideBarMenuItem(
                    id = "Help",
                    title = "help",
                    contentDescription = "Go to home Screen",
                    icon = Icons.Filled.Help
                )),
            onItemClick = {
                println("Clickedon ${it.title}")
            }
        )
    }) {
        
    }
}

@Composable
fun DrawerHeader(){
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 64.dp),
        contentAlignment = Alignment.Center
    ){
             Text(text = "Header",fontSize = 60.sp)
    }
}

@Composable
fun DrawerBody(
    items: List<SideBarMenuItem>,
    modifier: Modifier = Modifier,
    itemTextStyle: TextStyle = TextStyle(fontSize = 18.sp),
    onItemClick: (SideBarMenuItem) -> Unit
){
    LazyColumn(content = {
        items(items){item ->
            Row (
                modifier = modifier
                    .fillMaxWidth()
                    .clickable { onItemClick(item) }
                    .padding(16.dp)
            ){
                Icon(imageVector = item.icon, contentDescription = item.contentDescription)
                Spacer(modifier = Modifier.width(16.dp))
                Text(
                    text = item.title,
                    style = itemTextStyle,
                    modifier = Modifier.weight(1f)
                )
            }
        }
    })
}