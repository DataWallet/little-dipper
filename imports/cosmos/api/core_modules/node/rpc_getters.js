import Get from "../../api_get";

export default function RPCgets (url) {
  console.log("checking for url in export function" + url);
  
  function get(path) { return Get(url, path) }
  return {
    abciInfo: function () {
      return get('/abci_info');
    },
    status: function () {
      console.log("what is the url: " + url); 
      
      return get('/status');
    },
    genesis: function() {
      return get('/genesis');
    },
  }
}

/* RPC Endpoints(?) */

// abci_info?
// abci_query?path=_&data=_&height=_&prove=_
// block?height=_
// block_results?height=_
// blockchain?minHeight=_&maxHeight=_
// broadcast_tx_async?tx=_
// broadcast_tx_commit?tx=_
// broadcast_tx_sync?tx=_
// commit?height=_
// consensus_params?height=_
// consensus_state?
// dump_consensus_state?
// genesis?
// health?
// net_info?
// num_unconfirmed_txs?
// status?
// subscribe?query=_
// tx?hash=_&prove=_
// tx_search?query=_&prove=_&page=_&per_page=_
// unconfirmed_txs?limit=_
// unsubscribe?query=_
// unsubscribe_all?
// validators?height=_
