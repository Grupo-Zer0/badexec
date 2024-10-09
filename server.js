const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.static('public'));
//app.use(express.urlencoded({ extended: true })); //html forms
app.use(express.json()); //api clients, fetch, axios, etc

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/figlet.html');
    });

app.post("/ping", (req, res) => {
    const { ip } = req.body;
    /** 
    if (!ip.match(/^[0-9.]+$/)) {
        return res.status(400).json({ error: 'Invalid IP address' });
    }
    **/
    exec(`ping -c 4 ${ip}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        res.json({ stdout, stderr });
    });
});

app.post("/figlet", (req, res) => {
    const { texto } = req.body;
    exec(`figlet ${texto}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        res.json({ stdout, stderr });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});