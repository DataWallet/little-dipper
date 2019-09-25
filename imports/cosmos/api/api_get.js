/* ============ GET ============ */
// This is the generic REST api caller
const fetch = require("node-fetch");


export default function Get (cosmosRESTURL, path, format, retries) {
    const tries = retries || 4;
    while (tries) {
      try {
        if (format === "text") {
          return fetch(cosmosRESTURL + path).then(res => res.text())
        } else {
          return fetch(cosmosRESTURL + path).then(res => res.json())
        }
      } catch (err) {
        if (--tries === 0) {
          throw err
        }
      }
    }

}
