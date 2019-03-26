import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ReactJson from 'react-json-view'
import Page from '../../components/Page'
import Header from '../../components/Header'
import Content from '../../components/Content'
import Footer from '../../components/Footer'
import {
  AddressContentPanel,
  AddressTitlePanel,
  AddressOverviewPanel,
  AddressCommonContent,
  AddressLabelItemPanel,
} from './index.css'
import CopyIcon from '../../asserts/copy.png'
import BalanceIcon from '../../asserts/address_balance.png'
import CellConsumedIcon from '../../asserts/address_cell_consumed.png'
import AddressScriptIcon from '../../asserts/address_script.png'
import TransactionsIcon from '../../asserts/address_transactions.png'
import { AddressData } from './mock'

const AddressTitle = ({ address }: { address: string }) => {
  return (
    <AddressTitlePanel>
      <div className="address__title">Address</div>
      <div className="address__content">
        <div>{address}</div>
        <img src={CopyIcon} alt="copy" />
      </div>
    </AddressTitlePanel>
  )
}

const AddressOverview = () => {
  return (
    <AddressOverviewPanel>
      <div>Overview</div>
      <span />
    </AddressOverviewPanel>
  )
}

const AddressCommonLabel = ({
  image,
  label,
  value,
  style,
}: {
  image: string
  label: string
  value: any
  style: any
}) => {
  return (
    <AddressLabelItemPanel style={style}>
      <img src={image} alt={value} />
      <span>{label}</span>
      <div>{value}</div>
    </AddressLabelItemPanel>
  )
}

const AddressScriptLabel = ({
  image,
  label,
  value,
  style,
}: {
  image: string
  label: string
  value: any
  style: any
}) => {
  return (
    <div style={style}>
      <AddressLabelItemPanel>
        <img src={image} alt={value} />
        <span>{label}</span>
      </AddressLabelItemPanel>
      <ReactJson
        src={value}
        style={{
          marginLeft: 56,
          marginTop: 18,
        }}
      />
    </div>
  )
}

export default (props: React.PropsWithoutRef<RouteComponentProps<{ address: string }>>) => {
  const { match } = props
  const { params } = match
  const { address } = params
  return (
    <Page>
      <Header />
      <Content>
        <AddressContentPanel width={window.innerWidth}>
          <AddressTitle address={address} />
          <AddressOverview />
          <AddressCommonContent>
            <AddressCommonLabel
              image={BalanceIcon}
              label="Balance: "
              value={`${AddressData.data.balance} CKB`}
              style={{
                position: 'relative',
                top: 0,
                left: 0,
              }}
            />
            <AddressCommonLabel
              image={TransactionsIcon}
              label="Transactions: "
              value={`${AddressData.data.transactions_count}`}
              style={{
                position: 'relative',
                top: -28,
                left: 583,
              }}
            />
            <AddressCommonLabel
              image={CellConsumedIcon}
              label="Cell Consumed: "
              value={`${AddressData.data.balance}`}
              style={{
                position: 'relative',
                top: -4,
                left: 0,
              }}
            />
            <AddressScriptLabel
              image={AddressScriptIcon}
              label="Lock Script: "
              value={AddressData.data.lock_script}
              style={{
                position: 'relative',
                top: 20,
                left: 0,
              }}
            />
          </AddressCommonContent>
        </AddressContentPanel>
      </Content>
      <Footer />
    </Page>
  )
}
