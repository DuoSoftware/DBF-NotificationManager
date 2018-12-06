const UserNotification  = require('./lib/UserNotification');

module.exports = {

    sendToUser : async function (companyname, payload, token) {
        try {
            let value = await UserNotification.sendNotification(companyname, payload, token);
            return ({IsSuccess : true, message :`Success`, value :value });
        } catch(err) {
            return({IsSuccess : false, message :`sendNotification Failed`, exception :err });
        }
    }

};