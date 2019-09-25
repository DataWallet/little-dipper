
import { Meteor } from 'meteor/meteor';
import './class.js';

// Global package vars
SYNCING = false;
COUNTMISSEDBLOCKS = false;
COUNTMISSEDBLOCKSSTATS = false;
RPC = Meteor.settings.remote.rpc;
LCD = Meteor.settings.remote.lcd;



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


