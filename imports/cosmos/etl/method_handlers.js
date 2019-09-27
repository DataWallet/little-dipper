import { Meteor } from 'meteor/meteor';

const isDebug = Meteor.settings.debug.showLogs;
const isDev = Meteor.isDevelopment;

// This is where we want to refactor to eliminate repetition


updateChainStatus = () => {
  Meteor.call('chain.updateStatus', (error, result) => {
    // Gets several statuses of validators, pool etc.
      if (error){
        console.log("Error calling chain.updateStatus:");
        if (isDev && isDebug) { console.log(error); }
      }
      else{
        console.log("Called chain.updateStatus:");
        if (isDev && isDebug) { console.log(result); }
      }
  })
}

// This is the main event handler
updateBlock = () => {
  Meteor.call('blocks.blocksUpdate', (error, result) => {
      if (error){
        console.log("Error calling blocks.blocksUpdate:");
        if (isDev && isDebug) { console.log(error); }
      }
      else{
        console.log("Called blocks.updateBlocks: ");
        if (isDev && isDebug) { console.log(result); }
        // IS this where we add the custom stuff...
        // otherwise we have to embed it in the
        // NOTe: All block. methods make changes
        // to only necessary core data models/sets
        // for core function of the Cosmos DApp
        // Validator, Voting, Chainstate
      }
  })
}

getConsensusState = () => {
  Meteor.call('chain.getConsensusState', (error, result) => {
      if (error){
        console.log("Error calling chain.getConsensusState:")
        if (isDev && isDebug) { console.log(error); }
      } else {
        console.log("Called chain.getConsensusState:");
        if (isDev && isDebug) { console.log(result); }
      }
  })
}

getProposals = () => {
  Meteor.call('proposals.getProposals', (error, result) => {
      if (error){
        console.log("Error calling proposals.getPorposals:");
        if (isDev && isDebug) { console.log(error); }
      }
      if (result){
        console.log("Called proposals.getProposals:");
        if (isDev && isDebug) { console.log(result); }
      }
  });
}

getProposalsResults = () => {
  Meteor.call('proposals.getProposalResults', (error, result) => {
      if (error){
        console.log("Error calling proposals.getProposalsResults:");
        if (isDev && isDebug) { console.log(error); }
      }
      if (result){
        console.log("Called proposals.getProposalsResults:");
        if (isDev && isDebug) { console.log(result); }
      }
  });
}

updateMissedBlocks = () => {
  Meteor.call('ValidatorRecords.calculateMissedBlocks', (error, result) =>{
      if (error){
        console.log("Error calling ValidatorRecords.calculateMissedBlocks:");
        if (isDev && isDebug) { console.log(error); }
      }
      if (result){
          console.log("Called ValidatorRecords.calculateMissedBlocks:");
        if (isDev && isDebug) { console.log(result); }
      }
  });
  
  // NOTE: Testing below.
  Meteor.call('ValidatorRecords.calculateMissedBlocksStats', (error, result) =>{
      if (error){
        console.log("Error calling ValidatorRecords.calculateMissedBlocksStats:");
        if (isDev && isDebug) { console.log(error); }
      }
      if (result){
        console.log("Called ValidatorRecords.calculateMissedBlocksStats:");
        if (isDev && isDebug) { console.log(result); }
      }
  });
  
}

getDelegations = () => {
  Meteor.call('delegations.getDelegations', (error, result) => {
      if (error){
        console.log("Error calling: delegations.getDelegations.");
        if (isDev && isDebug) { console.log(error); }
      }
      else{
        console.log("Called delegations.getDelegations");
        if (isDev && isDebug) { console.log(result); }
      }
  });
}

aggregateMinutely = () =>{
  // doing something every min
  Meteor.call('Analytics.aggregateBlockTimeAndVotingPower', "m", (error, result) => {
      if (error){
        console.log("Error calling: Analytics.aggregateBlockTimeAndVotingPower");
        if (isDev && isDebug) { console.log(error); }
      }
      else{
        console.log("Called: Analytics.aggregateBlockTimeAndVotingPower");
        if (isDev && isDebug) { console.log(result); }
      }
  });

  Meteor.call('coinStats.getCoinStats', (error, result) => {
      if (error){
        console.log("Error calling: coinStats.getCoinStats");
        if (isDev && isDebug) { console.log(error); }
      }
      else{
        console.log("Called: coinStats.getCoinStats");
        if (isDev && isDebug) { console.log(result); }
      }
  });
}

aggregateHourly = () =>{
  // doing something every hour
  Meteor.call('Analytics.aggregateBlockTimeAndVotingPower', "h", (error, result) => {
      if (error){
        console.log("Error calling: Analytics.aggregateBlockTimeAndVotingPower");
        if (isDev && isDebug) { console.log(error); }
      }
      else{
        console.log("Analytics.aggregateBlockTimeAndVotingPower:");
        if (isDev && isDebug) { console.log(result); }
      }
  });
}

aggregateDaily = () =>{
  // doing somthing every day
  Meteor.call('Analytics.aggregateBlockTimeAndVotingPower', "d", (error, result) => {
      if (error){
        console.log("Error calling: Analytics.aggregateBlockTimeAndVotingPower");
        if (isDev && isDebug) { console.log(error); }
      }
      else{
        console.log("Called: Analytics.aggregateBlockTimeAndVotingPower");
        if (isDev && isDebug) { console.log(result); }
      }
  });

  Meteor.call('Analytics.aggregateValidatorDailyBlockTime', (error, result) => {
      if (error){
        //   console.log("aggregate validators block time error:"+ error)
        console.log("Error calling: Analytics.aggregateValidatorDailyBlockTime");
        if (isDev && isDebug) { console.log(error); }
      }
      else {
        console.log("Called: Analytics.aggregateValidatorDailyBlockTime");
        if (isDev && isDebug) { console.log(result); }
      }
  })
}