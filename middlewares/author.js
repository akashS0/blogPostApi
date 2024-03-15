var db = require("../models");
const author = db.authors;

module.exports = {
    validateAuthor: async (req, res, next) => {
        const responseObject = {
            success: false
        };

        console.log('within validate author middleware')
        const author_uuid = req.headers?.author_uuid;
        if (!author_uuid) {
            responseObject.message = 'Not Authorised';
            // TODO: update the status code for not authorized
            return res.status(400).send(responseObject);
        }

        const authorData = await author.findOne({
            where: {
                uuid: author_uuid
            }
        });

        if (!authorData) {
            responseObject.message = 'Author not found';
            return res.status(404).send(responseObject);
        }

        req.body.author_id = authorData.id;
        console.log('Going to controller')
        next();
    }
}