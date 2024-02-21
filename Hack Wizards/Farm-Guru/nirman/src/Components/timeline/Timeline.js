import React, { useState } from "react";
import "./Timeline.css";
// import "./Suggestion.css";
import Post from "./posts/Post";
// import Suggestion from "./Suggestion";
// import ram from "../images/ram.jpg";
// import husklady from "../images/husklady.jpg";
// import woman from "../images/woman.jpg";
import Search from "./Search";

function Timeline() {
  const [posts, setPosts] = useState([
    {
      user: "pranav_243",
      postImage: "https://www.pixelstalk.net/wp-content/uploads/images6/Farm-Wallpaper-HD-Free-download.jpg",
      likes: 12,
      timestamp: "2d",
    },
    {
      user: "raj_32",
      postImage: "https://t4.ftcdn.net/jpg/03/76/16/79/360_F_376167961_QsDy4ZKc4n8dC5ac1oiqu72HU7Y0J86Z.jpg" ,
      likes: 54,
      timestamp: "12h",
    },
    {
      user: "umesh@34",
      postImage: "https://thumbs.dreamstime.com/b/worry-indian-farmer-standing-hand-folded-his-healthy-wheat-field-174017946.jpg",
      likes: 121,
      timestamp: "1d",
    },
    {
      user: "kisan@34",
      postImage: "https://t4.ftcdn.net/jpg/02/42/24/63/240_F_242246371_VU6RQWtCKcLcqQ67M3WK2PsGNQyHD2wY.jpg",
      likes: 121,
      timestamp: "10h",
    },
  ]);
  console.log(setPosts)
  return (
    <div className="timeline">
      <div className="timeline__left">
      <div className="timeline__postsContainer">
        <div className="timeline__posts">
          {posts.map((post) => (
            <Post
              user={post.user}
              postImage={post.postImage}
              likes={post.likes}
              timestamp={post.timestamp}
            />
          ))}

          {/* <Post post={posts[0]} />
          <Post post={posts[1]} />
          <Post post={posts[2]} /> */}
        </div>
      </div>
      </div>
      <div className="timeline__right">
        <Search />
      </div>
    </div>
  );
}

export default Timeline;
