import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../Context/Authcontext';
import {useNavigate} from 'react-router-dom';
const MyForm = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [formData, setFormData] = useState({
    uid: token,
    name: '',
    email: '',
    location: [null, null], // Initially set to null, will be updated after getting the location
    type: '',
    role: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any required field is empty
    const requiredFields = ['name', 'email', 'type', 'role', 'phone'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    if (emptyFields.length > 0) {
      alert(`Please fill in the following fields: ${emptyFields.join(', ')}`);
      return;
    }
  
    try {
      // Make API call to send form data
      console.log(`http://localhost:3000/api/order/addUserOrder`);
      const response = await axios.post("http://localhost:3000/api/profile/addProfile", formData);

      console.log(response.data); // Handle response from the server
      alert('Form submitted successfully');
      localStorage.setItem('profile', JSON.stringify(formData));
      navigate('/home');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };
  

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setFormData({
            ...formData,
            location: [position.coords.latitude.toString(), position.coords.longitude.toString()]
          });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <Container>
      <h1>My Profile</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>UID</Form.Label>
          <Form.Control type="text" name="uid" value={formData.uid} onChange={handleChange} disabled />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" name="location1" value={formData.location[0]} onChange={handleChange} placeholder="Latitude" disabled />
          <Form.Control type="text" name="location2" value={formData.location[1]} onChange={handleChange} placeholder="Longitude" disabled />
          <Button className='mt-2' type="button" onClick={getLocation}>Get Location</Button>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
          <Form.Label>Organisation type?</Form.Label>
          <Form.Control type="text" name="type" value={formData.type} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
          <Form.Label>Are you a donor or distributor?</Form.Label>
          <Form.Control type="text" name="role" value={formData.role} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit">Save Profile</Button>
      </Form>
    </Container>
  );
};

export default MyForm;
