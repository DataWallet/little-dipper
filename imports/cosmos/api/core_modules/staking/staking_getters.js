import Get from "../../api_get";

/* ============ STAKE ============ */
export default function Staking (url) {
  function get(path) { return Get(url, path) }
  return {
    stakingTxs: async function (address, valAddress) {
      return Promise.all([
        get(
          `/txs?action=create_validator&destination-validator=${valAddress}`),
        get(
          `/txs?action=edit_validator&destination-validator=${valAddress}`),
        get(`/txs?action=delegate&delegator=${address}`),
        get(`/txs?action=begin_redelegate&delegator=${address}`),
        get(`/txs?action=begin_unbonding&delegator=${address}`),
        get(`/txs?action=unjail&source-validator=${valAddress}`)
      ]).then(([
        createValidatorTxs,
        editValidatorTxs,
        delegationTxs,
        redelegationTxs,
        undelegationTxs,
        unjailTxs
      ]) =>
        [].concat(
          createValidatorTxs,
          editValidatorTxs,
          delegationTxs,
          redelegationTxs,
          undelegationTxs,
          unjailTxs
        )
      )
    },
    // Get all delegations information from a delegator
    delegations: function (addr) {
      return get(`/staking/delegators/${addr}/delegations`)
    },
    undelegations: function (addr) {
      return get(
        `/staking/delegators/${addr}/unbonding_delegations`,
        true
      )
    },
    redelegations: function (addr) {
      return get(`/staking/redelegations?delegator=${addr}`)
    },
    // Query all validators that a delegator is bonded to
    delegatorValidators: function (delegatorAddr) {
      return get(`/staking/delegators/${delegatorAddr}/validators`)
    },
    // Get a list containing all the validator candidates
    validators: () => Promise.all([
      get(`/staking/validators?status=unbonding`),
      get(`/staking/validators?status=bonded`),
      get(`/staking/validators?status=unbonded`)
    ]).then((validatorGroups) =>
      [].concat(...validatorGroups)
    ),
    // Get information from a validator
    validator: function (addr) {
      return get(`/staking/validators/${addr}`)
    },

    // Get the list of the validators in the latest validator set
    validatorSet: () => get(`/validatorsets/latest`),

    // Query a delegation between a delegator and a validator
    delegation: function (delegatorAddr, validatorAddr) {
      return get(

        `/staking/delegators/${delegatorAddr}/delegations/${validatorAddr}`,
        true
      )
    },
    unbondingDelegation: function (delegatorAddr, validatorAddr) {
      return get(

        `/staking/delegators/${delegatorAddr}/unbonding_delegations/${validatorAddr}`,
        true
      )
    },
    pool: () => get(`/staking/pool`),
    stakingParameters: () => get(`/staking/parameters`),

  }
}