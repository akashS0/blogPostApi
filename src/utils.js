const { v4 } = require("uuid");
module.exports = {
    generateUuid: function () {
        return v4();
    },

    isEmailValid: function (email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

}

