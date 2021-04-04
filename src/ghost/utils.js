import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import axios from 'axios'
import { contractAddresses } from './lib/constants'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const getKingGhostAddress = (ghost) => {
  return ghost && ghost.kingGhostAddress
}
export const getGhostAddress = (ghost) => {
  return ghost && ghost.ghostAddress
}
export const getWbnbContract = (ghost) => {
  return ghost && ghost.contracts && ghost.contracts.wbnb
}
export const getExtraContracts = (ghost) => {
  return ghost && ghost.contracts && ghost.contracts.extraContracts
}
export const getKingGhostContract = (ghost) => {
  return ghost && ghost.contracts && ghost.contracts.kingGhost
}
export const getGhostContract = (ghost) => {
  return ghost && ghost.contracts && ghost.contracts.ghost
}

export const getXGhostStakingContract = (ghost) => {
  return ghost && ghost.contracts && ghost.contracts.xGhostStaking
}

export const getGhostRoutes = (ghost) => {
  return ghost && ghost.contracts && ghost.contracts.routes
}

export const getFarms = (ghost) => {
  return ghost
    ? ghost.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
          quoteSymbol,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          quoteSymbol,
          earnToken: 'gomix',
          earnTokenAddress: ghost.contracts.ghost.options.address,
          icon,
        }),
      )
    : []
}

