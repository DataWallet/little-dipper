
// import { Meteor } from 'meteor/meteor';
// import RPCgets from '../../imports/cosmos/api/core_modules/node/rpc_getters'; // THIS WONT WORK RIGHT NOW....
import './startup/server';
import './startup/both';
import './method_handlers.js';

// refactor below so that we can export and construct the class as needed with custom configuration
// import { CosmosDB } '';
// CosmosDB.config()
// CosmosDB.start();

// What are we doing about the API?
// import '/imports/cosmos/api/methods'
// import '/imports/cosmos/index.js'
// import Cosmos from '/imports/cosmos/api';
// import '/imports/cosmos/methods.js'

// const cosmosRESTURL = "http://127.0.0.1:1317";
// const cosmosRESTURL = Meteor.settings && Meteor.settings.remote && Meteor.settings.remote.lcd;
// const cosmosRPCURL = Meteor.settings && Meteor.settings.remote && Meteor.settings.remote.rpc;
// const chainId = Meteor.settings.public && Meteor.settings.public.chainId;

SYNCING = false;
COUNTMISSEDBLOCKS = false;
COUNTMISSEDBLOCKSSTATS = false;
RPC = Meteor.settings.remote.rpc;
LCD = Meteor.settings.remote.lcd;
timerBlocks = 0;
timerChain = 0;
timerConsensus = 0;
timerProposal = 0;
timerProposalsResults = 0;
timerMissedBlock = 0;
timerDelegation = 0;
timerAggregate = 0;

// const DEFAULTSETTINGS = '/default_settings.json';

// TODO: We need some kind of custom module support.....

// This will contain... a list of modules
let CONFIG = {
  modules: [
    {name: "bank", type: "core"}, // is this the name of the module?
    {name: "gov", type: "core"}, // is this the name of the module?
    // {name: "moduleName", type: "core"}, // is this the name of the module?
    {
      name: "permissions",
      type: "custom",
      moduleDefinition: {
      // here is stuff that defines the stuff?
        // a timer to then call a method handler
        // the handler calls meteor method
        // method parses txs etc.
        // Do we actually need more listeners?
        // We have a block listerner?
      }
    },
  ]
}

Meteor.startup(() => {
  // This is for unused API library
  // const conf = {
  //   RESTurl: cosmosRESTURL,
  //   RPCurl: cosmosRPCURL,
  //   chainId: chainId,
  // }
  // cosmos = new Cosmos(conf);
  // cosmos.addModule("rpc", RPCgets(cosmosRPCURL)); // this is used to make the call `Cosmos.rpc` available



  if (Meteor.isDevelopment) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    // import DEFAULTSETTINGSJSON from '../../../default_settings.json'
    import DEFAULTSETTINGSJSON from '../../../default_settings.json'
    Object.keys(DEFAULTSETTINGSJSON).forEach((key) => {
      if (Meteor.settings[key] == undefined)
        throw Error(`${key} is missing from settings`);
      Object.keys(DEFAULTSETTINGSJSON[key]).forEach((param) => {
        if (Meteor.settings[key][param] == undefined)
          throw Error(`${key}.${param} is missing from settings`);
      })
    })
  }

  Meteor.call('chain.genesis', (err, result) => {
    if (err) {
      console.log(err);
    }
    // This is where we need to add modularity?
    if (result) {
      if (Meteor.settings.debug.startTimer) {
        timerConsensus = Meteor.setInterval(function () {
          getConsensusState();
        }, Meteor.settings.params.consensusInterval);

        timerBlocks = Meteor.setInterval(function () {
          updateBlock();
        }, Meteor.settings.params.blockInterval);

        timerChain = Meteor.setInterval(function () {
          updateChainStatus();
        }, Meteor.settings.params.statusInterval);

        // This is gov module? annd which is 'mint'?
        // timerProposal = Meteor.setInterval(function () {
        //   getProposals();
        // }, Meteor.settings.params.proposalInterval);

        // timerProposalsResults = Meteor.setInterval(function () {
        //   getProposalsResults();
        // }, Meteor.settings.params.proposalInterval);

        timerMissedBlock = Meteor.setInterval(function () {
          updateMissedBlocks();
        }, Meteor.settings.params.missedBlocksInterval);

        // timerDelegation = Meteor.setInterval(function () {
        //   getDelegations();
        // }, Meteor.settings.params.delegationInterval);

        timerAggregate = Meteor.setInterval(function () {
          let now = new Date();
          if ((now.getUTCSeconds() == 0)) {
            aggregateMinutely();
          }

          if ((now.getUTCMinutes() == 0) && (now.getUTCSeconds() == 0)) {
            aggregateHourly();
          }

          if ((now.getUTCHours() == 0) && (now.getUTCMinutes() == 0) && (now.getUTCSeconds() == 0)) {
            aggregateDaily();
          }
        }, 1000)
      }
    }
  })

});


