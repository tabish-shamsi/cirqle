export default function toJSON(value: any) {
    return JSON.parse(JSON.stringify(value))
}