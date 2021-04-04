import BigNumber from 'bignumber.js/bignumber'
import BEP20Abi from './abi/bep20.json'
import KingGhostAbi from './abi/kingghost.json'
import XGhostAbi from './abi/xghost.json'
import GhostAbi from './abi/ghost.json'
import UNIV2PairAbi from './abi/uni_v2_lp.json'
import WBNBAbi from './abi/wbnb.json'
import GhostRouteAbi from './abi/GhostRoute.json'
import {
  contractAddresses,
  SUBTRACT_GAS_LIMIT,
  supportedPools,
  supportedRoutes,
} from './constants.js'
import * as Types from './types.js'

export class Contracts {
  constructor(provider, networkId, web3, options) {
    this.web3 = web3
    this.defaultConfirmations = options.defaultConfirmations
    this.autoGasMultiplier = options.autoGasMultiplier || 1.5
    this.confirmationType =
      options.confirmationType || Types.ConfirmationType.Confirmed
    this.defaultGas = options.defaultGas
    this.defaultGasPrice = options.defaultGasPrice

    this.ghost = new this.web3.eth.Contract(GhostAbi)
    this.kingGhost = new this.web3.eth.Contract(KingGhostAbi)
    this.xGhostStaking = new this.web3.eth.Contract(XGhostAbi)
    this.ghostRoute = new this.web3.eth.Contract(GhostRouteAbi)
    this.wbnb = new this.web3.eth.Contract(WBNBAbi)
    this.busd = new this.web3.eth.Contract(BEP20Abi)
    this.eth = new this.web3.eth.Contract(BEP20Abi)
    this.ust = new this.web3.eth.Contract(BEP20Abi)

    this.pools = supportedPools.map((pool) =>
      Object.assign(pool, {
        lpAddress: pool.lpAddresses[networkId],
        tokenAddress: pool.tokenAddresses[networkId],
        lpContract: new this.web3.eth.Contract(UNIV2PairAbi),
        tokenContract: new this.web3.eth.Contract(BEP20Abi),
      }),
    )
    this.routes = supportedRoutes
    this.networkId = networkId
    this.setProvider(provider, networkId)
    this.setDefaultAccount(this.web3.eth.defaultAccount)

    this.extraContracts = {
      wbnb: this.wbnb,
      busd: this.busd,
      eth: this.eth,
      ust: this.ust,
    }
  }

  setProvider(provider, networkId) {
    const setProvider = (contract, address) => {
      contract.setProvider(provider)
      if (address) contract.options.address = address
      else console.error('Contract address not found in network', networkId)
    }

    setProvider(this.ghost, contractAddresses.ghost[networkId])
    setProvider(this.kingGhost, contractAddresses.kingGhost[networkId])
    setProvider(this.xGhostStaking, contractAddresses.xGhost[networkId])
    setProvider(this.wbnb, contractAddresses.wbnb[networkId])
    setProvider(this.busd, contractAddresses.busd[networkId])
    setProvider(this.eth, contractAddresses.eth[networkId])
    setProvider(this.ust, contractAddresses.ust[networkId])

    this.pools.forEach(
      ({ lpContract, lpAddress, tokenContract, tokenAddress }) => {
        setProvider(lpContract, lpAddress)
        setProvider(tokenContract, tokenAddress)
      },
    )

    for (let currency of Object.keys(this.routes)) {
      for (let amount of Object.keys(this.routes[currency].routes)) {
        const address = this.routes[currency].routes[amount][networkId]
        const tokenAddress = this.routes[currency].addresses[networkId]
        this.routes[currency].routes[
          amount
        ].contract = new this.web3.eth.Contract(GhostRouteAbi, address)
        this.routes[currency].routes[
          amount
        ].contract = new this.web3.eth.Contract(GhostRouteAbi, address)
        this.routes[currency].routes[amount].address = address
        if (currency !== 'BNB') {
          this.routes[currency].routes[
            amount
          ].tokenContract = new this.web3.eth.Contract(BEP20Abi, tokenAddress)
          this.routes[currency].routes[amount].tokenAddress = tokenAddress
        }
      }
    }
  }

  setDefaultAccount(account) {
    this.ghost.options.from = account
    this.kingGhost.options.from = account
  }

