
exports.handler = function (event, context) {
    var date;
    switch (event.request.type) {
        case "LaunchRequest":
            context.succeed(generateResponse(
                buildSpeechletResponse('Welcome on which day you need to book a hotel', true),
                {}
            ))
            break;
        case "IntentRequest":
            switch (event.request.intent.name) {
                case 'bookhotel':
                    var dateSlotValue = event.request.intent.slots.date.value;
                    console.log("SS", event.request.intent.slots);
                    dateSlotValue === undefined ? context.succeed(
                        generateResponse(
                            buildSpeechletResponse('Welcome on which day you need to book a hotel', true),
                            {}
                        )
                    ) :
                        date = event.request.intent.slots.date.value;
                    context.succeed(
                        generateResponse(
                            buildSpeechletResponse('Your booking on this ' + date + ' is in process on this ' + date + ' in which hotel you want to book a room please enter hotel name', true),
                            {}
                        ))
                    var hotelNameSlotValue = event.request.intent.slots.name.value;
                    console.log("Hotel", hotelNameSlotValue);
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