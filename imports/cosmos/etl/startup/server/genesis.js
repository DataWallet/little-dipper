import { Validators } from '/imports/cosmos/etl/validators/validators.js';
let validatorsCount = Validators.find({}).count();

if (validatorsCount == 0){
    console.log("no validators");
    
}