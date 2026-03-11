import {listandreveiw} from "./myMongo.js"


const getListingsAndReviews = (res, type, page = 0) => {
    listandreveiw
        .find(
            {},

            {
                limit: 17,
                skip: page,
                sort: { number_of_reviews: -1 },
            }
        )

        .project({
          id: 1,
          accommodation: 1,
          number_of_reviews: 1,
          price: 1,
          summary: 1,
          review_scores: 1,
          host_url: 1,
          host_name: 1,
          host_picture_url: 1,      
        })
    
        .then(results => {
            if (!results) {
                res.status(400).json({ "error": "No listings found" })
                return
            }
            for (let doc of results) {
                if (doc.number_of_reviews) {
                    doc.number_of_reviews = doc.number_of_reviews.toString()
                }
            }
            res.status(200).json(results)
        })
}

export { getListingsAndReviews }