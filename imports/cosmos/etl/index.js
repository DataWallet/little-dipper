// this is the new ETL entry point
import { CosmosParser } from './parser.js';

// Global etl vars
SYNCING = false;
COUNTMISSEDBLOCKS = false;
COUNTMISSEDBLOCKSSTATS = false;
RPC = Meteor.settings.remote.rpc;
LCD = Meteor.settings.remote.lcd;

// export default class CosmosETL {
//   constructor() {
//     this.isset = true;
//   }
// }

export default CosmosParser;

