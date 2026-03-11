import {listingsCollection} from "./myMongo.js"


const getListings = (res, skip = 0) => {
    listingsCollection
        .find(
            {},
            {
                limit: 17, 
                sort: { number_of_reviews: -1 }, 
                skip: skip,  
                projection: {
                    accommodates: 1,
                    number_of_reviews: 1,
                    review_scores: { review_scores_rating: 1 },
                    price: 1,
                    _id: 1,
                    summary: 1,
                    host: { host_url: 1, host_name: 1, host_picture_url: 1, host_is_superhost: 1 },
                }
            })

        .toArray()
        .then(listings => {
            if (!listings) {
                res.status(400).json({ "error": "No listings found" })
                return
            }

           else{
                for (let doc of listings) {  //format the price and host name based on the conditions
                    if (doc.price >= 1000) {
                        let remainder = doc.price % 1000
                        let priceS = Math.floor(doc.price - remainder) / 1000
                        doc.price = `US$${priceS},${remainder}`
                    }

            
                    if (doc.host.host_is_superhost == true) {
                        doc.host.host_name = `${doc.host.host_name} is a superhost`
                    } else {
                        doc.host.host_name = `${doc.host.host_name} is your host`
                    }
                }
                res.json(listings) 
            }
        })}

export {getListings}