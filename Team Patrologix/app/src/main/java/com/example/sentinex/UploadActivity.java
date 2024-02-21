package com.example.sentinex;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.net.Uri;
import android.os.Bundle;
import android.content.Intent;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class UploadActivity extends AppCompatActivity {

    private static final int PICK_DOCUMENT_REQUEST = 101;

    private EditText descriptionEditText;
    private EditText locationEditText;
    private Button submitButton;
    private Button documentButton;
    private final int CAMERA_REQ_CODE = 100;
    private Uri documentUri; // To store the selected document URI

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_upload);

        FirebaseAuth auth = FirebaseAuth.getInstance();
        FirebaseUser user = auth.getCurrentUser();

        descriptionEditText = findViewById(R.id.editTextText);
        locationEditText = findViewById(R.id.editTextText2);
        submitButton = findViewById(R.id.filereport3);
        documentButton = findViewById(R.id.filereport2);
        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference reportsRef = database.getReference("reports");

        documentButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Launch a file picker to select a document
                Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
                intent.setType("/"); // Allow all file types
                startActivityForResult(intent, PICK_DOCUMENT_REQUEST);
            }
        });


        Button cameraButton = findViewById(R.id.filereport);

        cameraButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent icamera = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                startActivityForResult(icamera, CAMERA_REQ_CODE);
            }
        });
        submitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String description = descriptionEditText.getText().toString();
                String location = locationEditText.getText().toString();
                String time = getCurrentTime(); // Get current time

                if (description.isEmpty() || location.isEmpty()) {
                    Toast.makeText(UploadActivity.this, "Please fill in all fields", Toast.LENGTH_SHORT).show();
                    return;
                }

                Report report = new Report(description, location, time);

                reportsRef.push().setValue(report);

                descriptionEditText.setText("");
                locationEditText.setText("");

                if (documentUri != null) {
                    uploadDocumentToFirebaseStorage(documentUri);
                }
            }
        });

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);


        if (requestCode == PICK_DOCUMENT_REQUEST && resultCode == RESULT_OK && data != null) {
            documentUri = data.getData();
        }
    }

    private void uploadDocumentToFirebaseStorage(Uri documentUri) {
        // Initialize Firebase Storage
        FirebaseStorage storage = FirebaseStorage.getInstance();
        StorageReference storageRef = storage.getReference();
        StorageReference documentRef = storageRef.child("documents/" + System.currentTimeMillis());

        documentRef.putFile(documentUri)


                .addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
                    @Override
                    public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
                        // Document uploaded successfully
                        Toast.makeText(UploadActivity.this, "Document uploaded", Toast.LENGTH_SHORT).show();
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Log.e("Firebase", "Error: " + e.getMessage(), e);
                    }
                });



    }

    private String getCurrentTime() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss", Locale.getDefault());
        Date currentTime = Calendar.getInstance().getTime();
        return dateFormat.format(currentTime);
    }
}