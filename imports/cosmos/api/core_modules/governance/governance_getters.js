/* ============ Governance ============ */
export default function Governance () {
  function get(path) { return path }
  return {
    proposals: () => get(`/gov/proposals`),
    proposal: function (proposalId) {
      return get(`/gov/proposals/${proposalId}`)
    },
    proposalVotes: function (proposalId) {
      return get(`/gov/proposals/${proposalId}/votes`)
    },
    proposalVote: function (proposalId, address) {
      return get(`/gov/proposals/${proposalId}/votes/${address}`)
    },
    proposalDeposits: function (proposalId) {
      return get(`/gov/proposals/${proposalId}/deposits`)
    },
    proposalDeposit: function (proposalId, address) {
      return get(

        `/gov/proposals/${proposalId}/deposits/${address}`,
        true
      )
    },
    proposalTally: function (proposalId) {
      return get(`/gov/proposals/${proposalId}/tally`)
    },
    govDepositParameters: () => get(`/gov/parameters/deposit`),
    govTallyingParameters: () => get(`/gov/parameters/tallying`),
    govVotingParameters: () => get(`/gov/parameters/voting`),
    governanceTxs: async function (address) {
      return Promise.all([
        get(`/txs?action=submit_proposal&proposer=${address}`),
        get(`/txs?action=deposit&depositor=${address}`),
        get(`/txs?action=vote&voter=${address}`)
      ]).then(([submitProposalTxs, depositTxs, voteTxs]) =>
        [].concat(submitProposalTxs, depositTxs, voteTxs)
      )
    },
  }
}
