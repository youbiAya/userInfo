import React from "react";

export default function Password (){
    return (
        <>
            <label htmlFor="password" className="Password">
                Password:
            </label>
            <br />
            <input className="Password" id="password" type="password" name="Password" 
                />
            <br />
        </>
    );
};
