package com.example.binarybrink;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.app.Dialog;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.Gravity;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.navigation.NavigationBarView;
import com.google.android.material.navigation.NavigationView;

public class MainActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener{

    FloatingActionButton fab;
    DrawerLayout drawerLayout;
    BottomNavigationView bottomNavigationView;
    FragmentManager fragmentManager;
    Toolbar toolbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        fab = findViewById(R.id.fab);
        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        drawerLayout = findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this, drawerLayout,toolbar,R.string.open_nav,R.string.close_nav);
        toggle.syncState();

        NavigationView navigationView = findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        bottomNavigationView = findViewById(R.id.bottomNavigationView);
        bottomNavigationView.setBackground(null);

        bottomNavigationView.setOnItemSelectedListener(new NavigationBarView.OnItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                int itemId = item.getItemId();
                if(itemId == R.id.home){
                    openFragment(new HomeFragment());
                    Fragment fragment = new MapFragment();
                    getSupportFragmentManager().beginTransaction().replace(R.id.frame_layout,fragment).commit();
                    return true;
                } else if (itemId == R.id.vehicle) {
                    openFragment(new VehicleFragment());
                    return true;
                }else if (itemId == R.id.add_location) {
                    openFragment(new TimelineFragment());
                    return true;
                }else if (itemId == R.id.profile) {
                    Intent intent = getIntent();
                    String nameUser = intent.getStringExtra("name");
                    String emailUser = intent.getStringExtra("email");
                    String usernameUser = intent.getStringExtra("username");
                    String passwordUser = intent.getStringExtra("password");

                    // Creating a new instance of Profile Fragment
                    ProfileFragment profileFragment = new ProfileFragment();

                    // Creating a Bundle object
                    Bundle args = new Bundle();
                    args.putString("name", nameUser);
                    args.putString("email", emailUser);
                    args.putString("username", usernameUser);
                    args.putString("password", passwordUser);

                    // Setting the arguments bundle to the Profile Fragment
                    profileFragment.setArguments(args);

                    // Adding the ProfileFragment to main activity
                    getSupportFragmentManager().beginTransaction()
                            .replace(R.id.fragment_container, profileFragment)
                            .commit();
                    return true;
                }
                return false;
            }
        });

        fragmentManager = getSupportFragmentManager();
        openFragment(new HomeFragment());

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(MainActivity.this,"Upload vehicle",Toast.LENGTH_LONG).show();
                showBottomDialog();
            }
        });

        Fragment fragment = new MapFragment();
        getSupportFragmentManager().beginTransaction().replace(R.id.frame_layout,fragment).commit();


        //adding name and email to the nav_header

        // Fetching user details from intent
        Intent intent = getIntent();
        String nameUser = intent.getStringExtra("name");
        String emailUser = intent.getStringExtra("email");

        // Finding TextView elements in nav header and set text
        View headerView = navigationView.getHeaderView(0);
        TextView textViewName = headerView.findViewById(R.id.textViewName);
        TextView textViewEmail = headerView.findViewById(R.id.textViewEmail);
        textViewName.setText(nameUser);
        textViewEmail.setText(emailUser);

    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        int itemId = item.getItemId();
        if(itemId == R.id.nav_home) {
            openFragment(new HomeFragment());
            Fragment fragment = new MapFragment();
            getSupportFragmentManager().beginTransaction().replace(R.id.frame_layout,fragment).commit();
        } else if (itemId == R.id.nav_settings) {
            openFragment(new SettingsFragment());
        } else if (itemId == R.id.nav_share) {
            openFragment(new ShareFragment());
        } else if (itemId == R.id.nav_about) {
            openFragment(new AboutUsFragment());
        }else if (itemId == R.id.nav_logout) {
            logout();
        }
        drawerLayout.closeDrawer(GravityCompat.START);
        return true;
    }

    @Override
    public void onBackPressed() {
        if(drawerLayout.isDrawerOpen(GravityCompat.START)){
            drawerLayout.closeDrawer(GravityCompat.START);
        }
        else{
            super.onBackPressed();
        }
    }

    private void openFragment(Fragment fragment)
    {
        FragmentTransaction transaction = fragmentManager.beginTransaction();
        transaction.replace(R.id.fragment_container,fragment);
        transaction.commit();
    }

    private void showBottomDialog() {

        final Dialog dialog = new Dialog(this);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.bottomsheetlayout);

        LinearLayout videoLayout = dialog.findViewById(R.id.layoutVideo);
        LinearLayout searchLayout = dialog.findViewById(R.id.Search);
        LinearLayout photoLayout = dialog.findViewById(R.id.takePhoto);
        ImageView cancelButton = dialog.findViewById(R.id.cancelButton);

        videoLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                dialog.dismiss();
                Toast.makeText(MainActivity.this,"Upload a photo is clicked",Toast.LENGTH_SHORT).show();

            }
        });

        searchLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                dialog.dismiss();
                Toast.makeText(MainActivity.this,"Search for a model is Clicked",Toast.LENGTH_SHORT).show();

            }
        });

        photoLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                dialog.dismiss();
                Toast.makeText(MainActivity.this,"Take Photo is Clicked",Toast.LENGTH_SHORT).show();

            }
        });

        cancelButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dialog.dismiss();
            }
        });

        dialog.show();
        dialog.getWindow().setLayout(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.WRAP_CONTENT);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        dialog.getWindow().getAttributes().windowAnimations = R.style.DialogAnimation;
        dialog.getWindow().setGravity(Gravity.BOTTOM);
    }

    private void logout() {
        Intent intent = new Intent(MainActivity.this, LoginActivity.class);
        startActivity(intent);
        finish(); // Close the current activity to prevent back navigation to MainActivity
    }

}