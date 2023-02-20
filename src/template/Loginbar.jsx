import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {signInWithPopup, FacebookAuthProvider, OAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import {child, get, getDatabase, ref, update} from "firebase/database"
import UserButton from './../components/UserButton';

function Loginbar() {
  //Firebase
const db= getDatabase();
const Facebook_provider = new FacebookAuthProvider();
const Apple_provider = new OAuthProvider('apple.com');
const navigate =useNavigate();
const [agree, setAgree] = useState(false);
const [Register, setRegister]=useState(false);
//Input
const [displayNames, setdisplayNames]=useState('');
const [email, setEmail]=useState('');
const [password, setPassword]=useState('');
const [errorMessage, setErrorMessage]=useState('no');



///////UseEffect
useEffect(()=>{
onAuthStateChanged(auth, user=>{
  if(user){
get(child(ref(db), "User/"+user.uid)).then(snapshot=>{
  if(snapshot.exists()){
    console.log('user Alredy exists')
  }
  else{
  update(ref(db, "User/"+user.uid), {
   ID: user.uid,
   Email: user.email?user.email:email,
   displayName: user.displayName?user.displayName:displayNames,
   photoUrl: user.photoURL?user.photoURL:'assets/img/avatar.png'
  });
  }
})
navigate('/')
  }
});
},[db, navigate, displayNames, email]);

///Facebook Logins
const connect_facebook =()=>{
  signInWithPopup(auth, Facebook_provider)
  .then((result) => {
    // The signed-in user info.
  })
  .catch((error) => {
console.log(error);
  });
};

///apple Login
const connect_apple =()=>{
  signInWithPopup(auth, Apple_provider)
  .then((result) => {
  })
  .catch((error) => {
    console.log(error);
  });
};

////Email password Register
const create_account=()=>{
  if(displayNames.length>2&&email.length>2){
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  })
  .catch((error) => {
var errors = error.message.replace(/\(|\)|\/|Firebase:|Error|auth/g, '');
setErrorMessage(errors)
  })
}
};
////Email password Login
const login_account=()=>{
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  })
  .catch((error) => {
    var errors = error.message.replace(/\(|\)|\/|Firebase:|Error|auth/g, '');
    setErrorMessage(errors)
  });
};


