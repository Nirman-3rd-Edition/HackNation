import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Spinner, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./Details.css"; // Import your custom CSS file for styling
import { useAuth } from "../Context/Authcontext";

const Details = () => {
  const { oid } = useParams(); // Get oid from URL params
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
const { token } = useAuth();
  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/order/singleOrder/${oid}`
      );
      setOrder(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order:", error);
      setLoading(false);
    }
  };
  const handlesubmit = async () => {
    try {
        // Make API call to update the order status
        setLoading(true);
      const response = await axios.put(
        `http://localhost:3000/api/order/updateOrder/${oid}`,
        { reciveruid: token }
      );
      console.log(response.data);
        setLoading(false);
      alert("Order Assigned to you");
      window.location.reload();
      // Optionally, you can update the local state to reflect the change in status
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  
  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="details-container">
      {loading ? (
        <Spinner
          animation="border"
          role="status"
          className="spinner"
        />
      ) : (
        <Card className="order-card">
          <Card.Body>
            <Card.Title className="order-id">Order ID: {order.oid}</Card.Title>
            <Card.Subtitle className="order-date">
              Date:{" "}
              {order.date ? new Date(order.date).toLocaleDateString() : ""}
            </Card.Subtitle>
            <Card.Text>
              <strong>Location:</strong> {order.location}
              <br />
              <strong>Status:</strong>{" "}
              {order.status ? "Delivered" : "Pending"}
              <br />
              <strong>Time:</strong> {order.time}
              <br />
              {order.foodname && order.quantity && (
                <>
                  <strong>Food Items:</strong>
                  <Row className="food-items">
                    {order.foodname.map((food, index) => (
                      <Col md={4} key={index}>
                        <Card className="food-card">
                          <div className="food-image-container">
                            <Card.Img
                              variant="top"
                              className="food-image"
                              src={`data:image/png;base64,${order.image[index]}`}
                            />
                          </div>
                          <Card.Body>
                            <Card.Title className="food-title">{food}</Card.Title>
                            <Card.Text className="food-quantity">
                              Quantity: {order.quantity[index]}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </>
              )}
            </Card.Text>
            <div style={{display:"flex",justifyContent:"center"}}>

            {order.status ? "Already Assigned" : <Button variant="success" className="back-button" onClick={handlesubmit}>
              {loading&& <Spinner animation="border" role="status" />} Assign to me
            </Button>}
            
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Details;
