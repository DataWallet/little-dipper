import { Meteor } from 'meteor/meteor';
 
// Interval ID's 
INTS = {};

if (Meteor.isServer) {
  Meteor.startup(() => {
    console.log("new startup sequence...")

    // Why is this only for .isDevelopment?
    if (Meteor.isDevelopment) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
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
  
    // We always check for the genesis on app startup
    Meteor.call('chain.genesis', (err, result) => {
      if (err) { console.log(err); 
      } else {
        // Just checking to see the settings are there...
        if (!Meteor.settings.debug || !Meteor.settings.debug.startTimer) {
          throw new Error("No settings for the Cosmos etl.");
        } else {
          // here we start the whole sequence
          // Cosmos.etl.startSync();
        }
      }
    });

  });
  
}