  async callContractFunction(method, options) {
    const {
      confirmations,
      confirmationType,
      autoGasMultiplier,
      ...txOptions
    } = options

    if (!this.blockGasLimit) {
      await this.setGasLimit()
    }

    if (!txOptions.gasPrice && this.defaultGasPrice) {
      txOptions.gasPrice = this.defaultGasPrice
    }

    if (confirmationType === Types.ConfirmationType.Simulate || !options.gas) {
      let gasEstimate
      if (
        this.defaultGas &&
        confirmationType !== Types.ConfirmationType.Simulate
      ) {
        txOptions.gas = this.defaultGas
      } else {
        try {
          console.log('estimating gas')
          gasEstimate = await method.estimateGas(txOptions)
        } catch (error) {
          const data = method.encodeABI()
          const { from, value } = options
          const to = method._parent._address
          error.transactionData = { from, value, data, to }
          throw error
        }

        const multiplier = autoGasMultiplier || this.autoGasMultiplier
        const totalGas = Math.floor(gasEstimate * multiplier)
        txOptions.gas =
          totalGas < this.blockGasLimit ? totalGas : this.blockGasLimit
      }

      if (confirmationType === Types.ConfirmationType.Simulate) {
        let g = txOptions.gas
        return { gasEstimate, g }
      }
    }

    if (txOptions.value) {
      txOptions.value = new BigNumber(txOptions.value).toFixed(0)
    } else {
      txOptions.value = '0'
    }

    const promi = method.send(txOptions)

    const OUTCOMES = {
      INITIAL: 0,
      RESOLVED: 1,
      REJECTED: 2,
    }

    let hashOutcome = OUTCOMES.INITIAL
    let confirmationOutcome = OUTCOMES.INITIAL

    const t =
      confirmationType !== undefined ? confirmationType : this.confirmationType

    if (!Object.values(Types.ConfirmationType).includes(t)) {
      throw new Error(`Invalid confirmation type: ${t}`)
    }

    let hashPromise
    let confirmationPromise

    if (
      t === Types.ConfirmationType.Hash ||
      t === Types.ConfirmationType.Both
    ) {
      hashPromise = new Promise((resolve, reject) => {
        promi.on('error', (error) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.REJECTED
            reject(error)
            const anyPromi = promi
            anyPromi.off()
          }
        })

        promi.on('transactionHash', (txHash) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.RESOLVED
            resolve(txHash)
            if (t !== Types.ConfirmationType.Both) {
              const anyPromi = promi
              anyPromi.off()
            }
          }
        })
      })
    }

    if (
      t === Types.ConfirmationType.Confirmed ||
      t === Types.ConfirmationType.Both
    ) {
      confirmationPromise = new Promise((resolve, reject) => {
        promi.on('error', (error) => {
          if (
            (t === Types.ConfirmationType.Confirmed ||
              hashOutcome === OUTCOMES.RESOLVED) &&
            confirmationOutcome === OUTCOMES.INITIAL
          ) {
            confirmationOutcome = OUTCOMES.REJECTED
            reject(error)
            const anyPromi = promi
            anyPromi.off()
          }
        })

        const desiredConf = confirmations || this.defaultConfirmations
        if (desiredConf) {
          promi.on('confirmation', (confNumber, receipt) => {
            if (confNumber >= desiredConf) {
              if (confirmationOutcome === OUTCOMES.INITIAL) {
                confirmationOutcome = OUTCOMES.RESOLVED
                resolve(receipt)
                const anyPromi = promi
                anyPromi.off()
              }
            }
          })
        } else {
          promi.on('receipt', (receipt) => {
            confirmationOutcome = OUTCOMES.RESOLVED
            resolve(receipt)
            const anyPromi = promi
            anyPromi.off()
          })
        }
      })
    }

    if (t === Types.ConfirmationType.Hash) {
      const transactionHash = await hashPromise
      if (this.notifier) {
        this.notifier.hash(transactionHash)
      }
      return { transactionHash }
    }

    if (t === Types.ConfirmationType.Confirmed) {
      return confirmationPromise
    }

    const transactionHash = await hashPromise
    if (this.notifier) {
      this.notifier.hash(transactionHash)
    }
    return {
      transactionHash,
      confirmation: confirmationPromise,
    }
  }

  async callConstantContractFunction(method, options) {
    const m2 = method
    const { blockNumber, ...txOptions } = options
    return m2.call(txOptions, blockNumber)
  }

  async setGasLimit() {
    const block = await this.web3.eth.getBlock('latest')
    this.blockGasLimit = block.gasLimit - SUBTRACT_GAS_LIMIT
  }
}
