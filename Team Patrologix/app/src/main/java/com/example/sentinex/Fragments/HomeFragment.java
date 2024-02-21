package com.example.sentinex.Fragments;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import androidx.fragment.app.Fragment;

import com.example.sentenix_prototype2.R;
import com.example.sentenix_prototype2.UploadActivity;

public class HomeFragment extends Fragment {

    public HomeFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_home, container, false);

        // Find the button in the inflated layout
        @SuppressLint({"MissingInflatedId", "LocalSuppress"})
        Button signupButton4 = view.findViewById(R.id.uplbtn);

        // Set click listener for the button
        signupButton4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Use the correct context (getActivity()) to start the intent
                Intent intent = new Intent(getActivity(), UploadActivity.class);
                startActivity(intent);
            }
        });

        return view;
    }
}
