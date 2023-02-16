import * as express from 'express';
import { writeFileSync } from 'fs';
import * as manifest from './manifest';
import { getListener, getView, listeners } from './index.gen';
const app = express();

const defaultMaxSize = '100kb'; // body-parser default

const rawLimit = process.env.MAX_RAW_SIZE || defaultMaxSize;
const jsonLimit = process.env.MAX_JSON_SIZE || defaultMaxSize;

let listenerHandlers = null;
let viewHandlers = null;

const RESOURCE_TYPE = "resource";
const LISTENER_TYPE = "listener";
const VIEW_TYPE = "view";
const MANIFEST_TYPE = "manifest";

app.disable('x-powered-by');

app.use(function addDefaultContentType(req, res, next) {
    // When no content-type is given, the body element is set to
    // nil, and has been a source of contention for new users.

    if (!req.headers['content-type']) {
        req.headers['content-type'] = "text/plain"
    }
    next()
})

if (process.env.RAW_BODY === 'true') {
    app.use(express.raw({ type: '*/*', limit: rawLimit }))
} else {
    app.use(express.text({ type: "text/*" }));
    app.use(express.json({ limit: jsonLimit }));
    app.use(express.urlencoded({ extended: true }));
}

const get_req_type = (req) => {
    if (req.method !== "POST") return "none";
    if (req.body.resource) {
        return RESOURCE_TYPE;
    } else if (req.body.action) {
        return LISTENER_TYPE;
    } else if (req.body.view) {
        return VIEW_TYPE;
    } else {
        return MANIFEST_TYPE;
    }
}

const middleware = async (req, res) => {
    switch (get_req_type(req)) {
        case RESOURCE_TYPE:
            handleAppResource(req, res);
            break;

        case LISTENER_TYPE:
            handleAppListener(req, res);
            break;

        case VIEW_TYPE:
            handleAppView(req, res);
            break;

        case MANIFEST_TYPE:
            handleAppManifest(req, res);
            break;

        default:
            throw new Error("Middleware type unknown.");

    }
};

function handleAppResource(req, res) {
    const resources_path = "./resources/";

    // Checking file extensions according to which ones Flutter can handle
    if (req.body.resource.match(/.*(\.jpeg|\.jpg|\.png|\.gif|\.webp|\.bmp|\.wbmp)$/)) {
        res.sendFile(req.body.resource, { root: resources_path });
    } else {
        res.sendStatus(404);
    }
}

function handleAppManifest(req, res) {
    res.status(200).json({ manifest: manifest });
}

function handleAppView(req, res) {
    const { view, data, props } = req.body;
    return getView(view)
        .then(async fx => {
            try {
                Promise.resolve(fx(data, props))
            }
            catch (error) {
                console.error('handleAppView', error);
                res.status(500).send(error.message);
            }
        })
        .catch(error => {
            console.error(error);
            res.status(404).send(error.message);
        });
}

/**
 * This is the main entry point for the OpenFaaS function.
 *
 * This function will call the index.js file of the application
 * when the page change.
 * If an event is triggered, the matched event function provided by the app is triggered.
 * The event can be a listener or a view update.
 */
async function handleAppListener(req, res) {
    let { action, props, event, api } = req.body;
    return getListener(action)
        .then(async fx => {
            try {
                Promise.resolve(fx(props, event, api));
            }
            catch (error) {
                console.error('handleAppAction', error);
                res.status(500).send(error.message);
            }
        })
        .catch(error => {
            console.error(error);
            res.status(404).send(error.message);
        });
}

//middleware to catch ressource
app.post('/*', middleware);

const port = process.env.http_port || 3000;

app.listen(port, () => {
    writeFileSync("/tmp/.lock", "\n");
    console.log(`App listening on port: ${port}`)
});
