import React from 'react';
import "./Footer.css";
import twitter from './images/twitter.png';
import facebook from './images/facebook.png';
import instagram from './images/instagram.png';
import youtube from './images/youtube.png';

export default function Footer() {
    return (
        <>
            <footer>
                <div className="foot-cont">
                    <div className="left-cont">
                        <h4 className='f-heading'>Company</h4>
                        <ul>
                            <li className="left-f-link"><a href="#About-Us">About Us</a></li>
                            <li className="left-f-link"><a href="#Team">Team</a></li>
                            <li className="left-f-link"><a href="#Blog">Blog</a></li>
                        </ul>
                    </div>
                    <div className="right-cont">
                        <h4 className='f-heading'>Help & Legal</h4>
                        <ul>
                            <li className="right-f-link"><a href="#Terms">Terms</a></li>
                            <li className="right-f-link"><a href="Privacy-Policy">Privacy Policy</a></li>
                            <li className="right-f-link"><a href="#FAQs">FAQs</a></li>
                        </ul>
                    </div>
                </div>
                <hr className='hr' />
                <div className="follow-f-cont">
                    <h4 className='follow-f-heading'>Follow Us</h4>
                    <ul>
                        <li className="follow-f-link"><a href="#twitter"><img src={twitter} alt="twitter logo" /></a></li>&nbsp;&nbsp;
                        <li className="follow-f-link"><a href="#youtube"><img src={youtube} alt="youtube logo" /></a></li>&nbsp;&nbsp;
                        <li className="follow-f-link"><a href="#instagram"><img src={instagram} alt="instagram logo" /></a></li>&nbsp;&nbsp;
                        <li className="follow-f-link"><a href="#facebook"><img src={facebook} alt="facebook logo" /></a></li>&nbsp;&nbsp;
                    </ul>
                </div>
            </footer>
        </>
    )
}