return (
    <div className="hero__left login_bodys">
<div className="hero__top">
   <Link to={'/'}> <img src="assets/img/logo.svg" loading="lazy" alt="Mubasic" className="top__logo"/></Link>
   <div className="login-bluebtn">
    <UserButton/>
    </div>
</div>
<div className="txt hero">
 
</div>

<div className="card scene" style={{boxShadow: 'none'}}>
  <div className="content-container">
   <div className="account-container login-container">
  <div className="form-container">
  
  <div className="login-providers-container">
  <div className="login-providers"><form>
  <div className="terms"><label className="checkbox">
  <input type="checkbox" required="" onChange={e=> {setAgree(e.target.checked)}}/>
  <span>I agree to the <Link className="tems-button">privacy policy</Link></span>
  </label></div>
  <ul className="providers-list">
  <li className="provider-item">
  <button type="button"
  onClick={connect_facebook}
  className={agree===true?"button provider-facebook provider-btn ": "button provider-facebook provider-btn disabled"}>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="icon">
   <title>facebook</title>
   <path d="M16 0.067c-8.837 0-16 7.164-16 16 0 7.925 5.768 14.489 13.332 15.76v-12.422h-3.86v-4.47h3.86v-3.296c0-3.824 2.336-5.908 5.748-5.908 1.634 0 3.039 0.122 3.446 0.175v3.998l-2.367 0.001c-1.855 0-2.213 0.881-2.213 2.175v2.853h4.427l-0.577 4.47h-3.849v12.531c7.916-0.963 14.054-7.694 14.054-15.871 0-8.832-7.164-15.995-16-15.995z">
   </path>
  </svg>
  <span>continue with Facebook</span></button>
  </li>
  <li className="provider-item">
  <button type="button" 
  onClick={connect_apple}
  className={agree===true?"button provider-apple provider-btn":"button provider-apple provider-btn disabled"}>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="icon">
    <title>apple</title>
  <path fill="#999" d="M9.437 31.4c-0.631-0.421-1.191-0.937-1.659-1.533-0.511-0.617-0.984-1.267-1.419-1.939-1.021-1.493-1.82-3.127-2.373-4.848-0.667-2.003-0.991-3.92-0.991-5.796 0-2.093 0.453-3.92 1.336-5.453 0.653-1.2 1.627-2.204 2.8-2.909 1.133-0.707 2.453-1.093 3.787-1.12 0.467 0 0.973 0.067 1.507 0.2 0.387 0.107 0.853 0.28 1.427 0.493 0.733 0.28 1.133 0.453 1.267 0.493 0.427 0.16 0.787 0.227 1.067 0.227 0.213 0 0.52-0.067 0.86-0.173 0.193-0.067 0.56-0.187 1.080-0.413 0.515-0.187 0.923-0.347 1.247-0.467 0.493-0.147 0.971-0.28 1.4-0.347 0.52-0.080 1.036-0.107 1.531-0.067 0.947 0.067 1.813 0.267 2.587 0.56 1.36 0.547 2.457 1.4 3.276 2.613-0.347 0.213-0.667 0.461-0.967 0.733-0.649 0.573-1.2 1.253-1.64 2.007-0.573 1.027-0.867 2.187-0.859 3.36 0.020 1.444 0.387 2.713 1.12 3.813 0.516 0.8 1.205 1.485 2.045 2.048 0.413 0.28 0.776 0.473 1.12 0.6-0.16 0.5-0.336 0.987-0.54 1.467-0.463 1.076-1.013 2.107-1.667 3.080-0.576 0.84-1.029 1.467-1.373 1.88-0.536 0.64-1.053 1.12-1.573 1.463-0.573 0.38-1.247 0.581-1.936 0.581-0.467 0.020-0.933-0.040-1.379-0.169-0.387-0.127-0.768-0.269-1.141-0.431-0.391-0.179-0.795-0.331-1.207-0.453-0.507-0.133-1.027-0.197-1.552-0.196-0.533 0-1.053 0.067-1.547 0.193-0.413 0.117-0.813 0.261-1.209 0.433-0.56 0.233-0.927 0.387-1.14 0.453-0.432 0.128-0.875 0.205-1.32 0.233-0.693 0-1.339-0.2-1.964-0.617zM18.576 6.787c-0.907 0.453-1.768 0.645-2.631 0.581-0.133-0.861 0-1.747 0.36-2.716 0.32-0.827 0.747-1.573 1.333-2.24 0.613-0.693 1.347-1.267 2.173-1.68 0.88-0.453 1.72-0.693 2.52-0.733 0.107 0.907 0 1.8-0.333 2.76-0.304 0.853-0.757 1.64-1.333 2.347-0.58 0.693-1.3 1.267-2.089 1.681z">
  </path>
    </svg><span>Sign in with Apple</span></button></li>
    </ul>
  </form></div></div>
  
  <div className="separator"><span>or</span></div>
   <div className="login-form">
    <fieldset className="form-fieldset">
  {errorMessage!=='no'?
  <article className="message is-danger">
  <div className="message-body">{errorMessage}</div>
  </article>
  :<></>}
<ul>
{Register===true?
<li>
  <label className="label">Your full name</label>
  <input type="text" 
  value={displayNames}
  onChange={e=>setdisplayNames(e.target.value)}
  name="username" className="input" placeholder="Jeff N. Womack" />
  </li>
  : <></>}
  <li>
  <label className="label">Your email</label>
  <input type="text" 
  value={email}
  onChange={e=>setEmail(e.target.value)}
  name="email" className="input"placeholder="you@example.com" />
  </li>
  <li>
  <label className="label">Your password</label>
  <input type="password" 
  value={password}
  onChange={e=>setPassword(e.target.value)}
  name="password" className="input" />
  <span className="recovery">
  <Link to={"/password/recovery?"}>Forgot your password?</Link>
  </span></li>
  </ul>
  </fieldset>
  
  <fieldset className="actions">
  {Register===false?
  <button onClick={login_account} className="button is-fullwidth is-primary btn-submit">Log in</button>
  :
<button onClick={create_account} className="button is-fullwidth is-primary btn-submit">Create account</button>
}
  </fieldset>
</div>
  
  {Register===false?
  <div className="change-action">Need an account? 
  <button onClick={e=>setRegister(true)} className="button is-small is-secondary lastbtnforLogin">
      create account</button></div>
    :
      <div className="change-action">Already have an account? 
  <button onClick={e=>setRegister(false)} className="button is-small is-secondary lastbtnforLogin">
      Login account</button></div>
}
   </div>
  
  <div className="register-explain account-explain">
  <div className="explain-content"></div>
   </div></div>
  </div></div>

</div>
  )
}

export default Loginbar