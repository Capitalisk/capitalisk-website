import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.scss';

const features = [
  {
    title: 'Economics',
    imageUrl: '',
    description: (
      <>
        <p>
          Capitalisk (CLSK) is a cryptocurrency and a multi-blockchain ecosystem
          built on top of Lisk DEX (
          <a href='https://ldex.trading/' target='_blank'>
            website
          </a>
          ,{' '}
          <a href='https://github.com/Capitalisk/lisk-dex' target='_blank'>
            GitHub
          </a>
          ). The goal of Capitalisk is to allow any community, anywhere in the
          world, to launch a new cryptocurrency which can be traded against any
          other cryptocurrency within the ecosystem. Capitalisk is also intended
          to serve as a decentralized fundraising platform (venture capital) for
          new projects.
        </p>
        <p>
          Capitalisk aims to create incentives for individuals and businesses to
          flexibly accept many different kinds of tokens as a form of payment
          for goods and services.
        </p>
        <p>
          Capitalisk achieves multi-chain fungibility by allowing the relative
          value of any token in its ecosystem to be determined automatically and
          trustlessly thanks to permanent, on-chain records of trades generated
          by its Decentralized Exchanges (DEXs).
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
          The Capitalisk blockchain is highly energy-efficient thanks to its
          Delegated Proof of Stake (DPoS) consensus algorithm.
        </p>
        <p>
          Capitalisk implements a stateful hash-based signature scheme which is
          resistant to quantum computing attacks.
        </p>
        <p>
          The ecosystem relies on Decentralized Exchanges (DEXs) such as LDEX (
          <a href='https://ldex.trading/' target='_blank'>
            https://ldex.trading/
          </a>
          ) to provide a decentralized trading and conversion service between
          different blockchains.
        </p>
        <p>
          Capitalisk solves the blockchain scalability problem by facilitating
          flexible hierarchical relationships between different blockchains with
          Capitalisk itself launching as a sidechain of Lisk (
          <a href='https://lisk.io/' target='_blank'>
            https://lisk.io/
          </a>
          ).
        </p>
        <p>
          See the <a href='/docs/whitepaper'>whitepaper</a> for a more detailed
          description of available features.
        </p>
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
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
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description='Description will go into a meta tag in <head />'
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className='container'>
          <div className='flex justify-center'>
            <div
              className='flex align-center row'
              style={{ width: '400px', textAlign: 'left', marginRight: '5rem' }}
            >
              <h1 className={styles.heroSubtitle}>{siteConfig.tagline}</h1>
              <div className="text-white">
                The Capitalisk blockchain is highly energy-efficient thanks to
                its Delegated Proof of Stake (DPoS) consensus algorithm. To
                guarantee the integrity of the ledger, Capitalisk implements a
                stateful hash-based signature scheme which is resistant to
                quantum computing attacks.
              </div>
              <div className={styles.buttons}>
                <Link className={styles.button} to={useBaseUrl('docs/')}>
                  Get Started
                </Link>
              </div>
            </div>
            <img
              className={styles.logoImg}
              // src={useBaseUrl('/img/capitalisk-chain-respresentation.png')}
              src={useBaseUrl('/img/logo-white.svg')}
            />
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
  );
}

export default Home;
