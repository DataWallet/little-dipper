// This will be the main class to export
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
// import CosmosAPI from 'meteor/rd010:little-dipper/imports/cosmos/api';

// import './startup/server';
// import './startup/both';
// import './method_handlers.js';
// import './conns.js';

// This is a meta collection to track information, data, or stats related
// to function or performance of this package itself. 
// This package controls putting into database...
// its dependent on listeners calling these methods...
DAppETL = new Mongo.Collection('dAppETL');
DAppDBCollection = new Mongo.Collection('dAppDBCollection');

// Get all the settings which will be needed
const settings = Meteor.settings && Meteor.settings.public || null;
const remotes = settings && settings.remote || null;

// Some kind of configurations
const apiConf = {
  RESTurl: remotes && remotes.lcd ,
  RPCurl: remotes && remotes.rpc,
  chainId: settings && settings.chainId,
}
// cosmos = new Cosmos(apiConf);

// The point of this class is to set up the databases for modules
// This needs to be 'class CosmosETL {}'

// TODO: We will add additional modules based on configs
const capi = new CosmosAPI({chainId: "engine"});
console.log("getting node info....");

let res0;
// capi.get.nodeInfo().then(r => res0 = r);
console.log(res0);



// The purpose of this is to track core blockchain data (blocks, txs)
// and to put all the generi
class DAppDatabase {
  constructor() {
    console.log("we are now trying to really build the class....")
    console.log("we are starting construction");
    
    // we want to add the api stuff here...
    // lets make it so that we call all through Cosmos
    // like: Cosmos.api.method();
    this.connection = {};
    
    var apiStatus = {connected:false};
    if (typeof CosmosAPI === "undefined") { 
      console.error("No Cosmos API.")
    } else {
      // We have the CosmosAPI code, but no connection
      console.log("we have cosmos api...");
      
      if (Meteor.isServer) {
        this.connection.connected = false;
        // connection.version = web3.version
        // connection.network = web3.currentProvider.connection._url;
        // connection.readyState = web3.currentProvider.connection._readyState;
      }
    }
    // const capi = CosmosAPI;
    // this.api = new capi();
    // console.log("New DAppDB instance...");
    this._initialized = false;
    // this._configs = {};
    // this._contracts = [];
    this._modules = [];
    this._trackers = [];

    this.connectionStatus = false;
    this.syncStatus = 0; // 0 = 'off', 1 = 'on', 2 = 'error'(?)

    var INITED = false;
    var CONFIG = {};
    var TRACKERS = [];
    CONFIG._completed = false;
    
    this._setInit = function () {
      if (!INITED) {
        INITED = true;
        this._initialized = true;
      }
    }
    this.getInit = function () { return INITED }

    this._setConfigs = function (o1, o2) {
      if (!o1 || CONFIG._completed) {
        return new Error('500', 'Cannot configure DAppDB');
      } else {
        try {
          // TODO: Set defaults above and just overwrite here?
          CONFIG = this._configure(o1, o2);
          CONFIG._completed = true;
          // this._configs = CONFIG;
          
          // TODO: Set initial statuses
          
          // Below is not trusted on Meteor client
          if (Meteor.isServer) {
            var doc = CONFIG;
            doc._type = "configs";
            // doc.contracts = this._contracts;
            doc.modules = this._modules;
            doc.connections = {
              server: web3Status,
              client: "disconnected"
            }
            DAppDBCollection.update(
              { _type:"configs" },
              doc,
              { upsert: true }
            );
          }

        } catch (error) {
          console.error("we had a DAppDB configuration error...")
          console.log(error);
        }
      }
    }
    this.getConfigs = function () { return CONFIG }

  }

  _configure (params, options) {
    console.log("we arre trying to configurre the ETL!?!??!?!");
    
    if (this.getInit() || this.getConfigs()._completed || !params) { return false } // Add error;
    // Parase configs, set some defaults etc.

    var configs = {};
    // var contracts = [];
    var modules = [];

    // Check for contracts array
    if (options && params && Array.isArray(params)) {
      // contracts = params;
      modules = params;
      configs = options;
    } else if (params && !options) {
      configs = params;
    } else {
      return false; // We have no params to init with.
    }

    var obj = {}; // Change for more parsing of params
    obj.provider = configs.web3Provider || "ws://127.0.0.1:8545"
    obj.startBlock = configs.startBlock || 0;
    obj.syncedCollections = configs.syncedCollections || [];
    obj.collectionsPrefix = configs.collectionsPrefix || null;
    obj.globalObj = configs.globalObj || "Contracts";
    obj.contracts = contracts;
    // obj.collections = collections;
    // obj.ABI = config.contractABI;
    // Set the global contracts object
    global[obj.globalObj] = {};
    return obj;
  }

