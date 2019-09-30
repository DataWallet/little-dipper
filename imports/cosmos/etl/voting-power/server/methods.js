// here we are going to put the blockchain methods.....
import { ValidatorSets } from '../../validator-sets/validator-sets.js';
import { Validators } from '../..//validators/validators.js';
import { ValidatorRecords, Analytics, VPDistributions} from '../../records/records.js';
import { VotingPowerHistory } from '../..//voting-power/history.js';


const bulkValidators = Validators.rawCollection().initializeUnorderedBulkOp();
const bulkValidatorRecords = ValidatorRecords.rawCollection().initializeUnorderedBulkOp();
const bulkVPHistory = VotingPowerHistory.rawCollection().initializeUnorderedBulkOp();

Meteor.methods({
  'voting-power.xxx': function () {
    // this is where we will put the stuff that is currently only in the blocks methods...
  },
  'voting-power.distritubion': function () {

                            console.log("===== calculate voting power distribution =====");
                            let activeValidators = Validators.find({status:2,jailed:false},{sort:{voting_power:-1}}).fetch();
                            let numTopTwenty = Math.ceil(activeValidators.length*0.2);
                            let numBottomEighty = activeValidators.length - numTopTwenty;

                            let topTwentyPower = 0;
                            let bottomEightyPower = 0;

                            let numTopThirtyFour = 0;
                            let numBottomSixtySix = 0;
                            let topThirtyFourPercent = 0;
                            let bottomSixtySixPercent = 0;



                            for (v in activeValidators){
                                if (v < numTopTwenty){
                                    topTwentyPower += activeValidators[v].voting_power;
                                }
                                else{
                                    bottomEightyPower += activeValidators[v].voting_power;
                                }


                                if (topThirtyFourPercent < 0.34){
                                    topThirtyFourPercent += activeValidators[v].voting_power / analyticsData.voting_power;
                                    numTopThirtyFour++;
                                }
                            }

                            bottomSixtySixPercent = 1 - topThirtyFourPercent;
                            numBottomSixtySix = activeValidators.length - numTopThirtyFour;

                            let vpDist = {
                                height: height,
                                numTopTwenty: numTopTwenty,
                                topTwentyPower: topTwentyPower,
                                numBottomEighty: numBottomEighty,
                                bottomEightyPower: bottomEightyPower,
                                numTopThirtyFour: numTopThirtyFour,
                                topThirtyFourPercent: topThirtyFourPercent,
                                numBottomSixtySix: numBottomSixtySix,
                                bottomSixtySixPercent: bottomSixtySixPercent,
                                numValidators: activeValidators.length,
                                totalVotingPower: analyticsData.voting_power,
                                blockTime: blockData.time,
                                createAt: new Date()
                            }

                            console.log(vpDist);

                            VPDistributions.insert(vpDist);
  }
});