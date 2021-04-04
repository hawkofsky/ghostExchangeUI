import Web3 from 'web3'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
const ERC20ABI = require('../ghost/lib/abi/bep20.json')

export const getContract = (provider: provider, address: string) => {
  if (address === '0x0000000000000000000000000000000000000000') {
    return null
  }
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(ERC20ABI, address)
  return contract
}

export const getAllowance = async (
  contract: Contract,
  owner: string,
  spender: string,
): Promise<string> => {
  try {
    const allowance: string = await contract.methods
      .allowance(owner, spender)
      .call()
    return allowance
  } catch (e) {
    return '0'
  }
}

export const getBalance = async (
  provider: provider,
  tokenAddress: string,
  userAddress: string,
): Promise<string> => {
  if (tokenAddress === '0x0000000000000000000000000000000000000000') {
    const web3 = new Web3(provider)
    const balance: string = await web3.eth.getBalance(userAddress)
    return balance
  }
  const lpContract = getContract(provider, tokenAddress)
  try {
    const balance: string = await lpContract.methods
      .balanceOf(userAddress)
      .call()
    return balance
  } catch (e) {
    return '0'
  }
}
