var db = require("../models");
const author = db.authors;
const blogger = db.bloggers;
const utils = require("../utils")

var createAuthor = async (req, res) => {
    const uuid = utils.generateUuid();
    var { name, email } = req.body;
    let responseObject = {
        success: false
    };

    if (!name) {
        responseObject.message = "Name is not entered";
        return res.status(400).send(responseObject);
    }
    if (!email) {
        responseObject.message = "Email is not entered";
        return res.status(400).send(responseObject);
    }
    name = name.trim();
    email = email.trim();
    if (!name) {
        responseObject.message = "Name is not entered";
        return res.status(400).send(responseObject);
    }
    if (!email) {
        responseObject.message = "Email is not entered";
        return res.status(400).send(responseObject);
    }
    if (!utils.isEmailValid(email)) {
        responseObject.message = "Email address is not valid";
        return res.status(400).send(responseObject);
    }
    var data = await author.findOne({
        where: {
            email
        },
    });

    if (data) {
        responseObject.message = "Email already exsist";
        return res.status(400).send(responseObject);
    }

    await author.create({
        uuid,
        name,
        email
    });
    responseObject.message = 'Author created successfully.';
    responseObject.success = true;

    return res.status(201).send(responseObject);
}

var deleteAuthor = async (req, res) => {
    let responseObject = {
        success: false
    };
    const uuid = req.params['uuid'];
    var data = await author.findOne({
        where: {
            uuid: uuid
        },
    });
    if (data === null) {
        responseObject.message = "Author not found";
        return res.status(404).send(responseObject);
    }

    data = await author.destroy({
        where: {
            uuid: uuid
        }
    })

    responseObject.message = "Author deleted successfully"
    responseObject.success = true;
    return res.status(200).send(responseObject);
}

var viewAuthor = async (req, res) => {
    let responseObject = {
        success: false
    };
    const uuid = req.params['uuid'];
    var data = await author.findOne({
        where: {
            uuid: uuid
        },
        include: [{
            model: blogger
        }]
    });
    if (data === null) {
        responseObject.message = "Author not found";
        return res.status(404).send(responseObject);
    }
    responseObject.data = data;
    responseObject.success = true;
    return res.status(200).send(responseObject);
}

var updateAuthor = async (req, res) => {
    let responseObject = {
        success: false
    };
    const uuid = req.params['uuid'];
    var data = await author.findOne({
        where: {
            uuid: uuid
        },
    });
    if (data === null) {
        responseObject.message = "Author not found";
        return res.status(404).send(responseObject);
    }
    var { name, email } = req.body;
    if (email) {
        email = email.trim();
        if (!utils.isEmailValid(email)) {
            responseObject.message = "Email address is not valid";
            return res.status(400).send(responseObject);
        }

        if (email !== data.email) {
            responseObject.message = "Email address cannot be updated";
            return res.status(400).send(responseObject);   
        }
    }
    if (name) {
        name = name.trim();
        if (!name) {
            responseObject.message = "Name is not entered";
            return res.status(400).send(responseObject);
        }
    }

    await author.update({
        email,
        name
    }, {
        where: {
            uuid
        }
    })
    responseObject.message = "Author updated."
    responseObject.success = true
    return res.status(200).send(responseObject);
}

var listAuthor = async (req, res) => {
    let responseObject = {
        success: false
    };
    var data = await author.findAll({});
    if (data === null) {
        responseObject.message = "Author not found";
        return res.status(404).send(responseObject);
    }
    responseObject.data = data;
    responseObject.success = true;
    return res.status(200).send(responseObject);
}

module.exports = {
    createAuthor,
    deleteAuthor,
    viewAuthor,
    updateAuthor,
    listAuthor
}