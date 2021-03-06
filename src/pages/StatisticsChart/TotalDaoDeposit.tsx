import React, { useEffect } from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import BigNumber from 'bignumber.js'
import Content from '../../components/Content'
import { getStatisticTotalDaoDeposit } from '../../service/app/statisticsChart'
import { useAppState, useDispatch } from '../../contexts/providers'
import i18n from '../../utils/i18n'
import Loading from '../../components/Loading'
import SmallLoading from '../../components/Loading/SmallLoading'
import { handleAxis } from '../../utils/chart'
import { ChartTitle, ChartPanel, LoadingPanel, ChartCardLoadingPanel } from './styled'
import { parseDateNoTime } from '../../utils/date'
import { isMobile } from '../../utils/screen'
import { shannonToCkb } from '../../utils/util'

const colors = ['#3182bd', '#66CC99']

const gridThumbnail = {
  left: '4%',
  right: '10%',
  top: '8%',
  bottom: '6%',
  containLabel: true,
}
const grid = {
  left: '6%',
  right: '6.5%',
  bottom: '5%',
  containLabel: true,
}

const getOption = (statisticTotalDaoDeposits: State.StatisticTotalDaoDeposit[], isThumbnail = false) => {
  return {
    color: colors,
    tooltip: !isThumbnail && {
      trigger: 'axis',
      formatter: (dataList: any[]) => {
        const colorSpan = (color: string) =>
          `<span style="display:inline-block;margin-right:8px;margin-left:5px;margin-bottom:2px;border-radius:10px;width:6px;height:6px;background-color:${color}"></span>`
        const widthSpan = (value: string) => `<span style="width:185px;display:inline-block;">${value}:</span>`
        let result = `<div>${colorSpan('#333333')}${widthSpan(i18n.t('statistic.date'))} ${parseDateNoTime(
          dataList[0].name,
        )}</div>`
        if (dataList[0].data) {
          result += `<div>${colorSpan(colors[0])}${widthSpan(i18n.t('statistic.total_dao_deposit'))} ${handleAxis(
            dataList[0].data,
            2,
          )}</div>`
        }
        if (dataList[1].data) {
          result += `<div>${colorSpan(colors[1])}${widthSpan(i18n.t('statistic.total_dao_depositor'))} ${handleAxis(
            dataList[1].data,
            2,
            true,
          )}</div>`
        }
        return result
      },
    },
    grid: isThumbnail ? gridThumbnail : grid,
    xAxis: [
      {
        name: isMobile() || isThumbnail ? '' : i18n.t('statistic.date'),
        nameLocation: 'middle',
        nameGap: '30',
        type: 'category',
        boundaryGap: false,
        data: statisticTotalDaoDeposits.map(data => data.createdAtUnixtimestamp),
        axisLabel: {
          formatter: (value: string) => parseDateNoTime(value),
        },
      },
    ],
    yAxis: [
      {
        position: 'left',
        name: isMobile() || isThumbnail ? '' : i18n.t('statistic.total_dao_deposit'),
        type: 'value',
        scale: true,
        axisLine: {
          lineStyle: {
            color: colors[0],
          },
        },
        axisLabel: {
          formatter: (value: string) => `${handleAxis(value)}B`,
        },
      },
      {
        position: 'right',
        name: isMobile() || isThumbnail ? '' : i18n.t('statistic.total_dao_depositor'),
        type: 'value',
        scale: true,
        axisLine: {
          lineStyle: {
            color: colors[1],
          },
        },
        axisLabel: {
          formatter: (value: string) => `${handleAxis(new BigNumber(value))}`,
        },
      },
    ],
    series: [
      {
        name: i18n.t('statistic.total_dao_deposit'),
        type: 'line',
        yAxisIndex: '0',
        symbol: isThumbnail ? 'none' : 'circle',
        symbolSize: 3,
        data: statisticTotalDaoDeposits.map(data => new BigNumber(shannonToCkb(data.totalDaoDeposit)).toFixed(0)),
      },
      {
        name: i18n.t('statistic.total_dao_depositor'),
        type: 'line',
        yAxisIndex: '1',
        symbol: isThumbnail ? 'none' : 'circle',
        symbolSize: 3,
        data: statisticTotalDaoDeposits.map(data => new BigNumber(data.totalDepositorsCount).toNumber()),
      },
    ],
  }
}

export const TotalDaoDepositChart = ({
  statisticTotalDaoDeposits,
  isThumbnail = false,
}: {
  statisticTotalDaoDeposits: State.StatisticTotalDaoDeposit[]
  isThumbnail?: boolean
}) => {
  if (statisticTotalDaoDeposits.length === 0) {
    return isThumbnail ? (
      <ChartCardLoadingPanel>
        <SmallLoading />
      </ChartCardLoadingPanel>
    ) : null
  }
  return (
    <ReactEchartsCore
      echarts={echarts}
      option={getOption(statisticTotalDaoDeposits, isThumbnail)}
      notMerge
      lazyUpdate
      style={{
        height: isThumbnail ? '230px' : '70vh',
      }}
    />
  )
}

export default () => {
  const dispatch = useDispatch()
  const { statisticTotalDaoDeposits } = useAppState()

  useEffect(() => {
    getStatisticTotalDaoDeposit(dispatch)
  }, [dispatch])

  return (
    <Content>
      <ChartTitle>{i18n.t('statistic.total_dao_deposit_depositor')}</ChartTitle>
      {statisticTotalDaoDeposits.length > 0 ? (
        <ChartPanel>
          <TotalDaoDepositChart statisticTotalDaoDeposits={statisticTotalDaoDeposits} />
        </ChartPanel>
      ) : (
        <LoadingPanel>
          <Loading show />
        </LoadingPanel>
      )}
    </Content>
  )
}
