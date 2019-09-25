// This is the main entry file to the whole Cosmos parser of little-dipper

import { Meteor } from 'meteor/meteor';
// import { CosmosParser } from './etl/parser.js';
import CosmosETL from './etl/index.js'
import CosmosAPI from './api/index.js';
// import './chainListeners.js


class CosmosClass {
  constructor() {
    this.etl = new CosmosETL();
    this.api = new CosmosAPI();
  }
  config = function(cfg) {
    this.etl._configure(cfg);
    // this.api._configure(cfg);
  }
  start = function() {
    this.etl.start();
  }
}

export { CosmosClass };
