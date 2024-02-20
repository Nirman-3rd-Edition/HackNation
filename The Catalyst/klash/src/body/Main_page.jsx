
import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.css'; 
import Carousel from 'react-bootstrap/Carousel'; 
import img1 from "./Images/img1.jpg"
import img2 from "./Images/img2.jpg"
import img3 from "./Images/img3.png"

export default function Main_page() { 
return ( 
	<div>  
	<Carousel> 
		<Carousel.Item interval={2000}> 
		<img 
			className="d-block w-100"
      src={img1} style={{ width: '100%', height: '400px',objectFit:'cover' }}
			alt="Image One"
		/> 
		<Carousel.Caption> 
			<h3>Label for first slide</h3> 
			<p>Sample Text for Image One</p> 
		</Carousel.Caption> 
		</Carousel.Item> 
		<Carousel.Item interval={2000}> 
		<img 
			className="d-block w-100"
      src={img2} style={{ width: '100%', height: '400px',objectFit:'cover' }}
			alt="Image Two"
		/> 
		<Carousel.Caption> 
			<h3>Label for second slide</h3> 
			<p>Sample Text for Image Two</p> 
		</Carousel.Caption> 
		</Carousel.Item>
    <Carousel.Item interval={2000}> 
		<img 
			className="d-block w-100"
      src={img3} style={{ width: '100%', height: '400px',objectFit:'cover' }}
			alt="Image Two"
		/> 
		<Carousel.Caption> 
			<h3>Label for second slide</h3> 
			<p>Sample Text for Image Two</p> 
		</Carousel.Caption> 
		</Carousel.Item> 
	</Carousel> 
	</div> 
); 
}
