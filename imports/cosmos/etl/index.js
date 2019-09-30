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
  }
  sync () {
    console.log("start the etl syncing");
    if (checkSettings()) {
      startSync();
    }
  }
  addModule() {
    // this is where we are going to start adding the custom module stuff
    // 
    // How do we do this???
    // we need to add something to post-block transaction parsing...
    // refactor this out?
  }
}