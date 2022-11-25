import type { NextPage } from 'next'
import Head from 'next/head'
import Herosection from '../components/Herosection/Herosection'
import NFTStep from '../components/NFTStep/NFTStep'

const Home: NextPage = () => {
  return (
    <div>
      <Herosection />
      <NFTStep />
  </div>
  )
}

export default Home
