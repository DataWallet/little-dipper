import { Meteor } from 'meteor/meteor';

updateChainStatus = () => {
  Meteor.call('chain.updateStatus', (error, result) => {
      if (error){
        //   console.log("updateStatus: "+error);
      }
      else{
          console.log("updateStatus: "+result);
      }
  })
}

updateBlock = () => {
  Meteor.call('blocks.blocksUpdate', (error, result) => {
      if (error){
        //   console.log("updateBlocks: "+error);
      }
      else{
          console.log("updateBlocks: "+result);
      }
  })
}

getConsensusState = () => {
  Meteor.call('chain.getConsensusState', (error, result) => {
      if (error){
        //   console.log("get consensus: "+error)
      }
  })
}

getProposals = () => {
  Meteor.call('proposals.getProposals', (error, result) => {
      if (error){
        //   console.log("get porposal: "+ error);
      }
      if (result){
          console.log("get proposal: "+result);
      }
  });
}

getProposalsResults = () => {
  Meteor.call('proposals.getProposalResults', (error, result) => {
      if (error){
        //   console.log("get proposals result: "+error);
      }
      if (result){
          console.log("get proposals result: "+result);
      }
  });
}

updateMissedBlocks = () => {
  Meteor.call('ValidatorRecords.calculateMissedBlocks', (error, result) =>{
      if (error){
        //   console.log("missed blocks error: "+ error)
      }
      if (result){
          console.log("missed blocks ok:" + result);
      }
  });
  
  // NOTE: Testing below.
  Meteor.call('ValidatorRecords.calculateMissedBlocksStats', (error, result) =>{
      if (error){
        //   console.log("missed blocks stats error: "+ error)
      }
      if (result){
          console.log("missed blocks stats ok:" + result);
      }
  });
  
}

getDelegations = () => {
  Meteor.call('delegations.getDelegations', (error, result) => {
      if (error){
        //   console.log("get delegation error: "+ error)
      }
      else{
          console.log("get delegtaions ok: "+ result)
      }
  });
}

aggregateMinutely = () =>{
  // doing something every min
  Meteor.call('Analytics.aggregateBlockTimeAndVotingPower', "m", (error, result) => {
      if (error){
        //   console.log("aggregate minutely block time error: "+error)
      }
      else{
          console.log("aggregate minutely block time ok: "+result)
      }
  });

  Meteor.call('coinStats.getCoinStats', (error, result) => {
      if (error){
        //   console.log("get coin stats: "+error);
      }
      else{
          console.log("get coin stats ok: "+result)
      }
  });
}

aggregateHourly = () =>{
  // doing something every hour
  Meteor.call('Analytics.aggregateBlockTimeAndVotingPower', "h", (error, result) => {
      if (error){
        //   console.log("aggregate hourly block time error: "+error)
      }
      else{
          console.log("aggregate hourly block time ok: "+result)
      }
  });
}

aggregateDaily = () =>{
  // doing somthing every day
  Meteor.call('Analytics.aggregateBlockTimeAndVotingPower', "d", (error, result) => {
      if (error){
        //   console.log("aggregate daily block time error: "+error)
      }
      else{
          console.log("aggregate daily block time ok: "+result)
      }
  });

  Meteor.call('Analytics.aggregateValidatorDailyBlockTime', (error, result) => {
      if (error){
        //   console.log("aggregate validators block time error:"+ error)
      }
      else {
          console.log("aggregate validators block time ok:"+ result);
      }
  })
}