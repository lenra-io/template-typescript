import { Api, event, props } from '@lenra/app-server';
import { Counter } from '../classes/Counter.js';

export default async function (props: props, _event: event, api: Api) {
    let counter = await api.getDoc(Counter, props.id);
    counter.count += 1;
    await api.updateDoc(counter);
    return {};
}