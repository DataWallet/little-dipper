// This is a custom listener?
// original convention 'CosmosListener"
// This was initially the class used to create instances of web3.contract for interafacing
// with the contract through the DApp parser and API interface


// This file we will use for all interactions...
// We are not sending txs though... so it's less usefull?
export default class ModuleInterface {
  // TODO: add chaincode type for multiple formats/protocols?
  constructor(config) {
    if (!web3) { console.error("no web3") }
    this.initialized = false;
    this.instance = false;
    this.startBlock = config.startBlock || 0;
    if (!config.contract || !config.contract.abi || !config.contractId) {
      this.contractId = null;
      this.contractName = null;
      this.contractABI = null;
      console.log("Contract interface dependencies missing");
    } else {
      // TODO: Check for valid contract instance, or return error
      this.contractId = config.contractId;
      this.contractName = config.contract.contractName;
      this.contractABI = config.contract.abi
    }
  }

  // This is NOT `start`...
  // TODO: New convention is 'init'
  init() {
    // console.log("Starting the interface for contract: " + this.contractName);
    // if (this.contractABI && this.contractId && web3) {
      // set status?
      // TODO: This is where we can setup subscriptions to the ws?
      // this.subscribe();
      // this.instance = new web3.eth.Contract(this.contractABI, this.contractId);
      // return this.initialized = true;
    // } else {
      // set status?
      // console.error("Could not start contract interface");
      // return false;
    // }

  }

  // TODO: This should be the websocket connection(?)
  subscribe(callback) {
    var cb = (typeof callback === "function") ? callback : function () { };
    // return web3.eth.subscribe('logs',
    //   {address: this.contractId},
    //   callback
    // );
  }

  async getPastEvents() {
    return await this.instance.getPastEvents('allEvents', { fromBlock: 0 });
  }

  status() {
  }

  syncDB() {
  }

} // END class BlockchainParser {}

  // global.BlockchainParser = BlockchainParser;

