import express from 'express';
import './App.css';
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

// Get user data by email
app.get('/api/user/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const sqlSelect = "SELECT * FROM USERS WHERE Email = ?";
        
        db.query(sqlSelect, [email], (err, result) => {
            if (err) {
                console.error("Error fetching user data:", err);
                return res.status(500).json({ error: "Error fetching user data" });
            }
            if (result.length > 0) {
                const userData = {
                    Name: result[0].USERNAME,
                    Email: result[0].Email,
                    Phone: result[0].PHONE,
                    UserProfile: result[0].PROFILE_PIC
                };
                res.status(200).json(userData);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Error fetching user data" });
    }
});

// PUT route to update existing user information by email
app.put('/api/update/:email', async (req, res) => {
    const email = req.params.email;
    const { NewName, NewPassword, NewPhone, NewUserProfile } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(NewPassword, 10);

        // Construct the SQL query to update user information based on the email
        const sqlUpdate = "UPDATE Userr SET user_Name = ?, passwordd = ?, phone = ?, user_cover = ?  WHERE gmail = ? ";
        const values = [NewName, hashedPassword, NewPhone, NewUserProfile, email];
        
        db.query(sqlUpdate, values, (err, data) => {
            if (err) {
                console.error("Error updating user info:", err);
                return res.status(500).json({ error: "Error updating user info" });
            }
            console.log("User info updated successfully");
            res.status(200).json({ message: "User info updated successfully" });
        });
    } catch (error) {
        console.error("Error updating user info:", error);
        res.status(500).json({ error: "Error updating user info" });
    }
});

app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});
