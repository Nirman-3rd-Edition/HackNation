package com.example.sentinex.Fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.sentenix_prototype2.R;
import com.example.sentenix_prototype2.Report;
import com.example.sentenix_prototype2.ReportsAdapter;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.List;

public class NotificationsFragment extends Fragment {

    private RecyclerView notificationRecyclerView;
    private ReportsAdapter reportsAdapter;
    private DatabaseReference reportsRef;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_notifications, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // Initialize RecyclerView
        notificationRecyclerView = view.findViewById(R.id.notificationRecyclerView);
        notificationRecyclerView.setLayoutManager(new LinearLayoutManager(requireContext()));
        reportsAdapter = new ReportsAdapter();
        notificationRecyclerView.setAdapter(reportsAdapter);

        // Initialize Firebase Realtime Database
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        reportsRef = database.getReference("reports");

        // Listen for changes in the database
        reportsRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                List<Report> reportList = new ArrayList<>();
                // Iterate through each report
                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                    // Retrieve report data
                    Report report = snapshot.getValue(Report.class);
                    if (report != null) {
                        reportList.add(report);
                    }
                }
                // Update RecyclerView data
                reportsAdapter.setData(reportList);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                // Handle errors
            }
        });
    }
}
