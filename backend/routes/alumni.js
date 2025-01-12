const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = require("mysql2");
const db = require('../config/db');


//const db = mysql.createConnection({
  //  host: "localhost",
    //user: "root",
    //password: "Human1@73",
    //database: "ALUMNI",
//});

// Set storage engine for Multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1 MB limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('photo');

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Route for uploading photos
router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            if (req.file == undefined) {
                res.status(400).send('No file selected!');
            } else {
                res.status(200).send(`File uploaded: ${req.file.filename}`);
            }
        }
    });
});

// Route to get the list of uploaded images
router.get('/images', (req, res) => {
    const directoryPath = path.join(__dirname, '../uploads');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        // Filter for image files only
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
        res.json(images);
    });
});

router.post('/register', (req, res) => {
    Alumni.create(req.body, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send(result);
    });
});

router.get('/view', (req, res) => {
    Alumni.findAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
});

router.post('/update', (req, res) => {
    Alumni.findByName(req.body.name, (err, results) => {
        if (err || results.length === 0) return res.status(404).send('Alumni not found');
        Alumni.update(req.body, req.body.name, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(result);
        });
    });
});

router.delete('/delete', (req, res) => {
    Alumni.delete(req.body.name, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// Fetch all events
router.get("/events", (req, res) => {
    const query = "SELECT * FROM events";
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching events");
        } else {
            res.json(results);
        }
    });
});

// Add a new event
router.post("/events", (req, res) => {
    const { event_name, event_date, venue, description } = req.body;
    const query = "INSERT INTO events (event_name, event_date, venue, description) VALUES (?, ?, ?, ?)";
    db.query(query, [event_name, event_date, venue, description], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error adding event");
        } else {
            res.status(201).send("Event added successfully");
        }
    });
});

router.get('/deletion-log', (req, res) => {
    const sql = 'SELECT * FROM alumni_deletion_log ORDER BY deleted_at DESC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
});

router.post('/login', (req, res) => {
    const { department_name, password } = req.body;

    
    db.query('SELECT * FROM admin WHERE department_name = ?', [department_name], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid department name' });
        }

        if (results[0].password !== password) {
            return res.status(400).json({ message: 'Invalid password' });
        }

       
        res.status(200).json({ message: 'Login successful' });
    });
});



module.exports = router;