import type { NextPage } from 'next'
import Head from 'next/head'
import Herosection from '../components/Herosection/Herosection'
import NFTStep from '../components/NFTStep/NFTStep'

const Home: NextPage = () => {
  return (
    <div>
       <Head>
        <link rel="icon" href="/colorspy-logo.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="colors,nft,design,patterns,cube,bricks,colorspy"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://colorspy.netlify.app/" />
        <meta
          property="og:title"
          content="ColorSpy user creates its own type of design pattern and sells it as an NFT"
        />
        <meta
          property="og:description"
          content="ColorSpy user creates its own type of design pattern and sells it as an NFT"
        />
        <meta
          property="og:image"
          content="https://cdn-icons-png.flaticon.com/512/1561/1561803.png"
        />

        <meta name="language" content="ES" />
        <meta
          name="author"
          content="Nayan Radadiya, nayanrdeveloper@gmail.com"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://colorspy.netlify.app/" />
        <meta
          property="twitter:title"
          content="ColorSpy for user create own NFT"
        />
        <meta
          property="twitter:description"
          content="ColorSpy user creates its own type of design pattern and sells it as an NFT"
        />
        <meta property="twitter:image" content="/logo-no-background.png" />

        <meta name="url" content="https://colorspy.netlify.app/" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="ColorSpy user creates its own type of design pattern and sells it as an NFT"
        />
        <link rel="apple-touch-icon" href="/logo-no-background.png" />
        <title>ColorSpy</title>
      </Head>
      <Herosection />
      <NFTStep />
  </div>
  )
}

export default Home
