import Get from "../../api_get";

/* ============ Bank ============ */
export default function Bank (url) {
  // function get(path) { return path }
  function get(path) { return Get(url, path) }
  return {
    account: function (address) {
      const emptyAccount = {
        coins: [],
        sequence: `0`,
        account_number: `0`
      }
      return get(`/auth/accounts/${address}`)
        .then(res => {
          // HACK, hope for: https://github.com/cosmos/cosmos-sdk/issues/3885
          let account = res.value || emptyAccount
          if (res.type === `auth/DelayedVestingAccount`) {
            if (!account.BaseVestingAccount) {
              console.error(
                `SDK format of vesting accounts responses has changed`
              )
              return emptyAccount
            }
            account = Object.assign(
              {},
              account.BaseVestingAccount.BaseAccount,
              account.BaseVestingAccount
            )
            delete account.BaseAccount
            delete account.BaseVestingAccount
          }
          return account
        })
        .catch(err => {
          // if account not found, return null instead of throwing
          if (
            err.response &&
            (err.response.data.includes(`account bytes are empty`) ||
              err.response.data.includes(`failed to prove merkle proof`))
          ) {
            return emptyAccount
          }
          throw err
        })
    },
    txs: function (addr) {
      return Promise.all([
        this.bankTxs(addr),
        this.governanceTxs(addr),
        this.distributionTxs(addr),
        this.stakingTxs(addr)
      ]).then((txs) => [].concat(...txs))
    },
    bankTxs: function (addr) {
      return Promise.all([
        get(`/txs?sender=${addr}`),
        get(`/txs?recipient=${addr}`)
      ]).then(([senderTxs, recipientTxs]) => [].concat(senderTxs, recipientTxs))
    },
    txsByHeight: function (height) {
      return get(`/txs?tx.height=${height}`)
    },
    tx: hash => get(`/txs/${hash}`),

  }
}