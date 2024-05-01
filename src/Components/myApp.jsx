import React, { useState } from "react";
import axios from 'axios';
import UserIcon from './UserIcon';
import Background from './Background';
import UserProfile from './UserProfile';
import Navbar from './Navbar';
import Information from "./Information";

export default function myApp () {
  const [userId, setUserId] = useState(""); // Add state for userId

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const email = formData.get('email');
    const number = formData.get('number');
    const password = formData.get('password');
    const profile = formData.get('profile');

  
  
    axios.put(`http://localhost:5175/api/update/${email}`, { // Changed POST to PUT
      NewName: username,
      NewPassword: password,
      NewPhone: number,
      NewUserProfile: profile
    })
    .then(()=>{
      alert("info updated successfully");
    })
    .catch((error)=>{
      alert("an error occured while updating the infos");
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
            <div><Information userId={userId} onSave={() => {}}/></div>
            <div><UserProfile/></div>
          </form>
          
        </div>
      </div>
    </body>
  );
};
