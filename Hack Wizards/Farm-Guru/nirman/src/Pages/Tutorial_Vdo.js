import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Tutorial_Vdo() {
    const location = useLocation();
    const { title, description, image, expertName,Designation,view_button } = location.state;
    const handleViewTutorialClick = () => {
        window.open(view_button, '_blank');
    };
    return (
        <div>
            <Header/>
            &emsp;
            <h1 style={{ marginLeft: '70px' }}><u>Tutorial video</u></h1>
            
            <div style={{ display: 'flex' }}>

                <div className='image_div'> <img src={image} alt={title} style={{ marginLeft:'20px',marginRight: '20px',width:'800px',height:'500px ',marginBottom:'100px', marginTop:'40px', borderRadius:'12px'}}/>
                <Button className='button_class' variant="primary" onClick={handleViewTutorialClick}>View Tutorial</Button>
                </div>
                <div className='details'>
                    &emsp;
                    <p></p>
                    <h1 style={{ margin: '0' }}>{title}</h1>
                    &emsp;
                    &emsp;
                    <p><b>Description:</b></p>
                    <p>{description}</p>
                    <p> <b>Expert:</b></p> 
                    <p>{expertName}</p>
                    <p><b>Designation:</b></p>
                    <p> {Designation}</p>

                </div>                
            </div>
            

            <Footer/>
        </div>
    )
}
