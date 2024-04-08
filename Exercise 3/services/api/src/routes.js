const express = require('express');
const axios     = require('axios').default;
const routes = express.Router();

// TODO Exercise 1: Implement healthcheck path GET /healthz
// ...
//routes.get('/healthz', (_, res) => {
//    res.status(200).send('Service is healthy');
//});



// TODO Exercise 2 "Resiliency": Simulate service failure
// ...
let isHealthy = true;
let healthTimeout;

routes.get('/healthz', (req, res) => {
    if (isHealthy) {
        res.status(200).send('Service is healthy');
    } else {
        res.status(500).send('Service is unhealthy');
    }
});

routes.post('/toggle-health', (req, res) => {
    isHealthy = !isHealthy;

    // Clear any existing timeout to avoid multiple resets
    clearTimeout(healthTimeout);

    // If the service is now unhealthy, set it to automatically recover after 2 minutes
    if (!isHealthy) {
        healthTimeout = setTimeout(() => {
            isHealthy = true;
            console.log('Automatically set health to true after 2 minutes');
        }, 120 * 1000); // 120 seconds
    }

    res.status(200).send(`Health toggled. Current state: ${isHealthy ? 'healthy' : 'unhealthy'}`);
});
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
});

routes.get('/content-request/:id', async (req, res) => {

    // TODO Exercise 3: Fetch an existing request
    // -- replace the dummy response below
    // ...
    //res.status(404).send("Call to content service needs to be implemented.")

    const requestId = req.params.id;

    try {
        const response = await axios.get(`http://content/request/${requestId}`);
        res.send(response.data);
    } catch (error) {
        console.error(`Error fetching contentRequest with id ${requestId}:`, error);
        res.status(error.response.status).send(`Error fetching contentRequest with id ${requestId}`);
    }
});

module.exports = routes;