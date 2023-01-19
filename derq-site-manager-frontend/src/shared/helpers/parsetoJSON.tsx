

export default function parsetoJSON(object: Object) {
    return JSON.parse(JSON.stringify(object));
}