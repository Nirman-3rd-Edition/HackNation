import React from "react";
import ShareDiv from "./ShareDiv";
import '../styles/photographer.css'

function Photographer() {
    return(
        <div id="main-div">
            <div id="container">
                <div id="color">
                </div>
                <div id="banner">
                    <img src="https://cache.careers360.mobi/media/article_images/2018/06/19/wildlife-photographer.webp" alt="" srcset="" id="img-l"/>
                    <img src="https://w.forfun.com/fetch/a9/a9b33f4085013fb64e65c2d6b596a26a.jpeg?h=900&r=0.5" alt="" id="img-r" />
                </div>
                <div id="share">
                    <ShareDiv />
                </div>
            </div>
            <div id="about">
                <div></div>
                <div id="about-body">
                    <h1>Photography Company</h1><br />
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores itaque modi debitis neque eum magni, fugit sequi incidunt quaerat fugiat minima iste? Architecto repudiandae quo assumenda harum dolore, aliquid fugiat adipisci. Consequatur, perferendis numquam et, voluptatem dolore doloribus dolores possimus voluptatibus est ex commodi dicta voluptas! Totam quisquam consequuntur nemo aspernatur eius voluptates, iure consequatur repudiandae enim provident consectetur eos ex ea id sapiente corporis quos, minima voluptatem veritatis earum itaque, illo expedita. Quibusdam hic ab, veritatis atque tenetur ad, omnis repudiandae nostrum voluptatibus illo a fugiat praesentium dolore unde tempore dolorum laboriosam. Atque vel autem praesentium ratione corporis corrupti pariatur. Dolore, perspiciatis. Obcaecati nobis nam quia quaerat cumque consequuntur consectetur rerum iusto? Ad distinctio quasi ipsum a iusto officiis rem tempora explicabo accusamus excepturi? At eligendi quas repudiandae ratione ducimus deleniti voluptate nulla ab vel, fugit odio ipsam praesentium debitis ipsum accusamus cum pariatur repellat corporis harum doloribus provident? Assumenda repellendus vitae sunt quod aspernatur beatae, minus exercitationem libero nobis dolorem porro quibusdam dolor obcaecati cum dolorum alias id laudantium sed ea, voluptatum enim architecto magni cupiditate provident? Iure, rem? Exercitationem aspernatur illum quis, dolore error nemo corporis optio aperiam quo totam libero alias blanditiis nulla. Sed, cum explicabo.</p>
                    <div><h2>Availability</h2></div><hr />
                    <div id="price"><h2>Pricing</h2>
                        <div id="g-i-t"><h2>Get in touch with pricing details</h2></div>
                    </div><hr />
                    <div><h2>Location</h2></div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14963.122704026026!2d85.806336!3d20.3506773!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1908e064769e73%3A0x9288172f3a98c7a4!2sSilicon%20University!5e0!3m2!1sen!2sin!4v1707661437232!5m2!1sen!2sin" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div>
                    <div id="floating-box">
                        <h2>Photography Company</h2><br />
                        <div id="g-i-t"><h2>Get in touch with pricing details</h2></div>
                        <button id="con-btn"><h2>Contact Service</h2></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

 export default Photographer;