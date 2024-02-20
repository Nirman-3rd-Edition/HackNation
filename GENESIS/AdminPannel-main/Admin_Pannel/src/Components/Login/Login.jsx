import React, { useState } from "react";
import { useAuth } from "../Context/Authcontext";
import { Container, Card, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
// import bglog2 from "../../assets/bglog2.jpg";
import "./login.css";
export default function Login() {
  const [phone, setPhone] = useState(null);
  const [otp, setOtp] = useState(null);
  const [showotp, setShowotp] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const { login } = useAuth();
  const handlechange = (e) => {
    setPhone(e.target.value);
  };
  const handlelogin = () => {
    //   alert(phone);
    if (phone) {
        setSpinner(true);
        axios
          .post(`${import.meta.env.VITE_APP_API}otp/sendotp`, { phone: phone })
          .then((res) => {
            console.log(res.data);
            setShowotp(true);
            setSpinner(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("please enter the number");
      }
      
    
  };

  const handleotp =()=>{
    setSpinner(true);
    axios
      .post(`${import.meta.env.VITE_APP_API}otp/verifyotp`, { phone: phone , otp:otp })
      .then((res) => {
        console.log(res.data.uid);
        login(res.data.uid);

        setSpinner(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Container
        id="logcon"
        fluid
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container style={{ display: "flex", flexDirection: "column" }}>
          <br />
          <br />
          <br />
          <Card
            style={{
              width: "",
              color: "white",
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <Card.Body>
              <Card.Title style={{ fontSize: "3rem" }}>
                Welcome to <span style={{ color: "#05FA16" }}>MealsBridge</span>
              </Card.Title>
            </Card.Body>
          </Card>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ fontSize: "2rem", fontWeight: "600" }}>
                Enter Phone Number
              </Form.Label>
              <Form.Control
                type="Number"
                placeholder="+91"
                style={{ height: "50px" }}
                value={phone}
                onChange={handlechange}
              />

              <Form.Text className="text-muted">
                We'll never share your number with anyone else.
              </Form.Text>

              {showotp && (
                <>
                  <Form.Label style={{ fontSize: "2rem", fontWeight: "600" }}>
                    Enter OTP
                  </Form.Label>
                  <Form.Control
                    type="Number"
                    placeholder="Enter OTP"
                    style={{ height: "50px" }}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </>
              )}
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {showotp ? (
                <Button onClick={handleotp}>Verify OTP</Button>
              ) : (
                <Button
                  onClick={handlelogin}
                  style={{
                    backgroundColor: "#05FA16",
                    border: "none",
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "600",
                  }}
                >
                  {spinner ? (
                    <Spinner animation="border" role="status" />
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              )}
            </div>
          </Form>
        </Container>
      </Container>
    </>
  );
}
