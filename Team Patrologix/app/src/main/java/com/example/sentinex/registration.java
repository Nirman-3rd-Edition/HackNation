package com.example.sentinex;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.sentinex.R;
import com.example.sentinex.login;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.UserProfileChangeRequest;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

import de.hdodenhof.circleimageview.CircleImageView;

public class registration extends AppCompatActivity {

    TextView loginBut;
    EditText rgUsername, rgEmail, rgPassword, rgRepassword;
    Button rgSignup;
    CircleImageView rgProfileImg;
    FirebaseAuth auth;
    Uri imageURI;
    String imageUri;
    String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";
    FirebaseDatabase database;
    FirebaseStorage storage;
    ProgressDialog progressDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);
        getSupportActionBar().hide();
        progressDialog = new ProgressDialog(this);
        progressDialog.setMessage("Establishing The Account");
        progressDialog.setCancelable(false);
        database = FirebaseDatabase.getInstance();
        storage = FirebaseStorage.getInstance();
        auth = FirebaseAuth.getInstance();
        loginBut = findViewById(R.id.loginbut);
        rgUsername = findViewById(R.id.rgusername);
        rgEmail = findViewById(R.id.rgemail);
        rgPassword = findViewById(R.id.rgpassword);
        rgRepassword = findViewById(R.id.rgrepassword);
        rgProfileImg = findViewById(R.id.profilerg0);
        rgSignup = findViewById(R.id.signupbutton);

        loginBut.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(registration.this, login.class );
                startActivity(intent);
                finish();
            }
        });

        rgSignup.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                String name = rgUsername.getText().toString();
                String email = rgEmail.getText().toString();
                String password = rgPassword.getText().toString();
                String confirmPassword = rgRepassword.getText().toString();
                String status = "Hey I'm Using This Application";

                if (TextUtils.isEmpty(name) || TextUtils.isEmpty(email) ||
                        TextUtils.isEmpty(password) || TextUtils.isEmpty(confirmPassword)) {
                    progressDialog.dismiss();
                    Toast.makeText(registration.this, "Please Enter Valid Information", Toast.LENGTH_SHORT).show();
                } else if (!email.matches(emailPattern)) {
                    progressDialog.dismiss();
                    rgEmail.setError("Type A Valid Email Here");
                } else if (password.length() < 6) {
                    progressDialog.dismiss();
                    rgPassword.setError("Password Must Be 6 Characters Or More");
                } else if (!password.equals(confirmPassword)) {
                    progressDialog.dismiss();
                    rgPassword.setError("The Password Doesn't Match");
                } else {
                    auth.createUserWithEmailAndPassword(email, password).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                        @Override
                        public void onComplete(@NonNull Task<AuthResult> task) {
                            if (task.isSuccessful()) {
                                FirebaseUser user = auth.getCurrentUser();
                                String id = user.getUid();
                                DatabaseReference reference = database.getReference().child("user").child(id);
                                StorageReference storageReference = storage.getReference().child("Upload").child(id);

                                if (imageURI != null) {
                                    uploadProfileImage(user, reference, storageReference, name, email, password, status);
                                } else {
                                    // No image selected, proceed with default image
                                    String defaultImageUri = "https://firebasestorage.googleapis.com/v0/b/yatra-360.appspot.com/o/man.png?alt=media&token=131835fd-74a6-44ec-8299-1629b5166959";
                                    Users users = new Users(id, name, email, password, defaultImageUri, status);
                                    reference.setValue(users).addOnCompleteListener(new OnCompleteListener<Void>() {
                                        @Override
                                        public void onComplete(@NonNull Task<Void> task) {
                                            if (task.isSuccessful()) {
                                                progressDialog.show();
                                                Intent intent = new Intent(registration.this, MainActivity.class);
                                                startActivity(intent);
                                                finish();
                                            } else {
                                                Toast.makeText(registration.this, "Error in creating the user", Toast.LENGTH_SHORT).show();
                                            }
                                        }
                                    });
                                }
                            } else {
                                Toast.makeText(registration.this, task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                            }
                        }
                    });
                }
            }
            Intent intent = new Intent(registration.this, MainActivity.class);

        });

        rgProfileImg.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.setType("image/*");
                intent.setAction(Intent.ACTION_GET_CONTENT);
                startActivityForResult(Intent.createChooser(intent, "Select Picture"), 10);
            }
        });
    }

    private void uploadProfileImage(FirebaseUser user, DatabaseReference reference, StorageReference storageReference,
                                    String name, String email, String password, String status) {
        storageReference.putFile(imageURI).addOnCompleteListener(new OnCompleteListener<UploadTask.TaskSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<UploadTask.TaskSnapshot> task) {
                if (task.isSuccessful()) {
                    storageReference.getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
                        @Override
                        public void onSuccess(Uri uri) {
                            imageUri = uri.toString();
                            Users users = new Users(user.getUid(), name, email, password, imageUri, status);
                            reference.setValue(users).addOnCompleteListener(new OnCompleteListener<Void>() {
                                @Override
                                public void onComplete(@NonNull Task<Void> task) {
                                    if (task.isSuccessful()) {
                                        progressDialog.show();
                                        Intent intent = new Intent(registration.this, MainActivity.class);
                                        startActivity(intent);
                                        finish();
                                    } else {
                                        Toast.makeText(registration.this, "Error in creating the user", Toast.LENGTH_SHORT).show();
                                        Log.e("Registration", "Error setting user data", task.getException());
                                    }
                                }
                            });
                        }
                    });
                } else {
                    Toast.makeText(registration.this, "Error uploading profile image", Toast.LENGTH_SHORT).show();
                    Log.e("Registration", "Error uploading profile image", task.getException()); // Log the exception
                }
            }
        });
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 10) {
            if (data != null) {
                imageURI = data.getData();
                rgProfileImg.setImageURI(imageURI);
            }
        }
    }
}

