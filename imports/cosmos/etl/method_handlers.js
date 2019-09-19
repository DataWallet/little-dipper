import { Meteor } from 'meteor/meteor';

const isDebug = Meteor.settings.debug.showLogs;
const isDev = Meteor.isDevelopment;

updateChainStatus = () => {
  Meteor.call('chain.updateStatus', (error, result) => {
    // Gets several statuses of validators, pool etc.
      if (error){
        console.log("Error calling chain.updateStatus:");
        if (isDev && isDebug) { console.log(error); }
      }
      else{
        console.log("Success calling chain.updateStatus:");
        if (isDev && isDebug) { console.log(result); }
      }
  })
}

updateBlock = () => {
  Meteor.call('blocks.blocksUpdate', (error, result) => {
      if (error){
        console.log("Error calling blocks.blocksUpdate:");
        if (isDev && isDebug) { console.log(error); }
      }
      else{
        console.log("Success calling blocks.updateBlocks: ");
        if (isDev && isDebug) { console.log(result); }
      }
  })
}

getConsensusState = () => {
  Meteor.call('chain.getConsensusState', (error, result) => {
      if (error){
        console.log("Error calling chain.getConsensusState:")
        if (isDev && isDebug) { console.log(error); }
      } else {
        console.log("Success calling chain.getConsensusState:");
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
        console.log("Success calling proposals.getProposals:");
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
        console.log("Success calling proposals.getProposalsResults:");
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
          console.log("Success calling ValidatorRecords.calculateMissedBlocks:");
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
        console.log("Success callsing ValidatorRecords.calculateMissedBlocksStats:");
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
        console.log("Success: delegations.getDelegations");
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
        console.log("Success calling: Analytics.aggregateBlockTimeAndVotingPower");
        if (isDev && isDebug) { console.log(result); }
      }
  });

  Meteor.call('coinStats.getCoinStats', (error, result) => {
      if (error){
        console.log("Error calling: coinStats.getCoinStats");
        if (isDev && isDebug) { console.log(error); }
      }
      else{
        console.log("Success calling: coinStats.getCoinStats");
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
        console.log("Success calling: Analytics.aggregateBlockTimeAndVotingPower");
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
        console.log("Success calling: Analytics.aggregateValidatorDailyBlockTime");
        if (isDev && isDebug) { console.log(result); }
      }
  })
}