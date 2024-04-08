const express = require('express');

const routes = express.Router();

// TODO Exercise 1: Implement healthcheck path GET /healthz
// ...
routes.get('/healthz', (_, res) => {
    res.status(200).send('Service is healthy');
});
// ...

// TODO Exercise 2 "Resiliency": Simulate service failure
// ...

routes.post('/content-request', async (req, res) => {
    const contentRequest = req.body;

    // Simple validation - check for existence of language and fields
    if (!contentRequest.language || !contentRequest.fields) {
        return res.status(400).send('Invalid content request.');
    }

    // TODO Exercise 2: Use axios to send the content request to the content service
    // -- replace the dummy response below
    // ...

    // Send a response back to the client
    res.status(200).send('Successful (dummy) response with status 200');
});

module.exports = routes;