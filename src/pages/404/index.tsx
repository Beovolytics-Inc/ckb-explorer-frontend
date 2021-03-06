import React from 'react'
import styled from 'styled-components'
import Content from '../../components/Content'
import PC404mage from '../../assets/pc_404.png'
import Mobile404Image from '../../assets/mobile_404.png'
import PCBlue404Image from '../../assets/blue_pc_404.png'
import MobileBlue404Image from '../../assets/blue_mobile_404.png'
import { isMobile } from '../../utils/screen'
import { isMainnet } from '../../utils/chain'

const NotFoundPanel = styled.div`
  width: 100%;
  margin-top: 120px;
  margin-bottom: 140px;
`

const NotFoundImage = styled.img`
  width: 1038px;
  height: 480px;
  display: block;
  margin: 0 auto;

  @media (max-width: 700px) {
    width: 282px;
    height: 130px;
  }
`

const get404Image = () => {
  if (isMainnet()) {
    return isMobile() ? Mobile404Image : PC404mage
  }
  return isMobile() ? MobileBlue404Image : PCBlue404Image
}

export default () => {
  return (
    <Content>
      <NotFoundPanel className="container">
        <NotFoundImage src={get404Image()} alt="404" />
      </NotFoundPanel>
    </Content>
  )
}
