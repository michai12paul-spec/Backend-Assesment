import { listingsCollection } from './myMongo.js';

const details = (res, id) => {
    listingsCollection
       
        .findOne(
            { _id: id },
            {   
                limit: 1, 
                projection: {
                    listing_url: 1,
                    name: 1,
                    description: 1,
                    address: 1,
                    property_type: 1,
                    bedrooms: 1,
                    beds: 1,
                    room_type: 1,
                    picture_url: 1,
                    amenities: 1,
                    cancel_policy: 1,
                    maximum_nights:1,
                    minimum_nights: 1,
                    host: {
                        host_name: 1,
                        host_url: 1,
                        host_picture_url: 1
                    },
                    review_scores: {
                        review_scores_rating: 1
                    },
                    reviews: 1
                }
            })

        
        .then(results => {
            if (!results) {
                res.status(400).json({ error: 'ID not found' });
                return;
            }
                results.number_of_nights = `${results.minimum_nights} to ${results.maximum_nights} nights`;
            res.json(results); 
        })
}

export { details } 