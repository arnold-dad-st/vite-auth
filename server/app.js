const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const falso = require('@ngneat/falso');

// In a real-world scenario, you would likely store usernames and passwords in a database instead of hardcoding them.
const users = [
    { id: 1, username: 'user1', password: 'pass1' },
    { id: 2, username: 'user2', password: 'pass2' }
];

// In a real-world scenario, you would likely store books in a database instead of hardcoding them.
const books = [
    { id: 1, title: 'Book 1' },
    { id: 2, title: 'Book 2' },
    { id: 3, title: 'Book 3' }
];

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'A sample API',
        },
        servers: [
            {
                url: 'http://localhost:5055',
            },
        ],
    },
    apis: ['app.js'], // Change this to the filename of your server file
};




// Create a new Express app
const app = express();

// Disable CORS
app.use(cors({
    origin: '*'
}));

// Add middleware to parse JSON requests
app.use(bodyParser.json());

// Define the login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Find the user by their username and password
    const user = users.find(u => u.username === username && u.password === password);

    // If the user doesn't exist, return a 401 Unauthorized response
    if (!user) {
        return res.status(401).send('Invalid username or password');
    }

    // Generate a JWT token with the user ID and a secret key
    const token = jwt.sign({ userId: user.id }, 'secret');

    // Return the token as a JSON response
    res.json({ token });
});

// Define the books endpoint
app.get('/api/books', (req, res) => {
    // Get the authorization header from the request
    const authHeader = req.headers.authorization;

    // If the authorization header is not present, return a 401 Unauthorized response
    if (!authHeader) {
        return res.status(401).send('Authorization header missing');
    }

    // Parse the authorization header and extract the JWT token
    const [authType, token] = authHeader.split(' ');
    if (authType !== 'Bearer' || !token) {
        return res.status(401).send('Invalid authorization header');
    }

    try {
        // Verify the JWT token using the secret key
        const decodedToken = jwt.verify(token, 'secret');

        // If the token is valid, returnpm n the list of books as a JSON response
        res.json(falso.randSuperhero({ length: 10}));
    } catch (err) {
        // If the token is invalid, return a 401 Unauthorized response
        res.status(401).send('Invalid token');
    }
});

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server on port 3000
app.listen(5055, () => {
    console.log('Server started on port 5055');
});