import React from 'react';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function cartshop(props) {
    const { id, imgsrc, tittle, price, quantity, onAdd } = props;
    const message = () => {
        toast.success("item added sucessfully")
    }

    return (
        <>
            <Card style={{ width: '12rem' }} className='shadow my-2'>
                <Card.Img variant="top" src={props.imgsrc} />
                <Card.Body>
                    <Card.Title>{props.tittle}</Card.Title>
                    <Card.Text>
                        ₹{props.price} kg
                    </Card.Text>
                    <Button variant="success" onClick={() => { message(); onAdd({ id, imgsrc, tittle, price, quantity }) }}>Add to Cart</Button>
                    <ToastContainer />
                </Card.Body>
            </Card>
        </>
    )
}
