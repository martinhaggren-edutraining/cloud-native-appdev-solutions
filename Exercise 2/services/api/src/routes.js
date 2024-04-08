const express = require('express');
const axios     = require('axios').default;
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
    // ...

    try {
        const response
            = await axios({
            method: 'POST',
            url: 'http://content/request',
            data: contentRequest,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const request
            = response.data;

        console.log(`RequestId received from Content Service: '${request.id}'`);

        res.send(request);
    } catch (error) {
        console.error('Error storing contentRequest', error);
        res.status(500).send('Error storing contentRequest');
    }
    // ...
});

module.exports = routes;