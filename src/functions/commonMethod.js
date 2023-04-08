import {getAnalytics, logEvent} from 'firebase/analytics';
export const logEventWithoutParams = (eventName = "some_event_name") => {
    try {
        logEvent(getAnalytics(),eventName)
    } catch (error) {
        console.log(`EVENT WITHOUT PARAMS ERROR LOGGED: ${eventName}, ${error}`)

    }

}

export const logEventWithParams = (eventName = "some_event_name", params = {}) => {
    try {
        logEvent(getAnalytics(),eventName, params)
    } catch (error) {
        console.log(`EVENT WITHOUT PARAMS ERROR LOGGED: ${eventName}, ${error} ,${params}`)
    }
}

