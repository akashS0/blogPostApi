var db = require("../models");
const author = db.authors;
const utils = require("../utils")

var createAuthor = async (req, res) => {
    const uuid = utils.generateUuid();
    console.log(req.body);
    const { name, email } = req.body;
    let responseObject = {
        success: false
    };

    if (!utils.isEmailValid(email)) {
        responseObject.message = "Email address is not valid";
        return res.status(400).send(responseObject);
    }
    await author.create({
        uuid,
        name,
        email
    });
    responseObject.message = 'SuccessFully Entered data';
    responseObject.success = true;
    return res.status(200).send(responseObject);
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
    if(data === null){
        responseObject.message = "uuid not found";
        return res.status(400).send(responseObject);
    }

    data = await author.destroy({
        where :{
            uuid: uuid
        }
    })

    responseObject.data = data;
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
      });
    if(data === null){
        responseObject.message = "uuid not found";
        return res.status(400).send(responseObject);
    }
    responseObject.message = "data deleted successfully"
    responseObject.data = data;
    responseObject.success = true;
    return res.status(200).send(responseObject);
}


module.exports = {
    createAuthor,
    deleteAuthor,
    viewAuthor
}