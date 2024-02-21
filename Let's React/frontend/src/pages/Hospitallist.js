import React from 'react';
import './Hospital.css'; // Import your CSS file

function HospitalList() {
  return (
    <div>
      <div className="hhh">
        <div className="wrap1">
          <div className="box1">
            <img src="https://media.istockphoto.com/id/1344779917/vector/medical-center-hospital-building-vector-design.jpg?s=612x612&w=0&k=20&c=_sZByueZhEZbK2WjQz1jqXy1_Rr5jYkgiVBj-2ls44s=" alt="Hospital" />
          </div>
          <div className="box2">
            <div className="write">
              <h3>HOSPITAL 1</h3>
              <p>Our hospital is equipped with state-of-the-art facilities and advanced medical equipment to deliver comprehensive medical services across various specialties. From our modern operating rooms to our comfortable patient rooms, we prioritize creating a healing environment conducive to recovery</p>
            </div>
            <div className="Buton">
              <button>BOOK BED</button>
            </div>
          </div>
        </div>
        {/* Repeat the above structure for other hospitals */}
      </div>
      {/* Repeat the above structure for other rows of hospitals */}
    </div>
  );
}

export default HospitalList;