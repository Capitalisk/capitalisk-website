import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.scss'

const features = [
  {
    title: 'Vision',
    imageUrl: '',
    description: (
      <>
        Capitalisk (CLSK) was designed from the ground up to have the following
        characteristics:
        <ul>
          <li>
            Maximum compatibility with LDEX (https://ldex.trading/) and other
            federations built with the `lisk-dex` SDK.
          </li>
          <li>
            Simple DPoS (Delegated Proof of Stake) consensus with instant
            finality.
          </li>
          <li>Deflationary token supply.</li>
          <li>Signature scheme which is resistant to quantum algorithms.</li>
          <li>
            Signature scheme which is stateful and supports features such as
            changing wallet passphrases.
          </li>
          <li>
            Serves as a fundraising platform for new tokens to be listed on
            LDEX.
          </li>
          <li>
            Serves as a blueprint for future Lisk and Leasehold sidechains.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: 'Technology',
    imageUrl: '',
    description: (
      <>
        Capitalisk is the first token built on top of LDPoS; a set of modules which implement a stateful, quantum-resistant DPoS (Delegated Proof of Stake) consensus algorithm.
        Quantum resistance is achieved through the use of Lamport One-Time Signatures combined with Merkle Signature Trees to allow a single public key root hash to be reused multiple times.
        The algorithm is stateful; a wallet's public key is changed every 64 transactions; this statefulness provides a number of unique features such as the ability for someone to change their wallet's passphrase.
      </>
    ),
  },
  // {
  //   title: 'Powered by React',
  //   imageUrl: 'img/undraw_docusaurus_react.svg',
  //   description: (
  //     <>
  //       Extend or customize your website layout by reusing React. Docusaurus can
  //       be extended while reusing the same header and footer.
  //     </>
  //   ),
  // },
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
      title={`Hello from ${siteConfig.title}`}
      description='Description will go into a meta tag in <head />'
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className='container'>
          <img
            className={styles.logoImg}
            src={useBaseUrl('/img/logo-white.png')}
          />
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
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
