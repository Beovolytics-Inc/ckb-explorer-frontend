import initApp from './app'
import initAddressState from './address'
import { initBlockState, initBlockListState } from './block'
import initStatistics from './statistics'
import { initTransactionState, initTransactionsState } from './transaction'
import initComponents from './components'
import initNervosDaoState from './nervosDao'

export type FetchStatus = keyof State.FetchStatus

const initState: State.AppState = {
  app: initApp,
  blockState: initBlockState,
  blockListState: initBlockListState,
  addressState: initAddressState,
  transactionState: initTransactionState,
  transactionsState: initTransactionsState,
  statistics: initStatistics,

  statisticDifficultyHashRates: [],
  statisticHashRates: [],
  statisticUncleRates: [],
  statisticDifficulties: [],
  statisticAddressCounts: [],
  statisticCellCounts: [],
  statisticDifficultyUncleRates: [],
  statisticTotalDaoDeposits: [],
  statisticTransactionCounts: [],
  statisticAddressBalanceRanks: [],

  homeBlocks: [],
  nervosDaoState: initNervosDaoState,

  components: initComponents,
}

export default initState
