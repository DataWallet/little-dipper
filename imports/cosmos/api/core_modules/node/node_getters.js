import Get from "../../api_get";
const fetch = require("node-fetch");

/* ============ Node ============ */
export default function Node (url) {
  function get(path) { return Get(url, path) }
  return {
    connected: function () {
      return this.nodeVersion().then(() => true, () => false)
    },

    nodeVersion: () => fetch(url + `/node_version`).then(res => res.text()), // required because needs text result

    nodeInfo: () => fetch(url + `/node_info`).then(res => res.json()),

    block: function (num) {
      blockHeight = num || "latest";
      return get(`/blocks/${blockHeight}`)
    },
    // Note, these are for the RPC
    // status: function (url) {
      // NOTE: This requires the RPC url, not the LCD url
      // return fetch(url + '/status');
    // },
  }
}