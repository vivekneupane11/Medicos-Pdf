import firebase from "firebase";

export const logEventWithoutParams = (eventName = "some_event_name") => {
    try {
        firebase.analytics().logEvent(eventName)
    } catch (error) {
        console.log(`EVENT WITHOUT PARAMS ERROR LOGGED: ${eventName}, ${error}`)

    }

}

export const logEventWithParams = (eventName = "some_event_name", params = {}) => {
    try {
        firebase.analytics().logEvent(eventName, params)
    } catch (error) {
        console.log(`EVENT WITHOUT PARAMS ERROR LOGGED: ${eventName}, ${error} ,${params}`)
    }
}

