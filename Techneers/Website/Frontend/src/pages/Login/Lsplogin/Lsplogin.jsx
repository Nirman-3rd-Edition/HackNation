import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
// import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../../components/Navbar";
import { lsploginRoute } from "../../../Routes/APIRoutes.js";

export default function Lsplogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  //   useEffect(() => {
  //     if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
  //       navigate("/");
  //     }
  //   }, []);

  const validateForm = () => {
    if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(lsploginRoute, {
          email,
          password,
        });
        if (response.data.lsptoken) {
          console.log("Login successful. Token:", response.data);

          localStorage.setItem("lsptoken", response.data.lsptoken);
          localStorage.setItem("role", response.data.role);

          await toast.success("Successfully logged in", {
            ...toastOptions,
          });

          // setTimeout(() => {
          //   if (response.data.role === "Advocate") {
          //     navigate("/lspwelcome/advocatedashboard/");
          //   } else if (response.data.role === "document writer") {
          //     navigate("/lspwelcome/documentwriterdashboard/");
          //   } else if (response.data.role === "Arbitrator") {
          //     navigate("/lspwelcome/arbitratordashboard/");
          //   } else if (response.data.role === "Mediator") {
          //     navigate("/lspwelcome/mediatordashboard/");
          //   } else if (response.data.role === "Notary") {
          //     navigate("/lspwelcome/notarydashboard/");
          //   } else {
          //     navigate("/");
          //   }
          // }, 2000);

          setTimeout(() => {
            if (response.data.role === "Advocate") {
              navigate("/lspwelcome/");
            } else if (response.data.role === "document writer") {
              navigate("/lspwelcome/");
            } else if (response.data.role === "Arbitrator") {
              navigate("/lspwelcome/");
            } else if (response.data.role === "Mediator") {
              navigate("/lspwelcome/");
            } else if (response.data.role === "Notary") {
              navigate("/lspwelcome/");
            } else {
              navigate("/");
            }
          }, 2000);
        }
      } catch (error) {
        toast.error("Please correct your email or password", toastOptions);
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            {/* <img src={Logo} alt="logo" /> */}
            <h1>LSP Login</h1>
          </div>
          <p style={{ color: "white" }}>Email</p>
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            min="3"
          />
          <p style={{ color: "white" }}>Password</p>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
          <span>
            Donot have an account ? <Link to="/lspregister">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 89.2vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
      font-size: 40px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
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
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
