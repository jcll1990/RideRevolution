import React, { useState } from "react";
function About() {

  const [contactEmail, setContactEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    alert("Message sent!")
    setContactEmail("")
    setMessage("")
    }

  return (

    <div id="about-page">
      <div id="storesep1"></div>
      <div id="about-text-container">
      <div id="about-text">
        <br/>
        Welcome to Ride Revolution - where the thrill meets the road!
        <br/> <br/>
        At Ride Revolution, we're passionate about motorcycles and the freedom they bring. Whether you're a seasoned rider or just starting your journey, our community is here for you.
        <br/> <br/>
        Discover the latest models, explore epic rides, and connect with fellow riders who share your love for the open road.
        <br/> <br/>     
        </div>
      </div>
      
      <div id="storesep1"></div>
      <div id="storesep1"></div>

      <div id="contact-us-container">
      <h2>Any questions? Send us an email!</h2>

      <form onSubmit={handleSignup} className="login-form">
            <label><br />Your email:</label>
            <br />
            <input
              type="email"
              id="contact-email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
            <br />
            <label>Message:</label>
            <br />
            <input
                type="text"
                id="newmessage"
                value={message}
                onChange={(e) => setMessage(e.target.value)}

            />
            <br />
            <input  id='formlogbuttom'  type="submit" value="Send"                 style={{ cursor: 'pointer' }} />
          </form>
          

      </div>

      <div id="storesep1"></div>
      <div id="storesep1"></div>

    </div>





  );
  
}

export default About;