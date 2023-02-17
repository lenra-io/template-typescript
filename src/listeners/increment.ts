import { Api } from '../classes/Api';
import { Counter } from '../classes/Counter';
import { event, props } from '../classes/types';

export default async function (props: props, _event: event, api: Api) {
    let counter = await api.getDoc(Counter, props.id);
    counter.count += 1;
    await api.updateDoc(counter);
    return {};
}