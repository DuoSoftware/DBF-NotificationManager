const config = require('config');
const request = require("request");
const validator = require('validator');


module.exports.sendNotification = (companyname, payload, token) =>{

    return new Promise(function(resolve, reject) {

        let url;
        url = `${config.Services.iotServiceProtocol}://${config.Services.iotServiceHost}` + `/DBF/API/${config.Services.iotServiceVersion}/awsiot/sendToTopic`;
        if (validator.isIP(config.Services.FBConPort))
            url = `${config.Services.iotServiceProtocol}://${config.Services.iotServiceHost}:${config.Services.iotServicePort}` + `/DBF/API/${config.Services.iotServiceVersion}/awsiot/sendToTopic`;


        request({
            rejectUnauthorized: false,
            method: "POST",
            url: url,
            json: {
                "topic" : `notifications/${companyname}`,
                "data" : payload
            },
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : token
            },


        }, function (_error, _response, datax) {

            console.log(datax);

            try {
                if (!_error && _response && _response.statusCode === 200) {
                    resolve(datax);
                } else {
                    let error = new Error(`There is an error in analyzeEntities`);
                    reject(error)
                }
            }
            catch (exception) {
                console.log(exception);
                reject(exception);
            }
        });

    });

};