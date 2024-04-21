import React from 'react';
import './App.css';
import UserIcon from './UserIcon';
import Background from './Background';
import UserProfile from './UserProfile';
import Navbar from './Navbar';
import axios from 'axios';

import Information from './Email';

export default function App () {


  const handleSubmit = (event) => {
    event.preventDefault();

    
    
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const email = formData.get('email');
    const number = formData.get('number');
    const password = formData.get('password');
    const profile = formData.get('profile');

    console.log('Submitted username:', username);
    console.log('Submitted email:', email);
    console.log('Submitted number:', number);
    console.log('Submitted password:', password);
    console.log('Submitted profile:', profile);
  
    axios.post("http://localhost:5175/api/insert", {
      Name: username,
      Email: email,
      Password: password,
      Phone: number,
      UserProfile: profile,
      User_id: userId  // Include the userId here
    })
    .then(()=>{
      alert("info submitted successfully");
    })
    .catch((error)=>{
      alert("an error occured while submitting the infos");
      console.log(error);
      
    });
  }

  return (
    <body>
      <div>
        <div><Background/></div>
        <div className="Rectangle">
        <div><Navbar/></div>
        
          <h1 className="UseInf">User Information</h1>

          <div><UserIcon/></div>
          

          <form onSubmit={handleSubmit} >
            <div><Information/></div>
            <div><UserProfile/></div>
          </form>
          
        </div>
      </div>
    </body>
  );
};


