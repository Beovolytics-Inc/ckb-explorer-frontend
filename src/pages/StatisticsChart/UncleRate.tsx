import React, { useEffect } from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import Content from '../../components/Content'
import { getStatisticUncleRate } from '../../service/app/statisticsChart'
import i18n from '../../utils/i18n'
import Loading from '../../components/Loading'
import { handleAxis } from '../../utils/chart'
import { ChartTitle, ChartPanel, LoadingPanel, ChartCardLoadingPanel } from './styled'
import { parseDateNoTime } from '../../utils/date'
import { isMobile } from '../../utils/screen'
import SmallLoading from '../../components/Loading/SmallLoading'
import { useAppState, useDispatch } from '../../contexts/providers'

const colors = ['#3182bd']

const gridThumbnail = {
  left: '4%',
  right: '10%',
  top: '8%',
  bottom: '6%',
  containLabel: true,
}
const grid = {
  left: '3%',
  right: '4%',
  bottom: '5%',
  containLabel: true,
}

const getOption = (statisticUncleRates: State.StatisticUncleRate[], isThumbnail = false) => {
  return {
    color: colors,
    tooltip: !isThumbnail && {
      trigger: 'axis',
      formatter: (dataList: any[]) => {
        const colorSpan = (color: string) =>
          `<span style="display:inline-block;margin-right:8px;margin-left:5px;margin-bottom:2px;border-radius:10px;width:6px;height:6px;background-color:${color}"></span>`
        const widthSpan = (value: string) => `<span style="width:80px;display:inline-block;">${value}:</span>`
        let result = `<div>${colorSpan('#333333')}${widthSpan(i18n.t('statistic.date'))} ${parseDateNoTime(
          dataList[0].name,
        )}</div>`
        result += `<div>${colorSpan(colors[0])}${widthSpan(i18n.t('block.uncle_rate'))} ${handleAxis(
          dataList[0].data,
        )}</div>`
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
        data: statisticUncleRates.map(data => data.createdAtUnixtimestamp),
        axisLabel: {
          formatter: (value: string) => parseDateNoTime(value),
        },
      },
    ],
    yAxis: [
      {
        position: 'left',
        name: isMobile() || isThumbnail ? '' : i18n.t('block.uncle_rate'),
        type: 'value',
        scale: true,
        axisLine: {
          lineStyle: {
            color: colors[0],
          },
        },
        axisLabel: {
          formatter: (value: string) => `${value}%`,
        },
      },
    ],
    series: [
      {
        name: i18n.t('block.uncle_rate'),
        type: 'line',
        yAxisIndex: '0',
        symbol: isThumbnail ? 'none' : 'circle',
        symbolSize: 3,
        markLine: {
          symbol: 'none',
          data: [
            {
              name: i18n.t('block.uncle_rate_target'),
              yAxis: '2.5',
            },
          ],
          label: {
            formatter: (label: any) => `${label.data.value}%`,
          },
        },
        data: statisticUncleRates.map(data => (Number(data.uncleRate) * 100).toFixed(2)),
      },
    ],
  }
}

export const UncleRateChart = ({
  statisticUncleRates,
  isThumbnail = false,
}: {
  statisticUncleRates: State.StatisticUncleRate[]
  isThumbnail?: boolean
}) => {
  if (statisticUncleRates.length === 0) {
    return isThumbnail ? (
      <ChartCardLoadingPanel>
        <SmallLoading />
      </ChartCardLoadingPanel>
    ) : null
  }
  return (
    <ReactEchartsCore
      echarts={echarts}
      option={getOption(statisticUncleRates, isThumbnail)}
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
  const { statisticUncleRates = [] } = useAppState()

  useEffect(() => {
    getStatisticUncleRate(dispatch)
  }, [dispatch])

  return (
    <Content>
      <ChartTitle>{i18n.t('block.hash_rate')}</ChartTitle>
      {statisticUncleRates.length > 0 ? (
        <ChartPanel>
          <UncleRateChart statisticUncleRates={statisticUncleRates} />
        </ChartPanel>
      ) : (
        <LoadingPanel>
          <Loading show />
        </LoadingPanel>
      )}
    </Content>
  )
}
