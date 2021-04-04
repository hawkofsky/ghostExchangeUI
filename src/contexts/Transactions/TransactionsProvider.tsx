import React, { useCallback, useEffect, useReducer } from 'react'

import Context from './context'
import reducer, {
  initialState,
  setTransactions,
  addTransaction,
  setStatsData
} from './reducer'
import { Transaction, TransactionsMap } from './types'

import { getStatsData } from '../../ghost/utils';

const TransactionsProvider: React.FC = ({ children }) => {
  const [{ initialized, transactions, statsData }, dispatch] = useReducer(reducer, initialState)

  const handleAddTransaction = useCallback((tx: Transaction) => {
    dispatch(addTransaction(tx))
  }, [dispatch])

  const handleSetStatsData = useCallback(async (currency : string , amount : string) => {
    const data = await getStatsData(currency, amount);
    dispatch(setStatsData(data));
  }, [dispatch])

  const fetchTransactions = useCallback(async () => {
    try {
      const txsRaw = localStorage.getItem('transactions')
      const txs = JSON.parse(txsRaw) as TransactionsMap || {}
      dispatch(setTransactions(txs))
    } catch (e) {
      console.log(e)
    }
  }, [dispatch])

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('transactions', JSON.stringify(transactions))
    }
  }, [initialized, transactions])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <Context.Provider value={{
      transactions,
      statsData,
      onAddTransaction: handleAddTransaction,
      onSetStatsData: handleSetStatsData
    }}>
      {children}
    </Context.Provider>
  )
}

export default TransactionsProvider