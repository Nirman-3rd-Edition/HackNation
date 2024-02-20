import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  setAvatarRoute,
  getuserdetails,
  usercheck,
} from "../../Routes/APIRoutes.js";
export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setuser] = useState([]);
  const { lspid } = useParams();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const getuserdetailss = async (id) => {
    try {
      const getuserdetailss = getuserdetails;
      const response = await axios.get(`${getuserdetailss}/${id}`);

      console.log(response.data);
      setuser(response.data.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const getuser = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await axios.get(usercheck, {
        headers: {
          token: `${token}`, // Replace with your actual JWT token
        }, // Include credentials (cookies, authorization headers)
      });

      console.log("Data from server:", response.data);
      setUserId(response.data.userId);
      getuserdetailss(response.data.userId);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === "") {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const { data } = await axios.post(`${setAvatarRoute}/${userId}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;

        navigate(`/chat/${lspid}`);
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  const getavtarimage = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    console.log(data);
    setAvatars(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getuser();
    getavtarimage();
  }, []);
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
