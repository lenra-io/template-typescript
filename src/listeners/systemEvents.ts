import * as apiService from '../services/api';

export async function onEnvStart(props, event, api) {
    let res = await apiService.executeQuery(api, "counter", {
        "user": "global"
    })

    let counters = res.data;
    if (counters.length == 0) {
        await apiService.createDoc(api, "counter", {
            "count": 0,
            "user": "global"
        });
    }
}

export async function onUserFirstJoin(props, event, api) {
    let res = await apiService.executeQuery(api, "counter", {
        "user": "@me"
    })

    let counters = res.data;
    if (counters.length == 0) {
        await apiService.createDoc(api, "counter", {
            "user": "@me",
            "count": 0,
        })
    }
}

export async function onSessionStart(props, event, api) {

}

export async function onSessionStop(props, event, api) {

}

export async function onUserLeave(props, event, api) {
    
}

export async function onEnvStop(props, event, api) {

}
