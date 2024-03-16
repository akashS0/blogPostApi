var db = require("../models");
const author = db.authors;
const blogger = db.bloggers;
const utils = require("../utils");

var createBlog = async (req, res) => {
    const uuid = utils.generateUuid();
    var { title, content, author_id } = req.body;
    let responseObject = {
        success: false
    };

    title = title?.trim();
    content = content?.trim();

    if (!title || !content) {
        responseObject.message = "Blog content be empty";
        return res.status(400).send(responseObject);
    }

    await blogger.create({
        uuid,
        title,
        content,
        author_id
    })
    responseObject.message = 'Blog created successfully.';
    responseObject.success = true;

    return res.status(200).send(responseObject);
}

var deleteBlog = async (req, res) => {
    let responseObject = {
        success: false
    };

    const uuid = req.params['uuid'];
    var data = await blogger.findOne({
        where: {
            uuid: uuid
        },
    });
    if (data === null) {
        responseObject.message = "Blog not found";
        return res.status(400).send(responseObject);
    }

    if (req.body.author_id !== data.author_id) {
        responseObject.message = "Not Permitted";
        return res.status(401).send(responseObject);
    }

    data = await blogger.destroy({
        where: {
            uuid: uuid
        }
    })

    responseObject.success = true;
    responseObject.message = 'Blog deleted successfully.';
    return res.status(200).send(responseObject);
}

var viewBlog = async (req, res) => {
    let responseObject = {
        success: false
    };
    const uuid = req.params['uuid'];
    var data = await blogger.findOne({
        where: {
            uuid: uuid
        },
        include: [{
            model: author,
            attributes: ['uuid', 'name', 'email']
        }]
    });
    if (data === null) {
        responseObject.message = "Blog not found";
        return res.status(400).send(responseObject);
    }
    responseObject.data = data;
    responseObject.success = true;
    return res.status(200).send(responseObject);
}

var updateBlog = async (req, res) => {
    let responseObject = {
        success: false
    };
    const uuid = req.params['uuid'];

    var data = await blogger.findOne({
        where: {
            uuid: uuid
        },
    });

    if (!data) {
        responseObject.message = "Blog not found";
        return res.status(404).send(responseObject);
    }

    if (req.body.author_id !== data.author_id) {
        responseObject.message = "Not Permitted";
        return res.status(401).send(responseObject);
    }

    let { title, content } = req.body;

    title = title?.trim();
    content = content?.trim();

    if (!title || !content) {
        responseObject.message = "Blog content be empty";
        return res.status(400).send(responseObject);
    }

    await blogger.update({
        title,
        content
    }, {
        where: {
            uuid
        }
    })
    responseObject.message = "Blog Updated."
    responseObject.success = true
    return res.status(200).send(responseObject);
}

var listBlog = async (req, res) => {
    let responseObject = {
        success: false
    };
    var data = await blogger.findAll({
        include: [{
            model: author,
            attributes: ['uuid', 'name', 'email']
        }]
    });
    if (data === null) {
        responseObject.message = "Blog not found.";
        return res.status(404).send(responseObject);
    }
    responseObject.data = data;
    responseObject.success = true;
    return res.status(200).send(responseObject);
}

module.exports = {
    createBlog,
    deleteBlog,
    viewBlog,
    updateBlog,
    listBlog
}