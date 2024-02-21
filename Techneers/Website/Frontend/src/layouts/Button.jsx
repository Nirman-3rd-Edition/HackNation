import React from "react";

const Button = ({ backgroundColor, title, onClick }) => {
  return (
    <div>
      <button
        className={` ${backgroundColor} text-black rounded-full px-8 py-2 font-medium hover:bg-[#8482FF] hover:text-white transition-all`}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
