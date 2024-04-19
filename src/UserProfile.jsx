import React, { useState } from "react";

export default function UserProfile ()  {
    const [editMode, setEditMode] = useState(false);
    const [profilePic, setProfilePic] = useState("/user.jpg");
    const [tempProfilePic, setTempProfilePic] = useState("");

    const handleBlur = async () => {
        try {
            await axios.post("http://localhost:5175/api/insert", { UserProfile:profilePic});
            console.log("Email, Password, and Phone submitted successfully");
           
        } catch (error) {
            console.error("Error submitting Email, Password, and Phone:", error);
            
        }
    };


    const handleEditClick = () => {
        if (editMode) {
            setProfilePic(tempProfilePic);
            setTempProfilePic("");
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

