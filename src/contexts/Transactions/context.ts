import { createContext } from 'react'
import { Transaction, TransactionsMap } from './types'

interface TransactionsContext {
  transactions: TransactionsMap
  statsData: Array<object>
  onAddTransaction: (tx: Transaction) => void
  onSetStatsData: (currency : string, amount : string) => void
}

export default createContext<TransactionsContext>({
  transactions: {},
  statsData: [],
  onAddTransaction: (tx: Transaction) => {},
  onSetStatsData: (currency : string, amount : string) => {}
})
