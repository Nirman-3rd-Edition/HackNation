import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./Community.css";
import Sidenav from "../Components/navigation/Sidenav";
import Timeline from "../Components/timeline/Timeline";


// export default function Community() {
    function Community(){
    return (
        <>
            <Header />
            <div className="homepage">
             <div className ="homepage__nav">
                <Sidenav />
                </div>
                <div className="homepage__timeline"> 
                <Timeline />
                </div>  
            </div>
            <Footer />

        </>
    )
}
export default Community;