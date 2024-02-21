import { React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Rentalcart from '../Components/Rentalcart';
import { Container, Row, Col, Carousel, Button, Form } from 'react-bootstrap';
import './Rentals.css'
import s1 from './images/tractor-img-1.webp';
import s2 from './images/tractor-img-2.webp';
import s3 from './images/tractor-img-3.jpg';
import ls_data from '../Components/ls_data';
import tf_data from '../Components/tf_data';
import fe_data from '../Components/fe_data';
import { useNavigate } from 'react-router-dom';

export default function Rentals() {
  const [active, setactive] = useState('Farm Equipments');
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate();

  const addToCart = (cartObj) => {
    cartItems.push(cartObj);
    setCartItems(cartItems);
    // console.log(cartItems);
  }

  function ncard(val) {
    return (
      <Col>
        <Rentalcart
          id={val.id}
          imgsrc={val.imgsrc}
          tittle={val.Title}
          price={val.price}
          quantity={val.quantity}
          onAdd={addToCart}
        />
      </Col>
    )
  }
 
    return (
        <>
      <Header />
      <Container fluid className='market-cont mw-100'>
        <Row>
          <Col className='side-bar-cont' >
            <h5 className='text-center fs-3 m-2'>Products</h5>
            <hr className='hr' />
            <div className='side-bar-l fs-6'>
              <ul>
                <li><Button className='shadow-lg' variant='outline-success' onClick={() => setactive('Farm Equipments')}>Farm Equipments</Button></li>
                <li><Button className='shadow-lg' variant='outline-success' onClick={() => setactive('Transport')}>Transport Facilities</Button></li>
                <li><Button className='shadow-lg' variant='outline-success' onClick={() => setactive('Storage Facilities')}>Storage Facilities</Button></li>

              </ul>
            </div>
          </Col>
          <Col className='main-frame-cont p-0' >
            <Carousel className='m-0 p-0 object-fit-none'>
              <Carousel.Item >
                <img src={s1} alt="slide-img-1" height={350} width={1300} />
                <Carousel.Caption className='text-start'>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={s2} alt="slide-img-2" height={350} width={1300} />
                <Carousel.Caption className='text-start'>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={s3} alt="slide-img-3" height={350} width={1300} />
                <Carousel.Caption className='text-start'>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            <div>
              <Row className='m-0'>
                <Col>
                  <Form className="d-flex my-3 shadow-sm" >
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button className='shadow-sm' variant="outline-success">Search</Button>
                  </Form>
                </Col>
                <Col xs={2}>
                  <Button className='mt-3 d-flex shadow-sm mx-auto' variant='outline-success' onClick={() => navigate('/Market/Cart', { state: { cartItems: cartItems } })}><span className='mx-auto'>Cart 🛒</span></Button>
                </Col>
              </Row>
              <Row className='m-0'>
                {active === 'Farm Equipments' && fe_data.map(ncard)}
                {active === 'Transport' && tf_data.map(ncard)}
                {active === 'Storage Facilities' && ls_data.map(ncard)}
              </Row>
            </div>
          </Col>
        </Row>
      </Container >
      <Footer />

    </>
    )
}
