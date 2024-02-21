import React from "react";
import { Button, Icon, colors } from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';

import '../styles/share.css';

function ShareDiv() {
    return(
        <div id="sr-container">
            <div id="sr-share">SHARE</div>
            <div id="sr-icons">
                <div>
                    <Button id="sr-twitter">
                        <TwitterIcon />
                    </Button>
                </div>
                <div>
                    <Button id="sr-facebook">
                        <FacebookIcon />
                    </Button>
                </div>
                <div>
                    <Button id="sr-linkedin">
                        <LinkedInIcon />
                    </Button>
                </div>
                <div>
                    <Button id="sr-gmail">
                        <MailIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ShareDiv;