  _web3Instance (params) {
    // We are only supporting web3 and contract instances on server
    // to avoid conflicts with client web3 interfaces. (ie. Metamask)
    if (Meteor.isClient) { return null }
    return new web3.eth.Contract(params.contractABI, params.contractAddress);
  }

  // TODO: Change this convention
  _addTokenContract (obj) {
    const conf = this.getConfigs();
    // TODO: Add cusomt tracker contracts
    if (Meteor.isServer) {
      global[conf.globalObj][obj.contractName] = this._web3Instance(obj);
    } else {
      window[conf.globalObj][obj.contractName] = {
        name: obj.contractName,
        abi: obj.contractABI,
        address: obj.contractAddress
      }
    }
    this._addCollection(obj);
  }
  // TODO: Change this convention
  _addRoleContract (obj) {
    const conf = this.getConfigs();
    // need to add a collection for tracking...
    if (Meteor.isServer) {
      global[conf.globalObj][obj.contractName] = this._web3Instance(obj);
    } else {
      window[conf.globalObj][obj.contractName] = {
        name: obj.contractName,
        abi: obj.contractABI,
        address: obj.contractAddress
      }
    }
    this._addCollection(obj);
  }
  // TODO: change this conventions
  _addCustomContract (obj) {
    const conf = this.getConfigs();
    if (Meteor.isServer) {
      global[conf.globalObj][obj.contractName] = this._web3Instance(obj);
    } else {
      window[conf.globalObj][obj.contractName] = {
        name: obj.contractName,
        abi: obj.contractABI,
        address: obj.contractAddress
      }
    }
    this._addCollection(obj);
  }
  
  _addCollection (obj) {
    const conf = this.getConfigs();
    var g = Meteor.isServer ? global : window ;
    var newCols = [];
    var baseName = obj.eventsCollection; // this is the base name before updated
    // var name = obj.eventsCollection + "Events";

    function collNames (name) {
      console.log("setting collection name...");
      // let name = nm;
      let nObj = {};
      nObj.uName = name.charAt(0).toUpperCase() + name.slice(1),
      nObj.lName = name.charAt(0).toLowerCase() + name.slice(1)

      if (conf.collectionsPrefix) {
        let pre = conf.collectionsPrefix;
        let ln = nObj.lName;
        nObj.lName = "" + pre.toLowerCase() + nObj.uName;
        nObj.uName = "" + pre.toUpperCase() + ln;
      }

      name = null;
      return nObj;
      
    }
    console.log("tracking....")
    console.log(this._trackers.length);
    
    var eventsColl = baseName + "Events";
    var names = collNames(eventsColl);
    var tIndex = 0;

    if (this._trackers.length > 0) {

      tIndex = this._trackers.findIndex(function (elem) {
        return elem.name === obj.name;
      })
      
    }
    
    this._trackers[tIndex].eventsCollection = names.uName;
    g[names.uName] = new Mongo.Collection(names.lName);

    for (let i = 0; i < obj.syncedCollections.length; i++) {
      // const f = obj.syncedCollections[i];
      const sNames = collNames(baseName.concat(obj.syncedCollections[i]));
      // if type token or roles, add 'linked'
      const type = obj.type === 'token' || obj.type === 'roles' && i === 0 ? 'linked' : 'synced';


      newCols.push({
        name: sNames.uName,
        type: type,
        status: 0
      })
      this._trackers[tIndex].syncedCollections[i] = sNames.uName;
      g[sNames.uName] = new Mongo.Collection(sNames.lName);
    }
    
    newCols.push({
      name: names.uName,
      type: "events", // other types: "state" ?
      status: 0 // 0:1:2 again?
    });

    if (Meteor.isServer) {
      // Update configurations document in DB
      console.log("adding to set2");
      
      DAppDBCollection.update(
        {_type:"configs"},
        {$addToSet: {collections: {$each: newCols}}},
        {upsert: true}
      )
      
    }
  }

