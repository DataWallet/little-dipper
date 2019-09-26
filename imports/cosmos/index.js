// This is the main entry file to the whole Cosmos parser of little-dipper
import CosmosETL from './etl/index.js'
import CosmosAPI from './api/index.js';

export default class CosmosClass {
  constructor() {
    this.etl = new CosmosETL();
    this.api = new CosmosAPI();
  }
  config = function(cfg) {
    this.etl.configure(cfg);
  }
  start = function() {
    this.etl.sync();
  }
}
