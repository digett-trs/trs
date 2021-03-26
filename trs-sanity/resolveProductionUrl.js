// ./resolveProductionUrl.js
export default function resolveProductionUrl(document) {
    var path = 'https://preview-trs.gtsb.io/'
    if (document.type === "page") {
        if (document.slug.current !== "home") {
            path = `https://preview-trs.gtsb.io/${document.slug.current}`
        }
    }
    return path
}