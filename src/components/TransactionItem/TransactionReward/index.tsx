import React from 'react'
import styled from 'styled-components'
import { shannonToCkb } from '../../../utils/util'
import { localeNumberString } from '../../../utils/number'
import i18n from '../../../utils/i18n'
import DecimalCapacity from '../../DecimalCapacity'

export const RewardPenal = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  justify-content: space-between;
  margin-top: 20px;
  color: #000000;
  margin-right: 22px;

  @media (max-width: 700px) {
    height: 32px;
    margin-top: 10px;
    justify-content: normal;
    align-items: flex-start;
    flex-direction: column;
  }

  .reward__name__point {
    display: flex;
    align-items: center;

    &:before {
      content: '';
      width: 5px;
      height: 5px;
      margin-right: 8px;
      border-radius: 50% 50%;
      background: #424242;
      display: none;

      @media (max-width: 700px) {
        display: flex;
      }
    }

    .reward__name {
      display: flex;
      align-items: center;
      justify-content: left;
      font-weight: 500;
    }
  }

  .reward__capacity {
    margin-left: 15px;

    @media (max-width: 700px) {
      margin-left: 13px;
      width: 100%;
      padding-right: 18px;
    }

    > span {
      margin-left: 5px;
    }
  }
`

const TransactionReward = ({ transaction, cell }: { transaction: State.Transaction; cell: State.Cell }) => {
  // [0, 11] block doesn't show block reward and only cellbase show block reward
  const showBlockReward = transaction.blockNumber > 0 && transaction.isCellbase && cell.targetBlockNumber > 0

  const Rewards = [
    {
      name: i18n.t('transaction.base_reward'),
      capacity: cell.baseReward,
    },
    {
      name: i18n.t('transaction.secondary_reward'),
      capacity: cell.secondaryReward,
    },
    {
      name: i18n.t('transaction.commit_reward'),
      capacity: cell.commitReward,
    },
    {
      name: i18n.t('transaction.proposal_reward'),
      capacity: cell.proposalReward,
    },
  ]
  return (
    <div>
      {showBlockReward &&
        Rewards.map(reward => {
          return (
            <RewardPenal key={reward.name}>
              <div className="reward__name__point">
                <div className="reward__name">{reward.name}</div>
              </div>
              <div className="reward__capacity">
                <DecimalCapacity value={localeNumberString(shannonToCkb(reward.capacity))} />
              </div>
            </RewardPenal>
          )
        })}
    </div>
  )
}

export default TransactionReward
