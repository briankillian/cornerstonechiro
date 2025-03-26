const express = require('express');
const path = require('path');
const app = express();

// Debug middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve static files from the public directory
app.use(express.static('public'));

// Serve files from the root directory
app.use(express.static('.'));

// Serve pages directory
app.use('/pages', express.static('pages'));

// Handle root blog route
app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'blog.html'));
});

// Try different ports if 3000 is in use
const ports = [3000, 3001, 3002, 3003];

function startServer(portIndex = 0) {
    if (portIndex >= ports.length) {
        console.error('No available ports found');
        process.exit(1);
    }

    const PORT = ports[portIndex];
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${PORT} is busy, trying next port...`);
            startServer(portIndex + 1);
        } else {
            console.error('Server error:', err);
        }
    });
}

startServer(); 