import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Doc.css';

const BookingPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        appointment_date: '',
        message: '',
    });
    const [availability, setAvailability] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('/api/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    const handleDoctorChange = (event) => {
        setSelectedDoctor(event.target.value);
        setAvailability(''); // Clear availability when doctor selection changes
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckAvailability = async () => {
        try {
            const response = await axios.get(`/api/doctors/${selectedDoctor}/availability`);
            setAvailability(response.data.availability);
        } catch (error) {
            console.error('Error checking availability:', error);
            setAvailability('Availability information not available');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Add your appointment booking logic here
            // ...
            alert('Appointment booked successfully!');
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Failed to book appointment. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Book Appointment</h1>
            <form onSubmit={handleSubmit}>
                {/* Doctor selection */}
                <div>
                    <label>Select Doctor:</label>
                    <select value={selectedDoctor} onChange={handleDoctorChange}>
                        <option value="">Select a doctor</option>
                        {doctors.map(doctor => (
                            <option key={doctor._id} value={doctor._id}>
                                {doctor.firstName} {doctor.lastName} - {doctor.specialization}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button type="button" onClick={handleCheckAvailability}>Check Availability</button>
                    {availability && <p>Availability: {availability}</p>}
                </div>
                <div className="container">
                    <h2>Doctor Appointment Form</h2>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="appointment_date">Preferred Appointment Date</label>
                        <input type="date" id="appointment_date" name="appointment_date" value={formData.appointment_date} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Additional Message (Optional)</label>
                        <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleInputChange}></textarea>
                    </div>
                    <button type="submit">Book Appointment</button>
                </div>
            </form>
        </div>
    );
};

export default BookingPage;
