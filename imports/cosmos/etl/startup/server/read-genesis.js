import { Blockscon } from 'imports/cosmos/etl/blocks/blocks.js';

let blocksCount = Blockscon.find({}).count();
console.log(blocksCount);
