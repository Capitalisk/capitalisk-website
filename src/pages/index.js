import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.scss'

const features = [
  {
    title: 'Mission',
    imageUrl: '',
    description: (
      <>
        <p>
          Capitalisk (CLSK) is a cryptocurrency and multi-blockchain ecosystem.
          The goal of Capitalisk is to allow any community, anywhere in the world, to launch a project or business venture as a cryptocurrency such that it can be traded against other cryptocurrencies within the ecosystem.
        </p>
        <p>
          Capitalisk also aims to encourage participating businesses and individuals to flexibly accept many different tokens as a form of payment for goods and services denominated in any token within the ecosystem (automatically weighted based on relative value).
        </p>
        <p>
          Capitalisk allows the relative value of any token in its ecosystem to be determined automatically and trustlessly thanks to permanent, decentralized on-chain records of trades left behind by Decentralized Exchanges (DEXs).
        </p>
      </>
    ),
  },
  {
    title: 'Technology',
    imageUrl: '',
    description: (
      <>
        <p>
          The Capitalisk blockchain is highly energy-efficient thanks to its Delegated Proof of Stake (DPoS) consensus algorithm.
        </p>
        <p>
          To guarantee the integrity of the ledger now and in the future, Capitalisk implements a stateful hash-based signature scheme which is resistant to quantum computing attacks.
        </p>
        <p>
          The ecosystem relies on Decentralized Exchanges (DEXs) such as LDEX (<a href="https://ldex.trading/" target="_blank">https://ldex.trading/</a>) to provide a decentralized trading and conversion service between different blockchains.
        </p>
        <p>
          Capitalisk solves the blockchain scalability problem by facilitating flexible hierarchical relationships between different blockchains with Capitalisk itself starting out as a sidechain of Lisk (<a href="https://lisk.io/" target="_blank">https://lisk.io/</a>).
        </p>
      </>
    ),
  },
]

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl)
  return (
    <div className='col col-4'>
      {imgUrl && (
        <div className='text--center'>
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout
      title={`${siteConfig.title}`}
      description='Description will go into a meta tag in <head />'
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className='container'>
          <img
            className={styles.logoImg}
            src={useBaseUrl('/img/capitalisk-logo-white.png')}
          />
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link className={styles.button} to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className='container'>
              <div className={clsx('row', styles.features)}>
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  )
}

export default Home
