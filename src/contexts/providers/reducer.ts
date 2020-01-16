export enum AppActions {
  ResizeWindow = 'resizeWindow',
  UpdateLoading = 'updateLoading',
  UpdateSecondLoading = 'updateSecondLoading',
  UpdateModal = 'updateModal',
  ShowToastMessage = 'showToastMessage',
  UpdateAppErrors = 'updateAppErrors',
  UpdateNodeVersion = 'updateNodeVersion',
  UpdateTipBlockNumber = 'updateTipBlockNumber',
  UpdateAppLanguage = 'updateAppLanguage',
}

export enum PageActions {
  UpdateAddress = 'updateAddress',
  UpdateAddressTransactions = 'updateAddressTransactions',
  UpdateAddressTotal = 'updateAddressTotal',
  UpdateAddressStatus = 'updateAddressStatus',
  UpdateAddressTransactionsStatus = 'updateAddressTransactionsStatus',

  UpdateHomeBlocks = 'updateHomeBlocks',

  UpdateBlockList = 'updateBlockList',
  UpdateBlockListTotal = 'updateBlockListTotal',

  UpdateBlock = 'updateBlock',
  UpdateBlockTransactions = 'updateBlockTransactions',
  UpdateBlockTotal = 'updateBlockTotal',
  UpdateBlockStatus = 'updateBlockStatus',

  UpdateTransaction = 'updateTransaction',
  UpdateTransactionStatus = 'updateTransactionStatus',
  UpdateTransactions = 'updateTransactions',
  UpdateTransactionsTotal = 'updateTransactionsTotal',

  UpdateStatistics = 'updateStatistics',

  UpdateStatisticsChartData = 'updateStatisticsChartData',
  UpdateStatisticsUncleRate = 'updateStatisticsUncleRate',

  UpdateStatisticDifficultyHashRate = 'updateStatisticDifficultyHashRate',
  UpdateStatisticDifficultyUncleRate = 'updateStatisticDifficultyUncleRate',
  UpdateStatisticDifficultyHashRateUncleRate = 'updateStatisticDifficultyHashRateUncleRate',
  UpdateStatisticTransactionCount = 'updateStatisticTransactionCount',
  UpdateStatisticAddressCount = 'updateStatisticAddressCount',
  UpdateStatisticTotalDaoDeposit = 'updateStatisticTotalDaoDeposit',
  UpdateStatisticCellCount = 'updateStatisticCellCount',
  UpdateStatisticAddressBalanceRank = 'updateStatisticAddressBalanceRank',

  UpdateNervosDao = 'updateNervosDao',
  UpdateNervosDaoTransactions = 'updateNervosDaoTransactions',
  UpdateNervosDaoTransactionsTotal = 'updateNervosDaoTransactionsTotal',
  UpdateNervosDaoDepositors = 'updateNervosDaoDepositors',
  UpdateNervosDaoStatus = 'updateNervosDaoStatus',
}

export enum ComponentActions {
  UpdateHeaderSearchEditable = 'updateHeaderSearchEditable',
}

export type StateActions = AppActions | PageActions | ComponentActions

export type AppDispatch = React.Dispatch<{ type: StateActions; payload: any }> // TODO: add type of payload
export type StateWithDispatch = State.AppState & { dispatch: AppDispatch }

