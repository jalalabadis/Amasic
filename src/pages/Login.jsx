import React from 'react'
import Searchbar from './../template/Searchbar';
import Keywords from './../template/Keywords';
import TopSales from './../template/TopSales';
import Footer from './../template/Footer';
import Loginbar from './../template/Loginbar';

function Login() {
  return (
    <>
    <div className="s-hero">
    <Loginbar/>
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

export default Login