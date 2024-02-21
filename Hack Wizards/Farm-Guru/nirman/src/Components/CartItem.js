import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import './CartItem.css';


export default function CartItem(item) {
    const { id, imgsrc, tittle, price, quantity, onDelete, onUpdateQuantity } = item;
    let qnt = quantity;



    const inc = () => {
        const newQuantity = ++qnt;
        onUpdateQuantity(tittle, newQuantity)

    }

    const dec = () => {
        if (qnt === 1) {
            onDelete({ id, imgsrc, tittle, price, quantity })
        }
        else{
            const newQuantity = --qnt;
            onUpdateQuantity(tittle, newQuantity)
        }
        

    }


    return (
        <>
            <div className='cart-item-cont mx-3 '>
                <Container >
                    <Row className='shadow item'>
                        <Col xs={6} className='mx-3'>
                            <Card className="d-flex flex-sm-row border-0 " style={{ height: 'auto' }} >
                                <Image
                                    style={{ objectFit: 'cover', maxWidth: '100%', height: 'auto', width: '150px' }}
                                    src={item.imgsrc}
                                    alt="Caffe Latte"
                                />
                                <Card.Body>
                                    <Card.Title as="h5">{item.tittle}</Card.Title>
                                    <Card.Text>
                                        {item.tittle}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className='my-auto'>
                            <h5>price</h5>
                            <p>₹{item.price} Kg</p>
                        </Col>
                        <Col className='my-auto'>
                            <h5>Quantity</h5>
                            <Button onClick={() => dec()} variant='outline-success'>-</Button>
                            <span className='m-2 sp'>{quantity}</span>
                            <Button onClick={() => inc()} variant='outline-success'>+</Button>
                        </Col>
                        <Col className='my-auto'>
                            <h5>Sub Total price</h5>
                            <p>₹{(quantity * price).toFixed(2)}</p>
                        </Col>
                        <Col className='my-auto'>
                            <Button variant='outline-danger' onClick={() => onDelete({ id, imgsrc, tittle, price, quantity })}>x</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
