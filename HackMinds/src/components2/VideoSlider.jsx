import React from "react";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./videoslider.css";
import Vid1 from "../assets/videos/birthdaytemp.mp4";
import Vid2 from "../assets/videos/corporatetemp.mp4";
import Vid3 from "../assets/videos/marriagetemp.mp4";

function VideoSlider(){
    const videoProperties = [
        {
            id:1,
            title: "Wedding",
            src:Vid1
        },
        {
            id:2,
            title: "Birthday",
            src:Vid2
        },
        {
            id:3,
            title: "Corporate GT",
            src:Vid3
        }
    ];
    const CustomPrevArrow = (props) => {
        const { className, onClick } = props;
        return (
          <div className={className} onClick={onClick}>
            <span className="custom-prev-arrow">{"<"}</span>
          </div>
        );
      };
    
      const CustomNextArrow = (props) => {
        const { className, onClick } = props;
        return (
          <div className={className} onClick={onClick}>
            <span className="custom-next-arrow">{">"}</span>
          </div>
        );
      };

    const settings={
        dots:false,
        infinite:true,
        speed:1000,
        slidesToShow:1,
        slidesToScroll:1,
        centerMode:true,
        autoplay:true,
        autoplaySpeed:10000,
        cssEase:"cubic-bezier(0.7,0,0.3,1)",
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };
    return(
        <div className="video_slider">
            <Slider {...settings}>
                {videoProperties.map((obj)=>{
                    return(
                    <div key={obj.id} className="videoid">
                         <ReactPlayer
                            url={obj.src}
                            width="100%"
                            height="100%"
                            playing
                            loop
                            muted
                            />
                    </div>
                    )
                })}
            </Slider>
        </div>
    )

}
export default VideoSlider;
