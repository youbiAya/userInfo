import React, { useState, useEffect } from "react";
import axios from 'axios';
import UserProfile from "./UserProfile";
import './App.css';

export default function Information({ onSave, userId }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfile] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, [userId]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:5175/api/user/${userId}`);
            const userData = response.data;
            setEmail(userData.Email);
            setPhone(userData.Phone);
            setName(userData.Name);
            setProfile(userData.UserProfile);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setProfile(file);
    };

    const validateForm = () => {
        if (!email || !email.includes("@")) {
            setError("Invalid email address");
            return false;
        }
        if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
            setError("Invalid phone number. Please enter a 10-digit number.");
            return false;
        }
        if (name.length <= 2) {
            setError("Username is too short.Please enter a valid username.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            setSuccess(false);
            return;
        }
        try {
            await axios.put(`http://localhost:5175/api/update/${email}`, {
                NewName: name,
                NewPassword: password,
                NewPhone: phone,
                NewUserProfile: profilePic
            });
            console.log("User information updated successfully");
            setSuccess(true);
            onSave();
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        } catch (error) {
            console.error("Error updating user information:", error);
        }
    };

    return (
        <form>
            <label htmlFor="email" className="emailAdr">
                Email Address:
            </label>
            <br />
            <input
                className="emailAdr"
                id="email"
                type="email"
                name="Email"
                value={email}
                onChange={handleEmailChange}
                required
            />
            <br />
            <label htmlFor="password" className="Password">
                Password:
            </label>
            <br />
            <input
                className="Password"
                id="password"
                type="password"
                name="Password"
                value={password}
                onChange={handlePasswordChange}
                required
            />
            <br />
            <label htmlFor="number" className="PhoneNum">
                Phone:
            </label>
            <br />
            <input
                className="PhoneNum"
                id="number"
                type="tel"
                name="PhoneNum"
                value={phone}
                onChange={handlePhoneChange}
                required
                pattern="[0-9]{10}"
            />
            <br />
            <label htmlFor="username" className="name">
                Username:
            </label>
            <br />
            <input
                className="name"
                id="username"
                type="text"
                name="Name"
                value={name}
                onChange={handleNameChange}
                required
                minLength={3}
                maxLength={20}
            />
            
            <br />
            <UserProfile value={profilePic} onChange={handleFileChange}/>
            <br />
            
            {error && <div className="error">{error}</div>}
            {success && <div className="success">Information changed successfully!</div>}
            <br />
            <button type="button" className="botton" onClick={handleSave}>Save Changes</button>
        </form>
    );
}
