import Get from "../../api_get";

export default function Distribution (url) {
  function get(path) { return Get(url, path) }
  return {
    distributionTxs: async function (address, valAddress) {
      return Promise.all([
        get(`/txs?action=set_withdraw_address&delegator=${address}`),
        get(`/txs?action=withdraw_delegator_reward&delegator=${address}`),
        get(`/txs?action=withdraw_validator_rewards_all&source-validator=${valAddress}`)
      ]).then(([
        updateWithdrawAddressTxs,
        withdrawDelegationRewardsTxs,
        withdrawValidatorCommissionTxs
      ]) =>
        [].concat(
          updateWithdrawAddressTxs,
          withdrawDelegationRewardsTxs,
          withdrawValidatorCommissionTxs
        )
      )
    },
    delegatorRewards: function (delegatorAddr) {
      return get(`/distribution/delegators/${delegatorAddr}/rewards`)
    },
    delegatorRewardsFromValidator: function (delegatorAddr, validatorAddr) {
      return get(

        `/distribution/delegators/${delegatorAddr}/rewards/${validatorAddr}`
      )
    },
    validatorDistributionInformation: function (validatorAddr) {
      return get(`/distribution/validators/${validatorAddr}`)
    },
    validatorRewards: function (validatorAddr) {
      return get(`/distribution/validators/${validatorAddr}/rewards`)
    },
    distributionParameters: function () {
      return get(`/distribution/parameters`)
    },
    distributionOutstandingRewards: function () {
      return get(`/distribution/outstanding_rewards`)
    }

  }
}
