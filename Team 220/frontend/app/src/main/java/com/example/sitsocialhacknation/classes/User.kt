package com.example.sitsocialapp.classes

import com.google.gson.annotations.SerializedName

data class User(
    @SerializedName("name")
    var name: String,

    @SerializedName("username")
    var username: String,

    @SerializedName("email")
    var email: String
)