'use strict'

import Bank from "./core_modules/bank/bank_getters";
import Staking from "./core_modules/staking/staking_getters";
import Slashing from "./core_modules/slashing/slashing_getters";
import Governance from "./core_modules/governance/governance_getters";
import Distribution from "./core_modules/distribution/distribution_getters";
import Node from "./core_modules/node/node_getters";
// import RPC from "./core_modules/node/rpc_getters";

export default function Getters (RESTURL) {
  let gets = [];
  let retobj = {};

  gets.push(Bank(RESTURL));
  gets.push(Staking(RESTURL));
  gets.push(Slashing(RESTURL));
  gets.push(Governance(RESTURL));
  gets.push(Distribution(RESTURL));
  gets.push(Node(RESTURL));
  // gets.push(RPC(RPCURL));

  // gets.push(custom[0].init(RESTURL)); // actually this can maybe be done higher up?

  // TODO: Add support for custom module interface supplied by dev

  retobj.url = RESTURL;

  // do some loops to add everything to one object
  for (let i = 0; i < gets.length; i++) {
    const e = gets[i];
    // TODO: Add check and throw error on deuplicate
    Object.keys(e).forEach(getter => {
      retobj[getter] = e[getter]
    });
    
  }
  return retobj;

}
