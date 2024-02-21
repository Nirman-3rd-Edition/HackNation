import { React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Cartshop from '../Components/Cartshop';
import { Container, Row, Col, Carousel, Button, Form } from 'react-bootstrap';
import './Market.css'
import s1 from './images/img-s-1.jpg';
import s2 from './images/img-s-2.jpg';
import s3 from './images/img-s-3.jpg';
import vdata from '../Components/vdata';
import fdata from '../Components/fdata';
import dfdata from '../Components/dfdata';
import { useNavigate } from 'react-router-dom';






export default function Market() {

  const [active, setactive] = useState("veg");
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
        <Cartshop
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
                <li><Button className='shadow-lg' variant='outline-success' onClick={() => setactive('veg')}>Vegetables</Button></li>
                <li><Button className='shadow-lg' variant='outline-success' onClick={() => setactive('fruit')}>Fruits</Button></li>
                <li><Button className='shadow-lg' variant='outline-success' onClick={() => setactive('dfruit')}>Dry Fruits</Button></li>
              </ul>
            </div>
          </Col>
          <Col className='main-frame-cont p-0' >
            <Carousel className='m-0 p-0 object-fit-none'>
              <Carousel.Item >
                <img src={s1} alt="slide-img-1" height={350} width={1300} />
                <Carousel.Caption className='text-start'>
                  <h3>50% OFF <br />
                    Shop Badam Milk & Badam Drink</h3>
                  <p>
                    The Real Taste And Boost Your Day With The Power
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={s2} alt="slide-img-2" height={350} width={1300} />
                <Carousel.Caption className='text-start'>
                  <h3>30% OFF <br />
                    Fruit Produced Buy Apple</h3>
                  <p>
                    SALE UP TO 30% OFF <br />
                    The Real Taste And Boost Your Day With The Power
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={s3} alt="slide-img-3" height={350} width={1300} />
                <Carousel.Caption className='text-start'>
                  <h3>20% OFF <br />
                    Buy Fresh Bread Every Day</h3>
                  <p>
                    SALE UP TO 20% OFF <br />
                    The Real Taste And Boost Your Day With The Power
                  </p>
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
                {active === 'veg' && vdata.map(ncard)}
                {active === 'fruit' && fdata.map(ncard)}
                {active === 'dfruit' && dfdata.map(ncard)}
              </Row>
            </div>
          </Col>
        </Row>
      </Container >
      <Footer />

    </>
  )
}
