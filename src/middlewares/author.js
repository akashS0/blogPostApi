var db = require("../models");
const author = db.authors;

module.exports = {
    validateAuthor: async (req, res, next) => {
        const responseObject = {
            success: false
        };

        const author_uuid = req.headers?.author_uuid;
        if (!author_uuid) {
            responseObject.message = 'Not Authorised';
            return res.status(401).send(responseObject);
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
        next();
    }
}