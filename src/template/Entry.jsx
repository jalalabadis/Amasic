import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserButton from '../components/UserButton'

function Entry() {
  
    useEffect(()=>{

    },[])
  return (
    <div className="hero__left">
<div className="hero__top">
    <Link to={'/'}>
    <img src="assets/img/logo.svg" loading="lazy" alt="Mubasic" className="top__logo"/>
    </Link>
    <div className="login-bluebtn">
    <UserButton/>
    </div>
</div>
<div className="txt hero">
    As an Amazon Associate
    Amasic earns from 
    qualifying purchases.
</div>

<h1 className="hero__title">The <span className="highlight-orange optical">#</span>
<span className="highlight-orange">1 </span>source for <span className="highlight-gold">Amazon</span>
 <br/>Products</h1>
</div>
  )
}

export default Entry