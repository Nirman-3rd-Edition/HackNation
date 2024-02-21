import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CartItem from '../Components/CartItem';
import { useLocation } from 'react-router-dom';
import './Cart.css';


export default function Cart() {

    const location = useLocation();
    const { cartItems } = location.state;
    const [updatecart, setupdatecart] = useState(cartItems);

    // console.log(cartItems);

    const navigate = useNavigate();



    const deleteitems = (itemId) => {

        const indexToDelete = updatecart.findIndex(item => item.tittle === itemId.tittle);
        const newCart = [...updatecart];
        newCart.splice(indexToDelete, 1);
        setupdatecart(newCart);

    }


    const updateQuantity = (tittle, newQuantity) => {
        const newCart = updatecart.map((item) => (item.tittle === tittle) ? { ...item, quantity: newQuantity } : item);
        setupdatecart(newCart);
    };


    const calculateTotal = () => {
        return updatecart.reduce((total, item) => total + item.price * item.quantity, 0);
    };



    return (
        <>
            <Header />
            <Container className='mw-100'>
                <Row>
                    <Col className='p-0'>
                        <h1 className='text-center'>The Cart</h1>
                        <div className='cart-cont p-2 mx-3 '>
                            {

                                updatecart.map((item) => (<CartItem key={item.tittle}
                                    id={item.id}
                                    imgsrc={item.imgsrc}
                                    tittle={item.tittle}
                                    price={item.price}
                                    quantity={item.quantity}
                                    onDelete={deleteitems}
                                    onUpdateQuantity={updateQuantity}
                                />))
                            }
                        </div>
                        <div className='text-end m-3'>
                            <Button variant='outline-success' onClick={() => navigate(-1)}>Go Back to Market</Button>
                        </div>
                    </Col>
                    <Col xs={3}>
                        <Row className='side-ht-up'>
                            <Col>
                                <div className='shadow coupon-cont text-center'>
                                    <h3 className='text-center my-3 p-2'>Coupon Code</h3>
                                    <Form className="d-flex mx-auto my-3 shadow-sm w-75 " >
                                        <Form.Control
                                            type="search"
                                            placeholder="Enter Your Coupon Code"
                                            className="me-2"
                                            aria-label="Search"
                                        />
                                    </Form>
                                    <Button variant='outline-success'>Apply</Button>
                                </div>

                            </Col>
                        </Row>
                        <Row className='side-ht-dn'>
                            <Col className='mb-3'>
                                <div className='shadow total-cont text-center'>
                                    <h3 className='text-center mt-3 p-2'>Cart Total</h3>
                                    <h2 className='mx-3 p-2'>Total : ₹{calculateTotal().toFixed(2)}</h2>
                                    <Button className='my-3 p-2' variant='outline-success'>Pay Now</Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}
