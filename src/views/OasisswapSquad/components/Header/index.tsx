import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex, lightColors, Spinner, Text, Timeline } from '@oasisswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useGetOsBalance } from 'hooks/useTokenBalance'
import useTheme from 'hooks/useTheme'
import { StyledWaveContainer } from 'views/OasisswapSquad/styles'
import { UserStatusEnum } from 'views/OasisswapSquad/types'
import ConnectWalletButton from 'components/ConnectWalletButton'
import HeaderBottomWave from '../../assets/HeaderBottomWave'
import nftSaleConfigBuilder from '../../config'
import CtaButtons from './CtaButtons'
import MintText from './MintText'
import PreEventText from './PreEventText'
import SaleProgress from './SaleProgress'
import {
  StyledSquadEventBorder,
  StyledSquadEventContainer,
  StyledSquadHeaderContainer,
  StyledSquadTitle,
} from './styles'
import { OasisswapSquadHeaderType } from './types'

const DEFAULT_OS_COST = 15
const DEFAULT_MAX_TICKETS = 10

const OasisswapSquadHeader: React.FC<OasisswapSquadHeaderType> = ({
  userInfos,
  eventInfos,
  account,
  userStatus,
  isLoading,
}) => {
  const { t } = useTranslation()
  const { theme, isDark } = useTheme()
  const { balance: osBalance } = useGetOsBalance()
  const displayEventBlock = !!eventInfos || isLoading
  const {
    ticketsOfUser,
    numberTicketsUsedForGen0,
    numberTicketsOfUser,
    numberTicketsForGen0,
    canClaimForGen0,
    numberTokensOfUser,
  } = userInfos || {}

  const {
    maxPerAddress,
    maxPerTransaction,
    maxSupply,
    pricePerTicket,
    saleStatus,
    totalTicketsDistributed,
    totalSupplyMinted,
    startTimestamp,
  } = eventInfos || {}

  return (
    <StyledSquadHeaderContainer
      pt={['16px', null, null, '40px']}
      px={['16px', null, null, '80px']}
      flexDirection="column"
      alignItems="center"
    >
      <Flex width="100%">
        <Link to="/nfts">
          <Text color="primary" bold>{`< ${t('NFT Market')}`}</Text>
        </Link>
      </Flex>
      <StyledSquadTitle my="32px" color={lightColors.invertedContrast} bold textAlign="center">
        {t('Oasisswap Squad')}
      </StyledSquadTitle>
      <Text color={lightColors.warning} textAlign="center" bold>
        {`${t('Presale:')} 04:00 UTC, Oct. 7`}
      </Text>
      <Text color={lightColors.warning} textAlign="center" bold>
        {`${t('Public Sale:')} 08:00 UTC, Oct. 7`}
      </Text>
      <Text color={lightColors.warning} textAlign="center" bold>
        {t('Mint Cost: %minCost% OS each', {
          minCost: DEFAULT_OS_COST,
        })}
      </Text>
      <Text color={lightColors.warning} textAlign="center" bold>
        {t('Max per wallet: %maxPerWallet%', { maxPerWallet: DEFAULT_MAX_TICKETS })}
      </Text>
      <Text color={lightColors.invertedContrast} textAlign="center">
        {t('OasisSwap’s first official generative NFT collection.')}
      </Text>
      <Text color={lightColors.invertedContrast} mb={!displayEventBlock ? '80px' : '32px'} textAlign="center">
        {t('Join the squad.')}
      </Text>
      {displayEventBlock && (
        <StyledSquadEventBorder mb="56px">
          <StyledSquadEventContainer m="1px" p="32px">
            <Flex flexDirection={['column', null, 'row']}>
              {eventInfos && (
                <Box mr={['0', null, null, '100px']}>
                  <Timeline
                    events={nftSaleConfigBuilder({
                      t,
                      saleStatus,
                      startTimestamp,
                    })}
                    useDark={false}
                  />
                </Box>
              )}
              <Flex flexDirection="column">
                {eventInfos && (
                  <>
                    <PreEventText t={t} userStatus={userStatus} saleStatus={saleStatus} />
                    <SaleProgress
                      t={t}
                      userStatus={userStatus}
                      saleStatus={saleStatus}
                      totalTicketsDistributed={totalTicketsDistributed}
                      maxSupply={maxSupply}
                      totalSupplyMinted={totalSupplyMinted}
                    />
                    {userInfos && (
                      <MintText
                        t={t}
                        userStatus={userStatus}
                        saleStatus={saleStatus}
                        numberTicketsOfUser={numberTicketsOfUser}
                        numberTokensOfUser={numberTokensOfUser}
                      />
                    )}
                    {userInfos && (
                      <CtaButtons
                        t={t}
                        account={account}
                        theme={theme}
                        userStatus={userStatus}
                        saleStatus={saleStatus}
                        numberTokensOfUser={numberTokensOfUser}
                        canClaimForGen0={canClaimForGen0}
                        maxPerAddress={maxPerAddress}
                        maxSupply={maxSupply}
                        numberTicketsOfUser={numberTicketsOfUser}
                        numberTicketsUsedForGen0={numberTicketsUsedForGen0}
                        totalSupplyMinted={totalSupplyMinted}
                        osBalance={osBalance}
                        maxPerTransaction={maxPerTransaction}
                        numberTicketsForGen0={numberTicketsForGen0}
                        pricePerTicket={pricePerTicket}
                        ticketsOfUser={ticketsOfUser}
                        startTimestamp={startTimestamp}
                      />
                    )}
                  </>
                )}
                {isLoading &&
                  (userStatus === UserStatusEnum.UNCONNECTED ? (
                    <ConnectWalletButton userStatus={userStatus} />
                  ) : (
                    <Spinner />
                  ))}
              </Flex>
            </Flex>
          </StyledSquadEventContainer>
        </StyledSquadEventBorder>
      )}
      <StyledWaveContainer bottom="-3px">
        <HeaderBottomWave isDark={isDark} />
      </StyledWaveContainer>
    </StyledSquadHeaderContainer>
  )
}

export default OasisswapSquadHeader
