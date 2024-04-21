import React from 'react';

export default function Name (){
    return (
        <>
            <label htmlFor="username" className="name"> Username:</label>
            <br />
            <input className="name" id="username" type="text" name="Name"  required minLength={3} />
            <br />
        </>
    );
};
