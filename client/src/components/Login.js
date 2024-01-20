import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//add verification of email for signup

function Login({setUser, user, setOrder,order}) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [flagSig, setFlagSig] = useState(false)



  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email: loginEmail,
      password: loginPass,
    };
  
    setLoginEmail('');
    setLoginPass('');
  
    fetch('http://127.0.0.1:5555/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(data => {
            throw new Error(data.error);
          });
        }
      })
      .then(data => {
        setUser(data.user);
        getOrder(data.user.id);
        alert(data.message); 
        history.push("/MotorcycleUpgrades");
        
      })
      .catch(error => {
        alert(error.message); 
        console.error(error.message);
      });
  };
  
  const handleSignUpClick = () => {
    setFlagSig(true);
  };

  const handleLogClick = () => {
    setFlagSig(false);
  };

  


  function getOrder(a) {
    fetch(`http://127.0.0.1:5555/getorder?user_id=${a}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const orderNumber = data.order_id;
        setOrder(orderNumber);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        console.log("ERROR: Unable to fetch order data");
      });
  }
  

  const handleSignup = (e) => {
    e.preventDefault();
  
    //Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(newPass)) {
      alert("Password must contain at least 8 characters, 1 uppercase letter, and 1 special character.");
      return;
    }
  
    const data = {
      email: newEmail,
      password: newPass,
    };
  
    setNewEmail('');
    setNewPass('');
  
    fetch('http://127.0.0.1:5555/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (response.status === 201) {
        return response.json();
      } else {
        return response.json()
          .then(data => {
            throw new Error(data.error);
          });
      }
    })
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      alert(error.message);
      console.error(error.message);
    });
  };
  
  function logoff(userId) {
    fetch('http://127.0.0.1:5555/logout', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        setUser({});
        alert("Logged off"); 
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }

return (
  <div id="logpage">

    <div id="logsep"></div>

    {user.id >= 1 ? ( 

      <div id="LoggedBox">
        <div id="LoggedBoxText">
        Logged in with:  <br /> {user.email}
        </div>
        <div id="LoggedBoxButtonbox">
        <button id="LoggedBoxButton" onClick={() => logoff(user.id)}>Log off</button>
        </div>
      </div>
    ) : (
      flagSig === false ? (

        <div id="logbox">

          <div className="create-account-text">
            Login
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <label><br />Email:</label>
            <br />
            <input
              type="email"
              id="loginEmail"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <br />
            <label>Password:</label>
            <br />
            <input
              type="password"
              id="loginPass"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
            />
            <br />
            <input id='formlogbuttom' type="submit" value="Login" />
          </form>
          <div>
          <br />
            Don't have an account with us?<br />
            <span
              onClick={handleSignUpClick} style={{ cursor: 'pointer' }}
            >
              Sign Up
            </span>
          </div>
        </div>

      ) : (
        <div id="logbox">

          <div className="create-account-text">
            Create an account
          </div>

          <form onSubmit={handleSignup} className="login-form">
            <label><br />Email:</label>
            <br />
            <input
              type="email"
              id="newEmail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <br />
            <label>Password:</label>
            <br />
            <input
              type="password"
              id="newPass"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <br />
            <input  id='formlogbuttom'  type="submit" value="Create" />
          </form>
          <p><br />
              Already have an account with us<br />
              <span 
                onClick={handleLogClick} style={{ cursor: 'pointer' }}
              >
                Log In
              </span>
            </p>
        </div>
      )
    )}
  </div>
);


}

export default Login;
