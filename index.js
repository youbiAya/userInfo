import express from 'express';
import cors from 'cors';
import { createPool } from 'mysql2';
import bcrypt from 'bcrypt';

const app = express();
const PORT = 5175;

const db = createPool({
    host: 'localhost',
    user: 'root',
    password: 'youbiaya.17032005',
    database: 'datab'
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// inserting
app.post('/api/insert', async (req, res) => {
    const { Name, Email, Password, Phone, UserProfile } = req.body;

    try {
        
        const hashedPassword = await bcrypt.hash(Password, 10);

        
        const sqlInsert = "INSERT INTO USERS (USERNAME, Email, PASSWORD_HASH, PHONE , PROFILE_PIC) VALUES (?, ?, ?, ?, ?)";
        const values = [Name, Email, hashedPassword, Phone, UserProfile];

       
        db.query(sqlInsert, values, (err, data) => {
            if (err) {
                console.error("Error inserting info:", err);
                return res.status(500).json({ error: "Error inserting info" });
            }
            console.log("Info inserted successfully");
            res.status(200).json({ message: "Info inserted successfully" });
        });
    } catch (error) {
        console.error("Error inserting info:", error);
        res.status(500).json({ error: "Error inserting info" });
    }
});

// PUT route to update existing user information by email
app.put('/api/update/:email', async (req, res) => {
    const email = req.params.email;
    const { NewName, Password, Phone, UserProfile } = req.body;

    try {
       
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Construct the SQL query to update user information based on the email
        const sqlUpdate = "UPDATE USERS SET USERNAME = ?, PASSWORD_HASH = ?, PHONE = ?, PROFILE_PIC = ? WHERE Email = ?";
        const values = [NewName, hashedPassword, Phone, UserProfile, email];

        
        db.query(sqlUpdate, values, (err, data) => {
            if (err) {
                console.error("Error updating info:", err);
                return res.status(500).json({ error: "Error updating info" });
            }
            console.log("Info updated successfully");
            res.status(200).json({ message: "Info updated successfully" });
        });
    } catch (error) {
        console.error("Error updating info:", error);
        res.status(500).json({ error: "Error updating info" });
    }
});

app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});
