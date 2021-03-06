import React, { useMemo, useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Search from '../Search'
import LogoIcon from '../../assets/ckb_logo.png'
import MobileLogoIcon from '../../assets/mobile_ckb_logo.png'
import SearchLogo from '../../assets/search.png'
import WhiteDropdownIcon from '../../assets/white_dropdown.png'
import BlueDropdownIcon from '../../assets/blue_dropdown.png'
import GreenDropdownIcon from '../../assets/green_dropdown.png'
import MenuChartIcon from '../../assets/menu_chart.png'
import MenuDaoIcon from '../../assets/menu_dao.png'
import i18n from '../../utils/i18n'
import {
  HeaderDiv,
  HeaderMobileDiv,
  HeaderMobilePanel,
  HeaderSearchPanel,
  HeaderVersionPanel,
  HeaderSearchMobilePanel,
  HeaderBlockchainPanel,
} from './styled'
import { isMobile } from '../../utils/screen'
import { useAppState, useDispatch } from '../../contexts/providers/index'
import { ComponentActions } from '../../contexts/providers/reducer'
import LanDropdown from '../Dropdown/Language'
import ChainDropdown from '../Dropdown/ChainType'
import { isMainnet } from '../../utils/chain'
import CONFIG from '../../config'

enum LinkType {
  Inner,
  Outer,
}

const Menus = () => {
  const [t] = useTranslation()
  const MenuDataList = useMemo(() => {
    return [
      {
        type: LinkType.Inner,
        name: t('navbar.charts'),
        icon: MenuChartIcon,
        url: '/charts',
      },
      {
        type: LinkType.Inner,
        name: t('navbar.nervos_dao'),
        icon: MenuDaoIcon,
        url: '/nervosdao',
      },
    ]
  }, [t])

  return (
    <div className="header__menus">
      {MenuDataList.map(menu => {
        return menu.type === LinkType.Inner ? (
          <Link className="header__menus__item" to={menu.url} key={menu.name}>
            <img alt="menu icon" src={menu.icon} />
            <span>{menu.name}</span>
          </Link>
        ) : (
          <a className="header__menus__item" href={menu.url} target="_blank" rel="noopener noreferrer" key={menu.name}>
            {menu.name}
          </a>
        )
      })}
    </div>
  )
}

const LogoComp = () => {
  return (
    <Link to="/" className="header__logo">
      <img className="header__logo__img" src={isMobile() ? MobileLogoIcon : LogoIcon} alt="logo" />
    </Link>
  )
}

const handleVersion = (nodeVersion: string) => {
  if (nodeVersion && nodeVersion.indexOf('(') !== -1) {
    return `v${nodeVersion.slice(0, nodeVersion.indexOf('('))}`
  }
  return nodeVersion
}

export default ({ hasSearch }: { hasSearch?: boolean }) => {
  const { app, components } = useAppState()
  const dispatch = useDispatch()
  const { nodeVersion, language } = app
  const { searchBarEditable } = components
  const [showChainDropdown, setShowChainDropdown] = useState(false)
  const [chainDropdownLeft, setChainDropdownLeft] = useState(0)
  const [chainDropdownTop, setChainDropdownTop] = useState(0)

  useLayoutEffect(() => {
    if (showChainDropdown && language) {
      const chainDropdownComp = document.getElementById('header__blockchain__panel')
      if (chainDropdownComp) {
        const chainDropdownReact = chainDropdownComp.getBoundingClientRect()
        if (chainDropdownReact) {
          setChainDropdownLeft(chainDropdownReact.left - 4)
          setChainDropdownTop(chainDropdownReact.bottom)
        }
      }
    }
  }, [showChainDropdown, language])

  const getDropdownIcon = () => {
    if (showChainDropdown) return WhiteDropdownIcon
    return isMainnet() ? GreenDropdownIcon : BlueDropdownIcon
  }

  const BlockchainComp = () => {
    return (
      <HeaderBlockchainPanel search={!!hasSearch} showChainDropdown={showChainDropdown} id="header__blockchain__panel">
        <div
          className="header__blockchain__flag"
          role="button"
          tabIndex={-1}
          onKeyDown={() => {}}
          onClick={() => {
            setShowChainDropdown(true)
          }}
        >
          <div className="header__blockchain__content">
            {isMainnet() ? i18n.t('navbar.mainnet') : CONFIG.TESTNET_NAME.toUpperCase()}
          </div>
          <HeaderVersionPanel>
            <div>{handleVersion(nodeVersion)}</div>
            <img src={getDropdownIcon()} alt="dropdown icon" />
          </HeaderVersionPanel>
        </div>
        {showChainDropdown && (
          <ChainDropdown setShowChainDropdown={setShowChainDropdown} left={chainDropdownLeft} top={chainDropdownTop} />
        )}
        <LanDropdown />
      </HeaderBlockchainPanel>
    )
  }

  return (
    <React.Fragment>
      {isMobile() ? (
        <>
          {hasSearch && (
            <HeaderSearchMobilePanel searchBarEditable={searchBarEditable}>
              <Search />
            </HeaderSearchMobilePanel>
          )}
          <HeaderMobilePanel searchBarEditable={searchBarEditable}>
            <HeaderMobileDiv>
              <LogoComp />
              <Menus />
              {hasSearch && (
                <div className="header__search">
                  <div
                    className="header__search__component"
                    onKeyDown={() => {}}
                    onClick={() => {
                      dispatch({
                        type: ComponentActions.UpdateHeaderSearchEditable,
                        payload: {
                          searchBarEditable: true,
                        },
                      })
                    }}
                    role="button"
                    tabIndex={-1}
                  >
                    <img className="header__search__image" src={SearchLogo} alt="search" />
                  </div>
                  <div className="header__search__separate" />
                </div>
              )}
              <BlockchainComp />
            </HeaderMobileDiv>
            <HeaderSearchPanel>{hasSearch && searchBarEditable && <Search />}</HeaderSearchPanel>
          </HeaderMobilePanel>
        </>
      ) : (
        <>
          <HeaderDiv>
            <LogoComp />
            <Menus />
            {hasSearch && (
              <div className="header__search">
                <div className="header__search__component">
                  <Search />
                </div>
              </div>
            )}
            <BlockchainComp />
          </HeaderDiv>
        </>
      )}
    </React.Fragment>
  )
}
