import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function About() {



  return (
    <section id="about">
      <div className="container">
        <h2>About Us</h2>
        <div className="about-content">
          <div className="about-text">
            <p>Welcome to Ride Revolution - where the thrill meets the road!</p>
            <p>At Ride Revolution, we're passionate about motorcycles and the freedom they bring. Whether you're a seasoned rider or just starting your journey, our community is here for you.</p>
            <p>Discover the latest models, explore epic rides, and connect with fellow riders who share your love for the open road.</p>
          </div>
          <div className="about-image">

          </div>
        </div>
      </div>
    </section>
  );
  
}

export default About;