export const getPoolWeight = async (kingGhostContract, pid) => {
  const { allocPoint } = await kingGhostContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await kingGhostContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (kingGhostContract, pid, account) => {
  return kingGhostContract.methods.pendingCake(pid, account).call() // PENDING: fix
}

export const getTotalLPWbnbValue = async (
  kingGhostContract,
  extraContracts,
  lpContract,
  tokenContract,
  pid,
  quoteSymbol,
) => {
  const quoteContract =
    extraContracts[quoteSymbol ? quoteSymbol.toLowerCase() : 'wbnb']
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that kingGhostContract owns
  const balance = await lpContract.methods
    .balanceOf(kingGhostContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total wbnb value for the lpContract = w1
  const lpContractWbnb = await quoteContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWbnbWorth = new BigNumber(lpContractWbnb)
  const totalLpWbnbValue = portionLp.times(lpWbnbWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wbnbAmount = new BigNumber(lpContractWbnb)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    wbnbAmount,
    totalWbnbValue: totalLpWbnbValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWbnb: wbnbAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(kingGhostContract, pid),
    quoteSymbol: quoteSymbol ? quoteSymbol : 'WBNB',
  }
}

export const approve = async (lpContract, kingGhostContract, account) => {
  return lpContract.methods
    .approve(kingGhostContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const approveAddress = async (lpContract, address, account) => {
  return lpContract.methods
    .approve(address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getGhostSupply = async (ghost) => {
  return new BigNumber(await ghost.contracts.ghost.methods.totalSupply().call())
}

export const getXGhostSupply = async (ghost) => {
  return new BigNumber(
    await ghost.contracts.xGhostStaking.methods.totalSupply().call(),
  )
}

export const getTotalStakedGhostSupply = async (ghost) => {
  return new BigNumber(
    await ghost.contracts.ghost.methods
      .balanceOf(contractAddresses.xGhost[56])
      .call(),
  )
}

export const stake = async (kingGhostContract, pid, amount, account) => {
  return kingGhostContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (kingGhostContract, pid, amount, account) => {
  return kingGhostContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const harvest = async (kingGhostContract, pid, account) => {
  return kingGhostContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (kingGhostContract, pid, account) => {
  try {
    const { amount } = await kingGhostContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (kingGhostContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return kingGhostContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const enter = async (contract, amount, account) => {
  return contract.methods
    .enter(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const leave = async (contract, amount, account) => {
  return contract.methods
    .leave(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

const circomlib = require('circomlib')
const snarkjs = require('snarkjs')
const bigInt = snarkjs.bigInt
const crypto = require('crypto')
const merkleTree = require('./lib/circuit/MerkleTree')
const websnarkUtils = require('websnark/src/utils')
const buildGroth16 = require('websnark/src/groth16')
const circuit = require('./lib/circuit/withdraw.json')

const rbigint = (nbytes) =>
  snarkjs.bigInt.leBuff2int(crypto.randomBytes(nbytes))

const pedersenHash = (data) =>
  circomlib.babyJub.unpackPoint(circomlib.pedersenHash.hash(data))[0]

function toHex(number, length = 32) {
  const str =
    number instanceof Buffer
      ? number.toString('hex')
      : bigInt(number).toString(16)
  return '0x' + str.padStart(length * 2, '0')
}
const MERKLE_TREE_HEIGHT = 20
function createDeposit({ nullifier, secret }) {
  const deposit = { nullifier, secret }
  deposit.preimage = Buffer.concat([
    deposit.nullifier.leInt2Buff(31),
    deposit.secret.leInt2Buff(31),
  ])
  deposit.commitment = pedersenHash(deposit.preimage)
  deposit.commitmentHex = toHex(deposit.commitment)
  deposit.nullifierHash = pedersenHash(deposit.nullifier.leInt2Buff(31))
  deposit.nullifierHex = toHex(deposit.nullifierHash)
  return deposit
}

export const generatePrivateNote = (currency, amount, netId) => {
  const deposit = createDeposit({
    nullifier: rbigint(31),
    secret: rbigint(31),
  })
  const note = toHex(deposit.preimage, 62)
  const noteString = `ghostRoute-${currency.toLowerCase()}-${amount}-${netId}-${note}`

  const randomBuffer = crypto.randomBytes(4)
  const fileName = `backup-ghostRoute-${currency.toLowerCase()}-${amount}-${netId}-${toHex(
    randomBuffer,
    2,
  )}.txt`
  return {
    notes: noteString,
    deposit,
    fileName,
  }
}

export const depositToRoute = async (
  routes,
  deposit,
  currency,
  amount,
  account,
) => {
  const routeDetails = routes.routes[amount]
  const amountBN = new BigNumber(amount).times(
    new BigNumber(10).pow(routes.decimals),
  )

  const contract = routeDetails.contract
  if (currency === 'BNB') {
    return contract.methods
      .deposit(toHex(deposit.commitment))
      .send({ value: amountBN, from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    const allowance = await routeDetails.tokenContract.methods
      .allowance(account, routeDetails.address)
      .call()
    if (new BigNumber(allowance).lt(amountBN)) {
      console.log('Approving tokens for deposit')
      await routeDetails.tokenContract.methods
        .approve(
          routeDetails.address,
          // amountBN,
          '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        )
        .send({ from: account })
    }
    console.log('Submitting deposit transaction')
    return await routeDetails.contract.methods
      .deposit(toHex(deposit.commitment))
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  }
}

export const withdrawFromRoute = async (
  routes,
  amount,
  proof,
  args,
  account,
) => {
  const routeDetails = routes.routes[amount]
  const contract = routeDetails.contract
  return contract.methods
    .withdraw(proof, ...args)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

function parseNote(noteString) {
  const noteRegex = /ghostRoute-(?<currency>\w+)-(?<amount>[\d.]+)-(?<netId>\d+)-0x(?<note>[0-9a-fA-F]{124})/g
  const match = noteRegex.exec(noteString)
  if (!match) {
    throw new Error('The note has invalid format')
  }

  const buf = Buffer.from(match.groups.note, 'hex')
  const nullifier = bigInt.leBuff2int(buf.slice(0, 31))
  const secret = bigInt.leBuff2int(buf.slice(31, 62))
  const deposit = createDeposit({ nullifier, secret })
  const netId = Number(match.groups.netId)

  return {
    currency: match.groups.currency,
    amount: match.groups.amount,
    netId,
    deposit,
  }
}

async function generateMerkleProof(routes, deposit, amount) {
  // Get all deposit events from smart contract and assemble merkle tree from them
  const routeDetails = routes.routes[amount]
  const ghostRoute = routeDetails.contract
  console.log('Getting current state from ghostRoute contract')
  const events = await ghostRoute.getPastEvents('Deposit', {
    fromBlock: 0,
    toBlock: 'latest',
  })
  const leaves = events
    .sort((a, b) => a.returnValues.leafIndex - b.returnValues.leafIndex) // Sort events in chronological order
    .map((e) => e.returnValues.commitment)
  const tree = new merkleTree(MERKLE_TREE_HEIGHT, leaves)

  // Find current commitment in the tree
  const depositEvent = events.find(
    (e) => e.returnValues.commitment === toHex(deposit.commitment),
  )
  const leafIndex = depositEvent ? depositEvent.returnValues.leafIndex : -1

  // Validate that our data is correct
  const root = await tree.root()
  const isValidRoot = await ghostRoute.methods.isKnownRoot(toHex(root)).call()
  const isSpent = await ghostRoute.methods
    .isSpent(toHex(deposit.nullifierHash))
    .call()
  if (!isValidRoot) {
    throw new Error('Merkle tree is corrupted')
  }
  if (isSpent) {
    throw new Error('The note is already spent')
  }
  if (leafIndex < 0) {
    throw new Error('The note is already spent')
  }
  // Compute merkle proof of our commitment
  return tree.path(leafIndex)
}

async function generateProof({
  routes,
  deposit,
  amount,
  recipient = 0,
  relayerAddress = 0,
  fee = 0,
  refund = 0,
}) {
  // Compute merkle proof of our commitment
  const { root, path_elements, path_index } = await generateMerkleProof(
    routes,
    deposit,
    amount,
  )

  // Prepare circuit input
  const input = {
    // Public snark inputs
    root: root,
    nullifierHash: deposit.nullifierHash,
    recipient: bigInt(recipient),
    relayer: bigInt(relayerAddress),
    fee: bigInt(fee),
    refund: bigInt(refund),

    // Private snark inputs
    nullifier: deposit.nullifier,
    secret: deposit.secret,
    pathElements: path_elements,
    pathIndices: path_index,
  }

  console.log('Generating SNARK proof')
  console.time('Proof time')
  const groth16 = await buildGroth16()
  let proving_key = await (
    await fetch('/circuits/withdraw_proving_key.bin')
  ).arrayBuffer()
  console.log(proving_key)
  const proofData = await websnarkUtils.genWitnessAndProve(
    groth16,
    input,
    circuit,
    proving_key,
  )
  const { proof } = websnarkUtils.toSolidityInput(proofData)
  console.timeEnd('Proof time')

  const args = [
    toHex(input.root),
    toHex(input.nullifierHash),
    toHex(input.recipient, 20),
    toHex(input.relayer, 20),
    toHex(input.fee),
    toHex(input.refund),
  ]

  return { proof, args }
}

export const validateNotes = async (routes, notes, _netId) => {
  try {
    const { currency, amount, netId, deposit } = parseNote(notes)
    if (_netId !== netId) {
      return {
        valid: false,
        message: 'Invalid network',
      }
    }
    console.log(currency, amount)
    console.log(routes)
    await generateProof({
      routes: routes[currency.toUpperCase()],
      deposit,
      amount,
    })
    await generateMerkleProof(routes[currency.toUpperCase()], deposit, amount)
  } catch (err) {
    return {
      valid: false,
      message: err.message,
    }
  }
  return {
    valid: true,
  }
}

export const validateRecipient = async (routes, recipient) => {
  const regex = new RegExp('^0x[a-fA-F0-9]{40}$')
  const result = regex.test(recipient)
  if (result) {
    return {
      valid: true,
    }
  } else {
    return {
      valid: false,
      message: 'This is not a valid address.',
    }
  }
}

export const generateProofAndArgs = async (
  routes,
  notes,
  _netId,
  recipient,
) => {
  try {
    const { currency, amount, netId, deposit } = parseNote(notes)
    if (_netId !== netId) {
      return {
        valid: false,
        message: 'Invalid network',
      }
    }
    const { proof, args } = await generateProof({
      routes: routes[currency.toUpperCase()],
      deposit,
      amount,
      recipient,
    })
    return {
      valid: true,
      currency,
      amount,
      proof,
      args,
    }
  } catch (err) {
    return {
      valid: false,
      message: err.message,
    }
  }
}

const apiUrl = 'https://beta.ghostmixer.io/api'
export const withdrawFunds = async (notes, recipient) => {
  try {
    const res = await axios.post(
      `${apiUrl}/withdraw`,
      {
        notes,
        recipient,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const success = res.data.success
    if (success) {
      const hash = res.data.tx.transactionHash
      return {
        success,
        hash,
      }
    } else {
      const error = res.data.error
      return {
        success,
        error,
      }
    }
  } catch (err) {
    throw err
  }
}

export const getStatsData = async (currency, amount) => {
  try {
    const res = await axios.get(
      `${apiUrl}/fetch?currency=${currency}&amount=${amount}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return res.data
  } catch (err) {
    throw err
  }
}
