import express from 'express';
import { PORT } from './config.js';
import { getListings } from './getListings.js';

const app = express();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

app.get('/listings', (req, res) => {
    getListings(res, 0)
})

app.get('/listings/:page', (req, res) => {
    const pageSize = 17
    let page = req.params.page
    
    // Validate the page parameter to ensure it's a positive integer
    if (isNaN(page) || page < 1) {
        res.status(400).json({ error: 'Invalid page number' })
        return
    } 
    page = (page - 1) * pageSize
        getListings(res, page)
})

