import { Meteor } from 'meteor/meteor';

import './method_handlers.js';

INTS = {};
SYNCING = false;
COUNTMISSEDBLOCKS = false;
COUNTMISSEDBLOCKSSTATS = false;
RPC = Meteor.settings.remote.rpc;
LCD = Meteor.settings.remote.lcd;
INTS.timerBlocks = 0;
INTS.timerChain = 0;
INTS.timerConsensus = 0;
INTS.timerProposal = 0;
INTS.timerProposalsResults = 0;
INTS.timerMissedBlock = 0;
INTS.timerDelegation = 0;
INTS.timerAggregate = 0;

const startSync = function () {
    Meteor.call('chain.genesis', (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result) {
        if (Meteor.settings.debug.startTimer) {
          INTS.timerConsensus = Meteor.setInterval(function () {
            getConsensusState();
          }, Meteor.settings.params.consensusInterval);

          INTS.timerBlocks = Meteor.setInterval(function () {
            updateBlock();
          }, Meteor.settings.params.blockInterval);

          INTS.timerChain = Meteor.setInterval(function () {
            updateChainStatus();
          }, Meteor.settings.params.statusInterval);

          // This is gov module? annd which is 'mint'?
          INTS.timerProposal = Meteor.setInterval(function () {
            getProposals();
          }, Meteor.settings.params.proposalInterval);

          INTS.timerProposalsResults = Meteor.setInterval(function () {
            getProposalsResults();
          }, Meteor.settings.params.proposalInterval);

          INTS.timerMissedBlock = Meteor.setInterval(function () {
            updateMissedBlocks();
          }, Meteor.settings.params.missedBlocksInterval);

          INTS.timerDelegation = Meteor.setInterval(function () {
            getDelegations();
          }, Meteor.settings.params.delegationInterval);

          INTS.timerAggregate = Meteor.setInterval(function () {
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
    });

}

const checkSettings = function () {
  if (Meteor.isDevelopment) console.log("checking settings file...");
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
  return true;
}


export { checkSettings, startSync };