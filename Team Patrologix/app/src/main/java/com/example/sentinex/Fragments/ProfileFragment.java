package com.example.sentinex.Fragments;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.sentenix_prototype2.R;
import com.example.sentenix_prototype2.Users;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.squareup.picasso.Picasso;

public class ProfileFragment extends Fragment {

    private ImageView profileImage;
    private TextView usernameTextView;
    private TextView emailTextView;

    private FirebaseAuth mAuth;
    private DatabaseReference userDatabaseRef;
    private StorageReference storageReference;

    public ProfileFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_profile, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // Initialize UI components
        profileImage = view.findViewById(R.id.profileImage);
        usernameTextView = view.findViewById(R.id.usernameTextView);
        emailTextView = view.findViewById(R.id.emailTextView);

        // Initialize Firebase
        mAuth = FirebaseAuth.getInstance();
        FirebaseUser currentUser = mAuth.getCurrentUser();
        userDatabaseRef = FirebaseDatabase.getInstance().getReference("users").child(currentUser.getUid());
        storageReference = FirebaseStorage.getInstance().getReference("profile_images");

        // Fetch and display user details
        fetchAndDisplayUserData(currentUser);
    }

    private void fetchAndDisplayUserData(FirebaseUser user) {
        Log.d("ProfileFragment", "fetchAndDisplayUserData called for UID: " + user.getUid());

        // Fetch user details from Firebase Database
        userDatabaseRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                Log.d("ProfileFragment", "onDataChange called");

                if (dataSnapshot.exists()) {
                    // Retrieve user data from the snapshot
                    Users userData = dataSnapshot.getValue(Users.class);

                    // Display user details in UI
                    if (userData != null) {
                        usernameTextView.setText(userData.getUserName());
                        emailTextView.setText(userData.getMail());

                        // Fetch and display profile image
                        fetchAndDisplayProfileImage(userData.getProfilepic());
                    } else {
                        Log.d("ProfileFragment", "User data is null");
                    }
                } else {
                    Log.d("ProfileFragment", "No data exists for the user");
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {
                // Handle errors here
                Log.e("ProfileFragment", "Error fetching user data", databaseError.toException());
            }
        });
    }

    private void fetchAndDisplayProfileImage(String profilePicUrl) {
        // Load profile image into ImageView using Picasso
        Picasso.get().load(profilePicUrl).into(profileImage);
    }
}
