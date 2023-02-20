import React, { useEffect, useState } from 'react'
import Footer from './../template/Footer';
import { useNavigate, Link } from 'react-router-dom';
import SearchLoder from './../components/SearchLoder';
import UserButton from './../components/UserButton';
import {  getDatabase, onValue, ref, remove } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

function Favorites() {
const navigate = useNavigate();
const db = getDatabase();
const [userID, setUserID]=useState(null);
const [FavDataLodes, setFavDataLodes]=useState(true);
const [FavList, setFavList]=useState({FavList:[]});

useEffect(()=>{
onAuthStateChanged(auth, user=>{
if(user){
setUserID(user.uid);
onValue(ref(db, 'User/'+user.uid+'/favlist'), snapshot=>{
const records =[];
if(snapshot.exists()){
    snapshot.forEach(childSnapshot=>{
        records.push(childSnapshot.val());
    });
setFavList({FavList:records});
setFavDataLodes(false);
}
else{
    setFavDataLodes('notFound');
}

});
}
})
},[db])
/////Remove Fav
const handelremovefav=(e)=>{
    const Asin = e.target.attributes.getNamedItem('data-asin').value;
    remove(ref(db, 'User/'+userID+'/favlist/'+Asin));
};
  return (
    <>
    <div className="search_pages">
    <div className="search_product">
    <div className="hero__top">
    <Link to={'/'}><img src="/assets/img/logo.svg" loading="lazy" alt="Mubasic" className="top__logo"/></Link>
                <div className="login-bluebtn-ss">
                <UserButton/>
                </div>
            </div>
    
    <div className="container">
    <div className="favslist__top">
       <h1>Your favorites </h1>
    
    </div>
    
    
    
      <div className="row justify-content-between">
      {FavDataLodes===true?
      <SearchLoder/>
      : FavDataLodes==='notFound'?
      <>
      <center>
<div  style={{background: '#ffff', padding: '2rem'}}>
<div className="empty-state">
<figure>
<img className='fav-onboarding' src="/assets/img/fav-onboarding.svg" alt=''/>
</figure>
<h1>You don't have any favorites yet</h1><br />
<Link style={{textDecoration: 'none'}} to={"/"}>Search products</Link>
    </div>
</div>
</center>
      </>
      :
      <>
      {FavList.FavList.map((row, index)=>{
      return(
        <div className="col-md-3" key={index}>
      <div className="card">
        <div className="card-media">
        <img className="card-img" style={{height: '15rem', padding: '30px'}} src={row.image} alt="succulent"/>
        </div>
        <div className="card-body">
        <div className="card-title">
        <span className="text-wrapper" style={{fontSize: '14px'}}>
         {row.title}
         </span></div>
        <div className="brandlink">{row.category}</div>
        </div>
        <div className="card-footer-lister">
         <div className="actions">
        <div className="fav-btns">
        <button 
        onClick={handelremovefav}
        data-asin={row.asin}
        className={"fav-button-page userfavitem"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
              </svg>    
            add fav</button>
    </div>
        <div className="view-button">
        <button className="view-buttons" onClick={e=>navigate('/product/'+row.asin)}>view</button>
        </div></div></div></div>
        </div>
    
    )
    })}
    </>
    }
    </div>
        
        </div></div></div>
    
    <Footer/>
        </>
  )
}

export default Favorites