export const reducer = (
  state: State.AppState,
  { type, payload }: { type: StateActions; payload: any },
): State.AppState => {
  switch (type) {
    case AppActions.ResizeWindow:
      return {
        ...state,
        app: {
          ...state.app,
          appWidth: payload.appWidth,
          appHeight: payload.appHeight,
        },
      }
    case AppActions.UpdateLoading:
      return {
        ...state,
        app: {
          ...state.app,
          loading: payload.loading,
        },
      }
    case AppActions.UpdateSecondLoading:
      return {
        ...state,
        app: {
          ...state.app,
          secondLoading: payload.secondLoading,
        },
      }
    case AppActions.UpdateModal:
      return {
        ...state,
        app: {
          ...state.app,
        },
      }
    case AppActions.ShowToastMessage:
      return {
        ...state,
        app: {
          ...state.app,
          toast: {
            id: new Date().getTime(),
            message: payload.message,
            type: payload.type,
            duration: payload.duration,
          },
        },
      }
    case AppActions.UpdateAppErrors:
      return {
        ...state,
        app: {
          ...state.app,
          appErrors: state.app.appErrors.map((error: State.AppError) => {
            if (payload.appError.type === error.type) {
              return payload.appError
            }
            return error
          }) as typeof state.app.appErrors,
        },
      }
    case AppActions.UpdateNodeVersion:
      return {
        ...state,
        app: {
          ...state.app,
          nodeVersion: payload.nodeVersion,
        },
      }
    case AppActions.UpdateTipBlockNumber:
      return {
        ...state,
        app: {
          ...state.app,
          tipBlockNumber: payload.tipBlockNumber,
        },
      }
    case AppActions.UpdateAppLanguage:
      return {
        ...state,
        app: {
          ...state.app,
          language: payload.language,
        },
      }

    // PageActions
    case PageActions.UpdateHomeBlocks:
      return {
        ...state,
        homeBlocks: payload.homeBlocks,
      }

    case PageActions.UpdateBlockList:
      return {
        ...state,
        blockListState: {
          ...state.blockListState,
          blocks: payload.blocks,
        },
      }
    case PageActions.UpdateBlockListTotal:
      return {
        ...state,
        blockListState: {
          ...state.blockListState,
          total: payload.total,
        },
      }

    case PageActions.UpdateAddress:
      return {
        ...state,
        addressState: {
          ...state.addressState,
          address: payload.address,
        },
      }
    case PageActions.UpdateAddressTransactions:
      return {
        ...state,
        addressState: {
          ...state.addressState,
          transactions: payload.transactions,
        },
      }
    case PageActions.UpdateAddressTotal:
      return {
        ...state,
        addressState: {
          ...state.addressState,
          total: payload.total,
        },
      }
    case PageActions.UpdateAddressStatus:
      return {
        ...state,
        addressState: {
          ...state.addressState,
          addressStatus: payload.addressStatus,
        },
      }
    case PageActions.UpdateAddressTransactionsStatus:
      return {
        ...state,
        addressState: {
          ...state.addressState,
          transactionsStatus: payload.transactionsStatus,
        },
      }

    case PageActions.UpdateBlock:
      return {
        ...state,
        blockState: {
          ...state.blockState,
          block: payload.block,
        },
      }
    case PageActions.UpdateBlockTransactions:
      return {
        ...state,
        blockState: {
          ...state.blockState,
          transactions: payload.transactions,
        },
      }
    case PageActions.UpdateBlockTotal:
      return {
        ...state,
        blockState: {
          ...state.blockState,
          total: payload.total,
        },
      }
    case PageActions.UpdateBlockStatus:
      return {
        ...state,
        blockState: {
          ...state.blockState,
          status: payload.status,
        },
      }

    case PageActions.UpdateTransaction:
      return {
        ...state,
        transactionState: {
          ...state.transactionState,
          transaction: payload.transaction,
        },
      }
    case PageActions.UpdateTransactionStatus:
      return {
        ...state,
        transactionState: {
          ...state.transactionState,
          status: payload.status,
        },
      }
    case PageActions.UpdateTransactions:
      return {
        ...state,
        transactionsState: {
          ...state.transactionsState,
          transactions: payload.transactions,
        },
      }
    case PageActions.UpdateTransactionsTotal:
      return {
        ...state,
        transactionsState: {
          ...state.transactionsState,
          total: payload.total,
        },
      }

    case PageActions.UpdateStatistics:
      return {
        ...state,
        statistics: payload.statistics,
      }
    case PageActions.UpdateStatisticsChartData:
      return {
        ...state,
        statisticsChartData: payload.statisticsChartData,
      }
    case PageActions.UpdateStatisticsUncleRate:
      return {
        ...state,
        statisticsUncleRates: payload.statisticsUncleRates,
      }
    case PageActions.UpdateStatisticDifficultyHashRate:
      return {
        ...state,
        statisticDifficultyHashRates: payload.statisticDifficultyHashRates,
      }
    case PageActions.UpdateStatisticDifficultyUncleRate:
      return {
        ...state,
        statisticDifficultyUncleRates: payload.statisticDifficultyUncleRates,
      }
    case PageActions.UpdateStatisticDifficultyHashRateUncleRate:
      return {
        ...state,
        statisticDifficultyHashRateUncleRates: payload.statisticDifficultyHashRateUncleRates,
      }
    case PageActions.UpdateStatisticTransactionCount:
      return {
        ...state,
        statisticTransactionCounts: payload.statisticTransactionCounts,
      }
    case PageActions.UpdateStatisticAddressCount:
      return {
        ...state,
        statisticAddressCounts: payload.statisticAddressCounts,
      }
    case PageActions.UpdateStatisticTotalDaoDeposit:
      return {
        ...state,
        statisticTotalDaoDeposits: payload.statisticTotalDaoDeposits,
      }
    case PageActions.UpdateStatisticCellCount:
      return {
        ...state,
        statisticCellCounts: payload.statisticCellCounts,
      }
    case PageActions.UpdateStatisticAddressBalanceRank:
      return {
        ...state,
        statisticAddressBalanceRanks: payload.statisticAddressBalanceRanks,
      }

    case PageActions.UpdateNervosDao:
      return {
        ...state,
        nervosDaoState: {
          ...state.nervosDaoState,
          nervosDao: payload.nervosDao,
        },
      }
    case PageActions.UpdateNervosDaoTransactions:
      return {
        ...state,
        nervosDaoState: {
          ...state.nervosDaoState,
          transactions: payload.transactions,
        },
      }
    case PageActions.UpdateNervosDaoTransactionsTotal:
      return {
        ...state,
        nervosDaoState: {
          ...state.nervosDaoState,
          total: payload.total,
        },
      }
    case PageActions.UpdateNervosDaoDepositors:
      return {
        ...state,
        nervosDaoState: {
          ...state.nervosDaoState,
          depositors: payload.depositors,
        },
      }
    case PageActions.UpdateNervosDaoStatus:
      return {
        ...state,
        nervosDaoState: {
          ...state.nervosDaoState,
          status: payload.status,
        },
      }

    case ComponentActions.UpdateHeaderSearchEditable:
      return {
        ...state,
        components: {
          searchBarEditable: payload.searchBarEditable,
        },
      }
    default:
      return state
  }
}
