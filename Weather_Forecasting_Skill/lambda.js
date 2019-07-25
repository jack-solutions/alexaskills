var request = require('request');

exports.handler = function (event, context) {
    switch (event.request.type) {
        case "IntentRequest":
            switch (event.request.intent.name) {
                case 'weatherByCity':
                    var city = event.request.intent.slots.city.value;
                    var endpoint = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=75eb5c859130ccd2f801da0d10a04c28' // ENDPOINT GOES HERE
                    request(endpoint, function (error, response, body) {
                        var data = JSON.parse(body);
                        var weather = data.weather[0].description,
                            temp = data.main.temp;
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Weather forecast of ` + city + ' is ' + weather + ' and temperature is ' + temp + ' Farenhit', true),
                                {}
                            )
                        )
                    });
                    break;
                default:
                    throw "Invalid intent"
            }
            break;
        default:
            context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)
    }
};

buildSpeechletResponse = (outputText, shouldEndSession) => {
    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    }

}
generateResponse = (speechletResponse, sessionAttributes) => {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    }

}