  // addContracts (params) {
  addModules (params) {
    if (!params || !Array.isArray(params)) { return false }
    for (let i = 0; i < params.length; i++) {
      const e = params[i];
      // this._contracts.push(e);
      this._modules.push(e);
      this._trackers.push(e)
      // this._addCustomContract(e);
      e.syncedCollections = Array.isArray(e.syncedCollections) ? e.syncedCollections : [];
      // console.log("synced collections?");
      // console.log(e.syncedCollections);
      
      switch (e.type) {
        case "token":
          e.syncedCollections.unshift('Balances');
          this._addTokenContract(e);
          break;
        case "roles":
          e.syncedCollections.unshift('Users');
          this._addRoleContract(e);
          break;
        case "custom":
          this._addCustomContract(e);
          break;

        default:
          return false;
      }
    } 
    // console.log("after switch...");
    

  }

  config (opts, modules) {
    // console.log("configuring DAppDB");
    this._setConfigs(opts);
    if (Array.isArray(modules)) {
      // this.addContracts(arr);
      this.addModules(modules);
    } else {
      // this is an error, we need an array of moodules
    }
  }

}


if (Meteor.isServer) {
  DAppDatabase.prototype._handleTokenEvents = async function (event, tracker) {
    if (event.event === "Transfer") {
      const conf = this.getConfigs();
      const typeCollection = tracker.syncedCollections[0];

      const sender = event.returnValues.from;
      const recipient = event.returnValues.to;
      const senderNewBalance = await global[conf.globalObj][tracker.contractName].methods.balanceOf(sender).call();
      const recipientNewBalance = await global[conf.globalObj][tracker.contractName].methods.balanceOf(recipient).call();
      // Update linked collection for this special type
      if (senderNewBalance && recipientNewBalance) {
        const dateNow = new Date();
        const senderDoc = {
          accountId: sender,
          balance: senderNewBalance,
          _updatedAt: dateNow
        }
        const recipientDoc = {
          accountId: recipient,
          balance: recipientNewBalance,
          _updatedAt: dateNow
        }
        global[typeCollection].update(
          { accountId: sender },
          { $setOnInsert: { _createdAt: dateNow },
            $set: senderDoc
          },
          { upsert: true });
        global[typeCollection].update(
          { accountId: recipient },
          { $setOnInsert: { _createdAt: dateNow },
            $set: recipientDoc
          },
          { upsert: true });
      } else {
        return new Error("Update token account balances failed.");
      }
    }
    this._handleEventCallback(event, tracker);
  }
  DAppDatabase.prototype._handleRoleEvents = function (event, tracker) {
    const typeCollection = tracker.syncedCollections[0];     
    // Update linked collection for this special type
    const dateNow = new Date();
    global[typeCollection].update(
      { address: event.returnValues.operator },
      {
        $addToSet: { roles: event.returnValues.role },
        $set: { address: event.returnValues.operator, _updatedAt: dateNow },
        $setOnInsert: {_createdAt: dateNow}
      },
      { upsert: true }
    );
    this._handleEventCallback(event, tracker);
  }

  DAppDatabase.prototype._handleCustomEvents = function (event, tracker) {
    this._handleEventCallback(event, tracker);
  }
  DAppDatabase.prototype._handleEventCallback = function (event, tracker) {
    // TODO: this should be try/catch
    // NOTE: Status should be indicated on failure
    // update status fist on collection?
    // DAppDBCollection.update(
      // {"collections.name": tracker.eventsCollection},
      // {$set: { "collections.$.status": 1 }}
    // );

    try {
      if (
        tracker.eventCallback
        && Array.isArray(tracker.eventsTracked)
        && tracker.eventsTracked.includes(event.event)
        ) { Meteor.call(tracker.eventCallback, event) } // TODO: Check if actual method
      
    } catch (error) {
      console.log(Error("DAppDB: callback failed for event: " + event.event ,error));
      for (let i = 0; i < tracker.syncedCollections.length; i++) {
        const collName = tracker.syncedCollections[i];
        console.log("updateing synced collection status: " + collName);
        DAppDBCollection.update(
          {"collections.name": collName},
          {$set: { "collections.$.status": 2 }}
        )
        
        // DAppDBCollection.update(
        //   {"collections.name": collName},
        //   {$set: { "collections.$.status": 2 }}
        // );
      }
    }
  }

  DAppDatabase.prototype._handleEvent = function (event, name) {
    const contractTrackers = this._trackers.filter(function (element, index) {
      return element.contractName === name && element.eventsTracked.includes(event.event)
    });

    // Typically this should only be an array of 1 or a few elements
    contractTrackers.forEach(function (e) {
      const collName = e.eventsCollection;
      // TODO: Here we can add checks for unconfirmed event records
      
      // NOTE: This conditional will not support multiple events/transaction
      // if (!global[collName].findOne({transactionHash:event.transactionHash})) {
        // console.log(event.event);
        
        event._createdAt = new Date();
        event._updatedAt = new Date();
        global[collName].insert(event); // check for duplication?
      // }
      
      switch (e.type) {
        case "token":
          this._handleTokenEvents(event, e);
          break;
        case "roles":
          this._handleRoleEvents(event, e);
          break;
        case "custom":
          this._handleCustomEvents(event, e);
          break;

        default:
          return false;
      }

    }, this);

  }

  DAppDatabase.prototype._listenEvents = function () {
    const conf = this.getConfigs();
    const contracts = global[conf.globalObj];
    // function handler(e, n) { this._handleEvent(e, n); }
    for (const name in contracts) {
      if (contracts.hasOwnProperty(name)) {
        global[conf.globalObj][name].events.allEvents(Meteor.bindEnvironment(function (error, result) {
          if (result) {
            // This could be a problem because it doesnt get the context?
            DAppDB._handleEvent(result, name);
            // handler(result, name);

          }
        }));
      }
    }
  }

  DAppDatabase.prototype._checkDBDrift = function () {
    // For now this is forcing sync
    // just check sync and update collection status
    // console.log("forcing drift");
    return true; // or false
  }

  DAppDatabase.prototype._syncDBs = async function (params) {
    if (this._checkDBDrift()) { 
      // Should remove and update... also maybe defer this to user action?
      const trackers = this._trackers;
      this._initDBs(trackers);
      const conf = this.getConfigs();
      for (const key in global[conf.globalObj]) {
        if (global[conf.globalObj].hasOwnProperty(key)) {
          const contract =global[conf.globalObj][key];
          const allEvents = await contract.getPastEvents("allEvents",{fromBlock:0});

          for (let j = 0; j < allEvents.length; j++) {
            this._handleEvent(allEvents[j], key);
          }
          
        }
      }

      // Set status for all synced collections
      // TODO: This is generally assumtive, we can add
      // granular checks later
      for (let i = 0; i < trackers.length; i++) {
        const tr = trackers[i];
        var collections = [];
        collections.push(tr.eventsCollection);

        for (let j = 0; j < tr.syncedCollections.length; j++) {
          collections.push(tr.syncedCollections[j]);
        }
        
        for (let k = 0; k < collections.length; k++) {
          const collName = collections[k];
          DAppDBCollection.update(
            {"collections.name": collName},
            {$set: { "collections.$.status": 1 }}
          )

        }
      }

    }


  }

  DAppDatabase.prototype._initDBs = function () {
    
    var conf = this.getConfigs();
    var trackers = this._trackers;
    // console.log(trackers);
    // get the tracker for the instance...
    
    // Clear the collections
    for (let i = 0; i < trackers.length; i++) {
      const e = trackers[i];
      var name = e.eventsCollection;
      
      global[name].remove({});
      // if (e.type === 'token' || e.type === "roles") {
      //   const sName = e.syncedCollections[0];
      //   global[sName].remove({});
      // }
      collArr = e.syncedCollections || [];
      for (let j = 0; j < collArr.length; j++) {
        const f = collArr[j];
        global[f].remove({});
      }

    }

  }

  DAppDatabase.prototype._initialize = function (params) {
    if (this.getInit()) { return false }
    this._listenEvents();
    this._setInit();
  }

  DAppDatabase.prototype.start = async function () {
    console.log("starting DAppDB");
    if (!this.getInit()) {
      this._initialize();
    }
    this._syncDBs();
    
    this.syncStatus = 0;

    // this._setStatuses()
    // start event listening/subscriptions
    // then sheck for sync of tracking DBs.
    // await this._syncDBs();
    this.syncStatus = 1;
  }

  
}

// var g = Meteor.isServer ? global : window ;
// g.DappDB = {};
// DAppDB = new DAppDatabase();



export {DAppDatabase as CosmosParser};




