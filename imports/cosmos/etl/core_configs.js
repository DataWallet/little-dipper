// Core modules needed to support:

//   auth
//   bank
//   crisis
//   distribution
//   genaccounts (?)
//   genutil (?)
//   gov
//   mint
//   mock (?)
//   nft
//   params (?)
//   simulation (?)
//   slashing
//   staking
//   supply

const CoreModuleConfigs = {};
CoreModules.blocks = {
  // This always included, regardless
};

CoreModules.transactions = {
  // This module always included
};

// This should just be for all basic transactions??!?!
CoreModules.bank = {
  name: "Bank",
  API: "bank"
};

CoreModules.auth = {};
CoreModules.bank = {};
CoreModules.crisis = {};
CoreModules.distribution = {};
CoreModules.genaccounts = {};
CoreModules.genutil = {};
CoreModules.gov = {};
CoreModules.mint = {};
CoreModules.mock = {};
CoreModules.nft = {};
CoreModules.params = {};
CoreModules.simulation = {};
CoreModules.slashing = {};
CoreModules.staking = {};
CoreModules.supply = {};

export default CoreModuleConfigs;