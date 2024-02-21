import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Container, Row, Col, Card } from 'react-bootstrap';
import team from '../Components/images/team.jpg';
import farmer from '../Components/images/farmer.jpg';
import technology from '../Components/images/technology.jpg';
import './Aboutus.css';

export default function Aboutus() {
    return (
        <>
            <Header />
            <section className="section">
            <div className='p-4'>
                <h1 className="section-title">About Us</h1>
                <p className='section-subtitle'></p>
            </div>

            <Container className="about-us">
                <Row>
                    <Col md={4}>
                        <Card className="about-card">
                            <Card.Img variant="top" src={team} alt="Team Member" />
                            <Card.Body>
                                <Card.Title>Our Team</Card.Title>
                                <Card.Text>
                                    We are a group of passionate developers and designers who have come together to create this platform.Each of us contributed our time and knowledge.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        {/* Corrected the typo in the opening tag */}
                        <Card className="about-card">
                            <Card.Img variant="top" src={farmer} alt="farmer" />
                            <Card.Body>
                                <Card.Title>Our Mission</Card.Title>
                                <Card.Text>
                                    Our mission is to provide the best possible experience for our
                                    customers by offering high-quality products and exceptional
                                    customer service.And give them better experience.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="about-card">
                            <Card.Img variant="top" src={technology} alt="technology" />
                            <Card.Body>
                                <Card.Title>Our Vision</Card.Title>
                                <Card.Text>
                                    Our vision is to bring sustainable agriculture practices, provide the best services to the farmers, and spread knowledge and awareness among target.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
             </Container>
            </section>
            <Footer />
        </>
    );
}

