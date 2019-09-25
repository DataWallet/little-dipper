import Get from "../../api_get";

/* ============ Slashing ============ */
export default function Slashing (url) {
  function get(path) { return Get(url, path) }
  return {
    validatorSigningInfo: function (pubKey) {
      return get(`/slashing/validators/${pubKey}/signing_info`);
    }
  }
}
