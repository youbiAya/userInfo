import React, { useState } from "react";
import axios from 'axios';

export default function UserProfile ()  {
    const [editMode, setEditMode] = useState(false);
    const [profilePic, setProfilePic] = useState("/user.jpg");
    const [tempProfilePic, setTempProfilePic] = useState("");

    const handleBlur = async () => {
        try {
            await axios.put("http://localhost:5175/api/update/profile", { NewUserProfile: profilePic });
            console.log("Profile picture updated successfully");
        } catch (error) {
            console.error("Error updating profile picture:", error);
        }
    };

    const handleEditClick = () => {
        if (editMode) {
            setProfilePic(tempProfilePic);
            setTempProfilePic("");
            handleBlur();
        }
        setEditMode(!editMode);
    };

    const handleFileChange = (event) => {
        const file = event.target.files ? event.target.files[0] : null;
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.result) {
                setTempProfilePic(reader.result.toString());
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="user-profile">
            {editMode ? (
                <div>
                    <input className="controls" type="file" accept="image/*" onChange={handleFileChange} />
                </div>
            ) : (
                <img src={profilePic}  className="profile-pic" />
            )}
            <button className="edit" onClick={handleEditClick}>{editMode ? "Save" : "Edit"}</button>
            {editMode && <button className="cancel" onClick={handleEditClick}>Cancel</button>}
        </div>
    );
};
