import React from 'react'
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
// import { Button, Form } from 'react-bootstrap';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import "./Home.css";
//import homeimg from '../Components/images/homeimg.jpg';
import { Container, Row, Col } from 'react-bootstrap';
import Aariyan from '../Components/images/Aariyan.jpg';
import Pratyusha from '../Components/images/Pratyusha.jpeg';
import Sonal from '../Components/images/Sonal.jpg';
import Mitali from '../Components/images/Mitali.jpeg';



export default function Homepage() {

  return (
    <>
      <Header />
      <div className="mainSection">
        <div className="Box">
          <div className="header">
            <div className="main-heading">
              <h1 className='heading'>Welcome To Farm Guru</h1>
              <div className='sub-heading'>
                <h3 className='side-heading' style={{ color: 'white' }}>Where Every Seed Finds, A Story! </h3>
              </div>
            </div>
          </div>

        </div>
      </div>
      <section className="section">
        <div className='p-4'>
        <h1 className="section-title">The Team Behind FarmGuru</h1>
        <p className='section-subtitle'></p>
        </div>
        
        <Container>
          <Row className="justify-content-center">
            <Col >
              <div className="team-item">
                <img src={Aariyan} className="team-img" alt="pic" />
                <div className="team-info"></div>
                <h2>Aariyan Kumar</h2>
                <h3>Full Stack Developer</h3>
                <p>Hello, I'm Aariyan Kumar, a 3rd-year CST Student. I'm the creative force behind the struture of FarmGuru.</p>
              </div>
            </Col>
            <Col >
              <div className="team-item">
                <img src={Pratyusha} className="team-img" alt="pic" />
                <div className="team-info"></div>
                <h2>Pratyusha Mohanty</h2>
                <h3>ML Engineer</h3>
                <p>Hello, I'm Pratyusha, a 3rd-year CST Student. I'm the creative force behind our Weather Forecasting page.</p>
              </div>
            </Col>
            <Col>
              <div className="team-item">
                <img src={Sonal} className="team-img" alt="pic" />
                <div className="team-info"></div>
                <h2>Sonal Sharma</h2>
                <h3>Web Developer</h3>
                <p>Hello, I'm Sonal Sharma, a 3rd-year ECE Student. I'm the creative force behind our community page for website.</p>
              </div>
            </Col>
            <Col>
              <div className="team-item">
                <img src={Mitali} className="team-img" alt="pic" />
                <div className="team-info"></div>
                <h2>Mitali Bhakat </h2>
                <h3>Web Developer - Frontend</h3>
                <p>Hello, I'm Mitali Bhakat, a 3rd-year ECE enthusiast. I'm the creative force behind our Home page and login page.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}




