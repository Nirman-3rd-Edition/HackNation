import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Container, Row, Col, a, Form, Button } from 'react-bootstrap';
import './Tutorials.css';
import headerimg from '../Pages/images/govt_schemes.png';
import { useNavigate } from 'react-router-dom';


export default function Market() {
  const [active, setActive] = useState("veg");
  const navigate = useNavigate();

  function handleSetActive(category) {
    setActive(category);
  }


  // Render content based on active subtopic
  function renderContent() {
    switch(active) {
      case 'Crop-Specific Tutorials':
        return (
          <div>
              <Row className='m-0'>
                {/* Thumbnail 1 */}
                &emsp;
                <p></p>
                <Col xs={6} md={3}>
                  <div >
                    <img src="https://gardenerspath.com/wp-content/uploads/2023/01/Best-Varieties-of-Sweet-Corn-to-Grow-at-Home-Feature.jpg" alt="Thumbnail 1" style={{width:'180%', height:'350px', borderRadius:'24px'}} />
                    <p></p>
                    <p>
                      <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Corn Varieties and Types',description: 'In this informative video, delve into the world of corn as we explore its fascinating properties and various types. Discover the diverse characteristics that make corn a staple crop worldwide, from its nutritional value to its adaptability to different climates and soil conditions. Learn about the different types of corn, including sweet corn, dent corn, flint corn, and popcorn, each with its unique attributes and culinary uses. Whether you are a seasoned farmer, a curious gardener, or simply interested in the wonders of agriculture, this video will broaden your understanding of corn and its significance in our lives.',image: 'https://gardenerspath.com/wp-content/uploads/2023/01/Best-Varieties-of-Sweet-Corn-to-Grow-at-Home-Feature.jpg',expertName: 'Dr. Emily Johnson Agricultural Scientist and Crop Specialist',image: 'https://gardenerspath.com/wp-content/uploads/2023/01/Best-Varieties-of-Sweet-Corn-to-Grow-at-Home-Feature.jpg',expertName: 'Nebraska Corn ', Designation:'Agricultural Company',view_button:'https://youtu.be/ynHB1zd3FmQ?si=HpSHWelYjwyhe1uY'}})}>Crop varieties and types</a>
                    </p>
                  </div>
                </Col>
                {/* Thumbnail 2 */}
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <Col xs={6} md={3}>
                  <div>
                    <img src={"https://5.imimg.com/data5/SELLER/Default/2023/2/CY/ZY/QC/157840235/istockphoto-874294580-612x612-jpg-500x500.jpg"} alt="Thumbnail 2" style={{width:'180%', height:'350px', borderRadius:'24px'}} />
                    <p>
                      <p></p>
                      <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Harvesting wheat',description: 'The "Harvesting Wheat" video provides a comprehensive guide to the wheat harvesting process, covering various techniques and considerations essential for a successful harvest. From timing and preparation to equipment and best practices, viewers will gain valuable insights into maximizing yield and quality while minimizing losses.',image: 'https://5.imimg.com/data5/SELLER/Default/2023/2/CY/ZY/QC/157840235/istockphoto-874294580-612x612-jpg-500x500.jpg',expertName: 'The Henry Ford',Designation:'YouTube Company',view_button:'https://youtu.be/eNKkLuJUVE0?si=lgXQNWMS5iRw95cH'}})}>Harvesting wheat</a>
                    </p>
                  </div>
                </Col>
              </Row>
              <Row className='m-0'>
                {/* Thumbnail 3 */}
                <Col xs={6} md={3}>
                  <div>
                    <img src={"https://kjcdn.gumlet.io/media/38509/potato-farming-2.jpg"} alt="Thumbnail 1" style={{width:'180%', height:'350px', borderRadius:'24px'}} />
                    <p></p>
                    <p>
                      <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Potato Farming made easy',description: 'The "Potato Farming Made Easy" video offers a detailed overview of potato farming techniques, providing invaluable information for both beginners and experienced farmers. Through a step-by-step approach, viewers will learn essential aspects of potato cultivation, including soil preparation, planting methods, pest and disease management, irrigation strategies, and harvesting practices. Expertly narrated by seasoned agricultural specialists, the video offers practical tips and insights to help farmers achieve optimal yields and quality potatoes. ',image: 'https://kjcdn.gumlet.io/media/38509/potato-farming-2.jpg',expertName: 'Organic Acre',Designation:'Farming Youtuber',view_button:'https://youtu.be/LW5FCxJkFR0?si=EPZWQnVPdaSs2Cfg'}})}  >Potato Farming Made Easy</a>
                    </p>
                  </div>
                </Col>
                {/* Thumbnail 4 */}
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                <Col xs={6} md={3}>
                  <div>
                    <img src={"https://farmkey.in/uploads/blogs/Tomato-Cultivation.jpg"} alt="Thumbnail 2" style={{width:'180%', height:'350px',borderRadius:'24px'}} />
                    <p></p>
                    <p>
                      <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Tomato Cultivation Secrets',description: '"Dive into the world of potato cultivation with our comprehensive guide on unlocking the secrets to successful potato farming. Learn essential techniques, tips, and tricks from seasoned experts to maximize your potato yield and quality. From soil preparation to planting, irrigation, pest management, and harvesting, this video covers everything you need to know to become a successful potato farmer. ',image: 'https://farmkey.in/uploads/blogs/Tomato-Cultivation.jpg',expertName: 'Discover Agriculture',Designation:'Agriculture Youtube Company',view_button:'https://youtu.be/FSFBPtRO4HU?si=pocZAUEsCxBuu-dg'}})}>Tomato Cultivation Secrets</a>
                    </p>
                  </div>
                </Col>
              </Row>
          </div>
    
        );
        case 'Livestock Tutorials':
          return (
            <div>
                <Row className='m-0'>
                &emsp;
                <p></p>
                  {/* Thumbnail 1 */}
                  <Col xs={6} md={3}>
                    <div>
                      <img src={"https://tractorguru.in/blog/wp-content/uploads/2022/12/Cattle-Ranching-different-from-Cattle-Farming.jpg"} alt="Thumbnail 1" style={{width:'180%', height:'350px',borderRadius:'24px'}} />
                      <p></p>
                      <p>
                        <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Introduction to Cattle Farming',description: 'Embark on a journey into the world of cattle farming with our in-depth video guide. Discover the essential principles and practices of successful cattle farming, from selecting the right breed and managing livestock health to optimizing feeding strategies and maximizing productivity. Join expert farmers and ranchers as they share their insights and experiences, offering valuable tips and techniques to help you establish and maintain a thriving cattle operation. ',image: 'https://tractorguru.in/blog/wp-content/uploads/2022/12/Cattle-Ranching-different-from-Cattle-Farming.jpg',expertName: 'B Technology',Designation:'Tech Youtuber',view_button:'https://youtu.be/KZE5OpK7dII?si=0VLStV5ogvZdaFvV'}})} >Introduction to Cattle Farming </a>
                      </p>
                    </div>
                  </Col>
                  {/* Thumbnail 2 */}
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                  <Col xs={6} md={3}>
                    <div>
                      <img src={"https://www.popsci.com/uploads/2023/02/08/how-to-keep-a-chicken-coop-in-your-backyard.jpg?auto=webp"} alt="Thumbnail 2" style={{width:'180%', height:'350px',borderRadius:'24px'}} />
                      <p>
                        <p></p>
                        <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Raising Healthy Chickens',description: 'Explore the fascinating world of chicken farming with our beginners guide to raising healthy chickens. Join us as we delve into the fundamentals of poultry care, covering everything from selecting the right breeds and setting up a comfortable coop to implementing effective nutrition and healthcare practices. Learn how to create a safe and stimulating environment for your flock, ensuring their well-being and productivity.',image: 'https://www.popsci.com/uploads/2023/02/08/how-to-keep-a-chicken-coop-in-your-backyard.jpg?auto=webp',expertName: 'Thehomeylife',Designation:'Blogger',view_button:'https://youtu.be/X6VMbGdowMs?si=Vy45yg9wA8ElL_J3'}})}>Raising Healthy Chickens</a>
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row className='m-0'>
                  {/* Thumbnail 3 */}
                  <Col xs={6} md={3}>
                    <div>
                      <img src={"https://www.treehugger.com/thmb/Ej4PTZakcaZJ-Cfg_JF3wxn-W9Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/goatsandsheep-31561f526a0347e3a9c722bf678ae646.jpg"} alt="Thumbnail 1" style={{width:'180%', height:'350px',borderRadius:'24px'}} />
                      <p></p>
                      <p>
                        <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Sheep and Goat Management',description: 'Unlock the secrets to successful sheep and goat management with our comprehensive guide. Join us as we explore the art and science of caring for these valuable livestock species, covering essential topics such as breed selection, housing and pasture management, nutrition, health care, and breeding practices. Whether you are a seasoned farmer looking to enhance your skills or a newcomer eager to embark on your journey in small ruminant agriculture, this video provides valuable insights and practical tips to help you optimize the health, productivity, and profitability of your flock.',image: 'https://www.treehugger.com/thmb/Ej4PTZakcaZJ-Cfg_JF3wxn-W9Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/goatsandsheep-31561f526a0347e3a9c722bf678ae646.jpg',expertName: 'Gurukul Biology Mantra',Designation:'Teacher',view_button:'https://youtu.be/hFd_QKpNsbY?si=CY4gUdOGIPae-i_C'}})} >Sheep and Goat Management</a>
                      </p>
                    </div>
                  </Col>
                  {/* Thumbnail 4 */}
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                  <Col xs={6} md={3}>
                    <div>
                      <img src={"https://upload.wikimedia.org/wikipedia/commons/b/bf/Pig_farm_Vampula_9.jpg"} alt="Thumbnail 2" style={{width:'180%', height:'350px',borderRadius:'24px'}} />
                      <p></p>
                      <p>
                        <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Pig Husbandry',description: 'Delve into the world of pig husbandry and discover the keys to successful pig farming. In this informative video, we cover everything you need to know to raise healthy and productive pigs, from selecting the right breed and housing setup to managing nutrition, health, and breeding. Join us as we explore best practices for pig care, including feeding regimes, shelter design, disease prevention, and reproductive management.',image: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Pig_farm_Vampula_9.jpg',expertName: 'This will Do Farm',Designation:'Farming blogger',view_button:'https://youtu.be/wfBQYHeB9II?si=6asrhUzG7Q0LCaRE'}})}>Pig Husbandry </a>
                      </p>
                    </div>
                  </Col>
                </Row>
            </div>
          );
          case 'Farming Techniques':
          return (
            <div>
                <Row className='m-0'>
                &emsp;
                <p></p>
                  {/* Thumbnail 1 */}
                  <Col xs={6} md={3}>
                    <div>
                      <img src={"https://eos.com/wp-content/uploads/2021/03/soil-fertility-loss.jpg"} alt="Thumbnail 1" style={{width:'180%', height:'350px',borderRadius:'24px'}} />
                      <p></p>
                      <p>
                        <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Soil health and fertility',description: 'Unlock the secrets of soil fertility in this comprehensive video guide. Dive deep into the fascinating world beneath our feet as we explore the factors that influence soil health and productivity. Learn how to assess soil fertility levels, interpret soil test results, and develop customized fertility management plans tailored to your specific crop needs. Discover the vital role of soil microorganisms, organic matter, and nutrient cycling in sustaining healthy soils and optimizing crop yields. ',image: 'https://eos.com/wp-content/uploads/2021/03/soil-fertility-loss.jpg',expertName: 'Scroll.in',Designation:'News Channel',view_button:'https://youtu.be/DViA3VPunx4?si=NrnnOcQZzpuW3q67'}})}>Soil Health and Fertility </a>
                      </p>
                    </div>
                  </Col>
                  {/* Thumbnail 2 */}
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                  <Col xs={6} md={3}>
                    <div>
                      <img src={"https://www.ugaoo.com/cdn/shop/articles/shutterstock_562184122.jpg?v=1661876335"} alt="Thumbnail 2" style={{width:'180%', height:'350px',borderRadius:'24px'}} />
                      <p>
                        <p></p>
                        <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Irrigation methods',description: 'Explore the diverse world of irrigation methods with this informative video presentation. From traditional techniques to modern innovations, discover a range of strategies for delivering water to your crops efficiently and effectively. Learn about surface irrigation methods such as furrow and flood irrigation, as well as subsurface techniques like drip and trickle irrigation. ',image: 'https://www.ugaoo.com/cdn/shop/articles/shutterstock_562184122.jpg?v=1661876335',expertName: 'Discover Agriculture',Designation:'Agriculture Research Youtuber',view_button:'https://youtu.be/Z9HAy9EYKKs?si=sfyyAnDOj-OjeJ3x'}})}>Irrigation Methods</a>
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row className='m-0'>
                  {/* Thumbnail 3 */}
                  <Col xs={6} md={3}>
                    <div>
                      <img src={"https://jcblagri.in/x_images/blog_pics/1683374632Artboard_5-min_11zon.jpg"} alt="Thumbnail 1" style={{width:'180%', height:'350px',borderRadius:'24px'}} />
                      <p></p>
                      <p>
                        <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Organic Farming Practices',description:'Discover the principles and benefits of organic farming in this enlightening video presentation. Dive into the world of sustainable agriculture as we explore organic farming practices that prioritize soil health, biodiversity, and environmental stewardship. Learn about the key components of organic farming, including crop rotation, composting, and natural pest management techniques. ',image: 'https://jcblagri.in/x_images/blog_pics/1683374632Artboard_5-min_11zon.jpg',expertName: 'Discover Agriculture',Designation:'Agriculture Research Youtuber',view_button:'https://youtu.be/lRyXlvIJFWI?si=tLePucX9GkX-xH3Y'}})} >Organic Farming Practices</a>
                      </p>
                    </div>
                  </Col>
                  {/* Thumbnail 4 */}
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                  <Col xs={6} md={3}>
                    <div>
                      <img src={"https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638889433/EducationHub/photos/agricultural-runoff.jpg"} alt="Thumbnail 2" style={{width:'180%', height:'350px',borderRadius:'24px'}} />
                      <p></p>
                      <p>
                        <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Agriculture Technologies',description: 'Embark on a journey into the cutting-edge world of agricultural technologies with this insightful video presentation. Explore how advancements in science and engineering are revolutionizing modern farming practices and shaping the future of agriculture. From precision farming and data-driven decision-making to automation and robotics, discover how technology is enhancing efficiency, productivity, and sustainability in agriculture. ',image: 'https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638889433/EducationHub/photos/agricultural-runoff.jpg',expertName: 'Noal Farm',Designation:'Farming Youtuber',view_button:'https://youtu.be/mLagWlRFAo8?si=TgRd0pBgI3jyZovc'}})}> Agriculture Technologies</a>
                      </p>
                    </div>
                  </Col>
                </Row>
            </div>
          );
          case 'Machinery & Equipment':
          return (
            <div>
                <Row className='m-0'>
                &emsp;
                <p></p>
                  {/* Thumbnail 1 */}
                  <Col xs={6} md={3}>
                    <div>
                      <img src={"https://kjcdn.gumlet.io/media/84768/untitled-design.jpg"} alt="Thumbnail 1" style={{width:'180%', height:'350px',borderRadius:'24px'}} />
                      <p></p>
                      <p>
                        <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Understanding Different Types of Harvesters',description: 'Join us on an educational journey through the diverse world of harvesters in this comprehensive video guide. Harvesters play a crucial role in modern agriculture, efficiently gathering crops from fields and preparing them for further processing. In this video, we explore the various types of harvesters used across different agricultural practices and crop types. From combine harvesters for grain crops like wheat and corn to specialized harvesters for fruits, vegetables, and other crops, learn about the unique features and functionalities of each type.',image: 'https://kjcdn.gumlet.io/media/84768/untitled-design.jpg',expertName: 'Interesting Engineering',Designation:'Information Youtuber',view_button:'https://youtu.be/dkXBtDkt-14?si=5omFUaLMQwCGLmdY'}})} >Understanding Different Types of Harvesters</a>
                      </p>
                    </div>
                  </Col>
                  {/* Thumbnail 2 */}
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                  <Col xs={6} md={3}>
                    <div>
                      <img src={"https://i.ytimg.com/vi/7Aea_J3Q2UE/maxresdefault.jpg"} alt="Thumbnail 2" style={{width:'180%', height:'350px',borderRadius:'24px'}} />
                      <p>
                        <p></p>
                        <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Best Plow for Your Field',description: 'Delve into the world of agricultural implements with our in-depth guide to selecting the best plow for your field. Plowing is a fundamental practice in agriculture, preparing the soil for planting by breaking up compacted earth and incorporating organic matter. In this informative video, we explore the various types of plows available on the market and discuss their suitability for different soil types, field sizes, and farming practices. ',image: 'https://i.ytimg.com/vi/7Aea_J3Q2UE/maxresdefault.jpg',expertName: 'The Plow Guys',Designation:'Youtuber',view_button:'https://youtu.be/P9KAN_uRVQg?si=kTCqbaqHJ9I-ltTa'}})}>Best Plow for Your Field</a>
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row className='m-0'>
                  {/* Thumbnail 3 */}
                  <Col xs={6} md={3}>
                    <div>
                      <img src={"https://cdn.wikifarmer.com/wp-content/uploads/2023/05/Boosting-Agriculture-Production-through-Mechanization-A-game-changer-for-farmer.jpg"} alt="Thumbnail 1" style={{width:'180%', height:'350px',borderRadius:'24px'}} />
                      <p></p>
                      <p>
                        <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Proper Operation and Maintenance of Farm Machinery',description: 'Increase the longevity and efficiency of your farm machinery with our comprehensive guide to proper operation and maintenance practices. Farm equipment is a significant investment for any agricultural operation, and proper care is essential to ensure optimal performance and reliability. In this instructional video, we cover everything you need to know to keep your tractors, harvesters, planters, and other machinery running smoothly year-round. ',image: 'https://cdn.wikifarmer.com/wp-content/uploads/2023/05/Boosting-Agriculture-Production-through-Mechanization-A-game-changer-for-farmer.jpg',expertName: 'New Entry Sustainable Farming Project',Designation:'Project Blogger',view_button:'https://youtu.be/htPHQmPy3hw?si=WrU_aNO6OPA37d5Y'}})} >Proper Operation and Maintenance of Farm Machinery</a>
                      </p>
                    </div>
                  </Col>
                  {/* Thumbnail 4 */}
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                  <Col xs={6} md={3}>
                    <div>
                      <img src={"https://www.reuters.com/resizer/13zJHNndSCUEOjbQ5IttHacmX5o=/1920x1005/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/TW5B6IRF5BJ43LIKPJ2MXRFEJA.jpg"} alt="Thumbnail 2" style={{width:'180%', height:'350px',borderRadius:'24px'}} />
                      <p></p>
                      <p>
                        <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Upgrading Your Farm Equipment',description: 'Stay ahead of the curve and optimize your farm productivity with our guide to upgrading your farm equipment. As technology continues to advance, modernizing your machinery can offer significant benefits in efficiency, performance, and cost-effectiveness. In this informative video, we explore the latest innovations and upgrades available for various types of farm equipment, from tractors and combines to irrigation systems and precision agriculture tools. ',image: 'https://www.reuters.com/resizer/13zJHNndSCUEOjbQ5IttHacmX5o=/1920x1005/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/TW5B6IRF5BJ43LIKPJ2MXRFEJA.jpg',expertName: 'Model Deere Farmer',Designation:'Farmer Youtuber',view_button:'https://youtu.be/8VRWcf7DqSw?si=a6aL06RiG7KLz3rT'}})}> Upgrading Your Farm Equipment</a>
                      </p>
                    </div>
                  </Col>
                </Row>
            </div>
          );
        

          case 'Government Schemes':
            return (
              <div>
                  <Row className='m-0'>
                  &emsp;
                  <p></p>
                    <img src={headerimg} alt="image"></img>
                  </Row>
                  <Row className='m-0'>
                    {/* Thumbnail 1 */}
                    <Col xs={6} md={3}>
                      <div>
                        <p></p>
                        <p>
                          <a href="https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012" target="_blank" rel="noopener noreferrer" >1. Pradhan Mantri Kisan Samman Nidhi(PM-KISAN)</a>
                        </p>
                      </div>
                    </Col>
                    {/* Thumbnail 2 */}
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                    <Col xs={6} md={3}>
                      <div>
                        <p>
                          <p></p>
                          <a href="https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012" target="_blank" rel="noopener noreferrer">2. Pradhan Mantri Kisan MaanDhan Yojana (PM-KMY)</a>
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row className='m-0'>
                    {/* Thumbnail 3 */}
                    <Col xs={6} md={3}>
                      <div>
                        <p></p>
                        <p>
                          <a href="https://vikaspedia.in/agriculture/agri-insurance/pradhan-mantri-fasal-bima-yojana" target="_blank" rel="noopener noreferrer" >3. Pradhan Mantri Fasal Bima Yojana (PMFBY)</a>
                        </p>
                      </div>
                    </Col>
                    {/* Thumbnail 4 */}
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                    <Col xs={6} md={3}>
                      <div>
                        <p></p>
                        <p>
                          <a href="https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012" target="_blank" rel="noopener noreferrer">4. Modified Interest Subvention Scheme (MISS)</a>
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row className='m-0'>
                    {/* Thumbnail 1 */}
                    <Col xs={6} md={3}>
                      <div>
                        <p></p>
                        <p>
                          <a href="https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012" target="_blank" rel="noopener noreferrer" >5. Agriculture Infrastructure Fund (AIF)</a>
                        </p>
                      </div>
                    </Col>
                    {/* Thumbnail 2 */}
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                    <Col xs={6} md={3}>
                      <div>
                        <p>
                          <p></p>
                          <a href="https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012" target="_blank" rel="noopener noreferrer">6. Paramparagat Krishi Vikas Yojana (PKVY)</a>
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row className='m-0'>
                    {/* Thumbnail 3 */}
                    <Col xs={6} md={3}>
                      <div>
                        <p></p>
                        <p>
                          <a href="https://vikaspedia.in/schemesall/schemes-for-farmers/crop-insurance-schemes" target="_blank" rel="noopener noreferrer" >7. Coconut Palm Insurance Scheme (CPIS)</a>
                        </p>
                      </div>
                    </Col>
                    {/* Thumbnail 4 */}
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                    <Col xs={6} md={3}>
                      <div>
                        <p></p>
                        <p>
                          <a href="https://vikaspedia.in/schemesall/schemes-for-farmers/crop-insurance-schemes" target="_blank" rel="noopener noreferrer"> 8. Weather based Crop Insurance Scheme (WBCIS)</a>
                        </p>
                      </div>
                    </Col>
                  </Row>
              </div>
            );  
      // Add cases for other subtopics as needed
      default:
        return (
            <div>
                <Row className='m-0'>
                  {/* Thumbnail 1 */}
                  &emsp;
                  <p></p>
                  <Col xs={6} md={3}>
                    <div >
                      <img src="https://gardenerspath.com/wp-content/uploads/2023/01/Best-Varieties-of-Sweet-Corn-to-Grow-at-Home-Feature.jpg" alt="Thumbnail 1" style={{width:'180%', height:'350px', borderRadius:'24px'}} />
                      <p></p>
                      <p>
                        <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Corn Varieties and Types',description: 'In this informative video, delve into the world of corn as we explore its fascinating properties and various types. Discover the diverse characteristics that make corn a staple crop worldwide, from its nutritional value to its adaptability to different climates and soil conditions. Learn about the different types of corn, including sweet corn, dent corn, flint corn, and popcorn, each with its unique attributes and culinary uses. Whether you are a seasoned farmer, a curious gardener, or simply interested in the wonders of agriculture, this video will broaden your understanding of corn and its significance in our lives.',image: 'https://gardenerspath.com/wp-content/uploads/2023/01/Best-Varieties-of-Sweet-Corn-to-Grow-at-Home-Feature.jpg',expertName: 'Dr. Emily Johnson Agricultural Scientist and Crop Specialist',image: 'https://gardenerspath.com/wp-content/uploads/2023/01/Best-Varieties-of-Sweet-Corn-to-Grow-at-Home-Feature.jpg',expertName: 'Nebraska Corn ', Designation:'Agricultural Company',view_button:'https://youtu.be/ynHB1zd3FmQ?si=HpSHWelYjwyhe1uY'}})}>Crop varieties and types</a>
                      </p>
                    </div>
                  </Col>
                  {/* Thumbnail 2 */}
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  <Col xs={6} md={3}>
                    <div>
                      <img src={"https://5.imimg.com/data5/SELLER/Default/2023/2/CY/ZY/QC/157840235/istockphoto-874294580-612x612-jpg-500x500.jpg"} alt="Thumbnail 2" style={{width:'180%', height:'350px', borderRadius:'24px'}} />
                      <p>
                        <p></p>
                        <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Harvesting wheat',description: 'The "Harvesting Wheat" video provides a comprehensive guide to the wheat harvesting process, covering various techniques and considerations essential for a successful harvest. From timing and preparation to equipment and best practices, viewers will gain valuable insights into maximizing yield and quality while minimizing losses.',image: 'https://5.imimg.com/data5/SELLER/Default/2023/2/CY/ZY/QC/157840235/istockphoto-874294580-612x612-jpg-500x500.jpg',expertName: 'The Henry Ford',Designation:'YouTube Company',view_button:'https://youtu.be/eNKkLuJUVE0?si=lgXQNWMS5iRw95cH'}})}>Harvesting wheat</a>
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row className='m-0'>
                  {/* Thumbnail 3 */}
                  <Col xs={6} md={3}>
                    <div>
                      <img src={"https://kjcdn.gumlet.io/media/38509/potato-farming-2.jpg"} alt="Thumbnail 1" style={{width:'180%', height:'350px', borderRadius:'24px'}} />
                      <p></p>
                      <p>
                        <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Potato Farming made easy',description: 'The "Potato Farming Made Easy" video offers a detailed overview of potato farming techniques, providing invaluable information for both beginners and experienced farmers. Through a step-by-step approach, viewers will learn essential aspects of potato cultivation, including soil preparation, planting methods, pest and disease management, irrigation strategies, and harvesting practices. Expertly narrated by seasoned agricultural specialists, the video offers practical tips and insights to help farmers achieve optimal yields and quality potatoes. ',image: 'https://kjcdn.gumlet.io/media/38509/potato-farming-2.jpg',expertName: 'Organic Acre',Designation:'Farming Youtuber',view_button:'https://youtu.be/LW5FCxJkFR0?si=EPZWQnVPdaSs2Cfg'}})}  >Potato Farming Made Easy</a>
                      </p>
                    </div>
                  </Col>
                  {/* Thumbnail 4 */}
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
  
                  <Col xs={6} md={3}>
                    <div>
                      <img src={"https://farmkey.in/uploads/blogs/Tomato-Cultivation.jpg"} alt="Thumbnail 2" style={{width:'180%', height:'350px',borderRadius:'24px'}} />
                      <p></p>
                      <p>
                        <a className='link' onClick={() => navigate('/Tutorials/videos', {state: {title: 'Tomato Cultivation Secrets',description: '"Dive into the world of potato cultivation with our comprehensive guide on unlocking the secrets to successful potato farming. Learn essential techniques, tips, and tricks from seasoned experts to maximize your potato yield and quality. From soil preparation to planting, irrigation, pest management, and harvesting, this video covers everything you need to know to become a successful potato farmer. ',image: 'https://farmkey.in/uploads/blogs/Tomato-Cultivation.jpg',expertName: 'Discover Agriculture',Designation:'Agriculture Youtube Company',view_button:'https://youtu.be/FSFBPtRO4HU?si=pocZAUEsCxBuu-dg'}})}>Tomato Cultivation Secrets</a>
                      </p>
                    </div>
                  </Col>
                </Row>
            </div>
      
          );


    }
  }

  return (
    <>
      <Header />
      <Container fluid className='market-cont mw-100'>
        <Row>
          <Col className='side-bar-cont' xs={3}>
            <div className='side-bar-l fs-6' style={{ height: 'calc(100vh - 56px)', overflowY: 'auto' }}>
              <ul>
              &emsp;
		            <li><Button className='shadow-lg' variant='outline-success' onClick={() => handleSetActive('Crop-Specific Tutorials')}>Crop-Specific Tutorials</Button></li>
                &emsp;
                
                <li><Button className='shadow-lg' variant='outline-success' onClick={() => handleSetActive('Livestock Tutorials')}>Livestock Tutorials</Button></li>
                &emsp;
                
                <li><Button className='shadow-lg' variant='outline-success' onClick={() => handleSetActive('Farming Techniques')}>Farming Techniques</Button></li>
                &emsp;
                
                <li><Button className='shadow-lg' variant='outline-success' onClick={() => handleSetActive('Machinery & Equipment')}>Machinery & Equipment</Button></li>
                &emsp;
                
                <li><Button className='shadow-lg' variant='outline-success' onClick={() => handleSetActive('Government Schemes')}>Government Schemes</Button></li>

                {/* your list items... */}
              </ul>
            </div>
          </Col>

          <Col className='main-frame-cont p-0' >
            <div>
              <Row className='m-0'>
                {/* Render content based on active subtopic */}
                {renderContent()}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}