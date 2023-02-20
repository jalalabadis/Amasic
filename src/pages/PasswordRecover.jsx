import React, { useState } from 'react'
import Footer from './../template/Footer';
import UserButton from './../components/UserButton';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase';

function PasswordRecover() {
const [email, setEmail]=useState('');
const [emaiSent, setEmailSent]=useState(false);

const handelRecoverEmail=()=>{
    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      setEmailSent(true);
    })
    .catch((error) => {
      //const errorCode = error.code;
      //const errorMessage = error.message;
      // ..
    });
  
};
  return (
    <>
    <div className="s-hero">
    <div className="search_pages">
<div className="search_product">
<div className="hero__top">
<Link to={'/'}><img src="/assets/img/logo.svg" loading="lazy" alt="Mubasic" className="top__logo"/></Link>
            <div className="login-bluebtn-ss">
            <UserButton/>
            </div>
        </div>
        
        
<div className="profile-page">
<div className="container">
<div className="profile-container">
{emaiSent?
<div>Please check your emails</div>
:
<>
<input 
value={email}
onChange={e=>setEmail(e.target.value)}
type="email" placeholder='Your Email'/>
<button onClick={handelRecoverEmail} className='recoveryBtns'>Send recovery email</button>
</>
}
</div>
</div>
</div>
</div></div>
    </div>
    <Footer/>
    </>
  )
}

export default PasswordRecover