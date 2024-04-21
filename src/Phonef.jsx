import React from "react";

export default function Phone() {
    return (
        <>
            <label htmlFor="number" className="PhoneNum">
                Phone Number:
            </label>
            <br />
            <input
                className="PhoneNum"
                id="number"
                type="tel"
                name="Phone"
                pattern="[0-9]{10}"
                required
            />
            <br />
        </>
    );
}