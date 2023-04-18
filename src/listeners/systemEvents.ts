import { Api, event, props } from '@lenra/app-server';
import { Counter } from '../classes/Counter.js';

export async function onEnvStart(_props: props, _event: event, api: Api) {
    console.log("onEnvStart");
    let counters = await api.executeQuery(Counter, {
        "user": "global"
    })

    if (counters.length == 0) {
        await api.createDoc(new Counter(0, "global"));
    }
}

export async function onUserFirstJoin(_props: props, _event: event, api: Api) {
    console.log("onUserFirstJoin");
    let counters = await api.executeQuery(Counter, {
        "user": "@me"
    })

    if (counters.length == 0) {
        await api.createDoc(new Counter(0, "@me"));
    }
}

export async function onSessionStart(_props: props, _event: event, api: Api) {

}

export async function onSessionStop(_props: props, _event: event, api: Api) {

}

export async function onUserLeave(_props: props, _event: event, api: Api) {

}

export async function onEnvStop(_props: props, _event: event, api: Api) {

}
