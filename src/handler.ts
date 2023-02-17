import * as manifest from './manifest';
import { getListener, getView } from './index.gen';
import path = require('path');
import { existsSync } from 'fs';

const RESOURCE_TYPE = "resource";
const LISTENER_TYPE = "listener";
const VIEW_TYPE = "view";
const MANIFEST_TYPE = "manifest";

const TYPES = [
    RESOURCE_TYPE,
    LISTENER_TYPE,
    VIEW_TYPE
];

type ViewBody = { view: string, data, props };
type ListenerBody = { action: string, props, event, api };
type ResourceBody = { resource: string };

const RESOURCES_PATH = "./resources/";

export async function handleRequest(body: object) {
    const type = TYPES.find(type => type in body) || MANIFEST_TYPE;
    switch (type) {
        case RESOURCE_TYPE:
            return handleResource(<ResourceBody>body);
        case LISTENER_TYPE:
            return handleListener(<ListenerBody>body);
        case VIEW_TYPE:
            return handleView(<ViewBody>body);
        case MANIFEST_TYPE:
            return handleManifest();
        default:
            throw new Error(`Unknown middleware type '${type}'.`);
    }
}

function handleManifest() {
    return { manifest: manifest };
}

async function handleView({ view, data, props }) {
    const fx = await getView(view);
    return fx(data, props);
}

async function handleListener({ action, props, event, api }) {
    const fx = await getListener(action);
    return fx(props, event, api);
}

async function handleResource({ resource }) {
    // Checking file extensions according to which ones Flutter can handle
    if (!resource.match(/.*(\.jpeg|\.jpg|\.png|\.gif|\.webp|\.bmp|\.wbmp)$/))
        throw new Error(`Wrong file format for resource ${resource}`);
    const file = new File(RESOURCES_PATH, resource);
    if (!file.exists)
        throw new Error(`Resource file not found ${resource}`);
    return file;
}

export class File {
    root: string
    path: string
    constructor(root: string, path: string) {
        this.root = root;
        this.path = path;
    }

    get exists() {
        return existsSync(path.join(this.root, this.path));
    }
}