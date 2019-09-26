// Startup doesnt start anything/methods/processes etc.
// It just builds the databases, and has also methods available
import './startup/server';
import './startup/both';
import { startSync, checkSettings } from './sync';

export default class CosmosETL {
  constructor() {
    this.isset = true;
  }
  configure (obj) {
    console.log("configuring the ETL with custom configs");
    console.log(obj);
    // here we can get the defaults, and merge with custom configs
  }
  start () {
    console.log("start the etl syncing");
    if (checkSettings()) {
      // startSync();
    }
  }
}