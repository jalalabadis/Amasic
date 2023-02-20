import React, { useEffect, useState } from 'react'
import Footer from './../template/Footer';
import UserButton from './../components/UserButton';
import { Link, useNavigate } from 'react-router-dom';
import { getDatabase, onValue, ref } from 'firebase/database';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Profile() {
    const navigate=useNavigate();
    const db =getDatabase();
    const [userName, setUserName]=useState();
    const [email, setEmail]=useState();
    const [profileImg, setProfileImg]=useState();

useEffect(()=>{
onAuthStateChanged(auth, user=>{
if(user){
    onValue(ref(db, 'User/'+user.uid), snapshot=>{
setUserName(snapshot.val().displayName);
setEmail(snapshot.val().Email);
setProfileImg(snapshot.val().photoUrl);
    })
}
});
},[db]);
const handel_logout=()=>{
    signOut(auth).then(() => {
        navigate('/');
      }).catch((error) => {
        // An error happened.
      });   
}
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
<h1 className="page-title">Your things
<button  onClick={handel_logout} type="button" className="button is-small is-secondary logoutbtn">logout</button>
</h1>
<div className="profile-container">
<div className="avatar-container">
<figure className="avatar">
<img src={profileImg} alt={userName}/>
</figure>
</div>
<ul className="profile-details">
<li><span className="label">Username</span><span className="value">{userName}</span></li>
<li><span className="label">Email</span><span className="value">{email}</span></li>
</ul>

<center><button onClick={e=>navigate('/favorites')} className="yourfavbtn">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
</svg>
    Your favorites</button></center>
</div>
</div>
</div>
</div></div>
    </div>
    <Footer/>
    </>
  )
}

export default Profile