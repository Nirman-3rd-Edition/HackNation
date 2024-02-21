import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Button, Col, Container, Row,Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const OrderCards = () => {
  const [orders, setOrders] = useState([]);
const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    setSpinner(true);
    axios.get('http://localhost:3000/api/order/Orderloc')
      .then(response => {
        setOrders(response.data);
        setSpinner(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <Container fluid>
        <h1 style={{textAlign:"center",borderBottom:"2px solid black"}}>Active Order near your location</h1>
        {spinner ? <Spinner animation="border" role="status" style={{position:"absolute",top:"50%",left:"50%"}} /> :<>
        
        <Row>
      { orders.length>0 ? orders.map((order) => (
        <Col md={3} xs={12} key={order._id}>
        <Card  style={{ width: '18rem',border:"2px solid black" }}>
          <Card.Body>
            <Card.Title> <span style={{fontWeight:"700"}}>Order ID:</span> {order.oid}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted"> <span style={{fontWeight:"700"}}>Time:</span> {order.time}</Card.Subtitle>
            <Card.Text>
                <p><span style={{fontWeight:"700"}}>Location:</span> {order.location}</p>
              <p style={{fontWeight:"700"}}>Food Items:</p>
              <ul>
                {order.foodname.map((food, index) => (
                  <li key={index}>
                    {food} - Quantity: {order.quantity[index]}
                  </li>
                ))}
              </ul>
              
              <p> <span style={{fontWeight:"700"}}>Status:</span> {order.status ? "Completed" : "Pending"}</p>
              <p> <span style={{fontWeight:"700"}} >Date:</span> {new Date(order.date).toLocaleDateString()}</p>
            </Card.Text>
            <div style={{display:"flex",justifyContent:"center"}}>
                
               
            <Link to={`/details/${order.oid}`} style={{textAlign:"center"}}>
                <Button variant="primary">View Details</Button>
                </Link>

</div>
            
          </Card.Body>
        </Card>
        </Col>
      )): <h1>No Active Orders</h1>}
      </Row>
        </>
        
        }
        
    </Container>
  );
};

export default OrderCards;
