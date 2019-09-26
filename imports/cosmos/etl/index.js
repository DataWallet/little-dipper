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
}