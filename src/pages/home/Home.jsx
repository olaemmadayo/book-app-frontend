import React from 'react'
import Hero from './Hero'
import TopSell from './TopSell'
import Recommended from './Recommended'
import News from './News'

const Home = () => {
  return (
    <>
      <Hero/>
      <TopSell/>
      <Recommended/>
      <News/>
    </>
  )
}

export default Home