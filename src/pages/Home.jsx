import React from 'react'
import Entry from '../template/Entry'
import Footer from '../template/Footer'
import Keywords from '../template/Keywords'
import Searchbar from '../template/Searchbar'
import TopSales from '../template/TopSales'

function Home() {
  return (
  <>
<div className="s-hero">
<Entry/>
<Searchbar/>
</div>
<div className="s-contents">
<Keywords/>
<TopSales/>
</div>
<Footer/>
</>
  )
}

export default Home