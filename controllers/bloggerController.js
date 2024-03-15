var db = require("../models");
const author = db.authors;
const blogger = db.bloggers;
const utils = require("../utils");

var createBlog = async (req, res) =>{
    const uuid = utils.generateUuid();
    const {title, content, author_id} = req.body;
    let responseObject = {
        success: false
    };
    if(!title || !content || !author_id){
        responseObject.message = "Data cannot be empty";
        return res.status(400).send(responseObject);
    }
    await blogger.create({
        uuid,
        title,
        content,
        author_id
    })
    responseObject.message = 'SuccessFully Entered data';
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
    if(data === null){
        responseObject.message = "uuid not found";
        return res.status(400).send(responseObject);
    }

    data = await blogger.destroy({
        where :{
            uuid: uuid
        }
    })

    responseObject.success = true;
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
    if(data === null){
        responseObject.message = "uuid not found";
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
    if(data === null){
        responseObject.message = "uuid not found";
        return res.status(400).send(responseObject);
    }
    const {title, content, author_id} = req.body;
    
    await blogger.update({
        title,
        content,
        author_id
    }, {
        where: {
            uuid
        }
    })
    responseObject.message = "update successfully"
    responseObject.success = true
    return res.status(200).send(responseObject);
}

var listBlog = async (req, res) => {
    let responseObject = {
        success: false
    };
    var data = await blogger.findAll({});
    if(data === null){
        responseObject.message = "no data exist";
        return res.status(400).send(responseObject);
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