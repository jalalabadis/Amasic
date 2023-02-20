import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import UserButton from './../components/UserButton';
import Footer from './../template/Footer';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { child, get, getDatabase, onValue, ref, remove, update } from 'firebase/database';
import SearchLoder from '../components/SearchLoder';

function Search() {
  const {id}=useParams();
  const navigate = useNavigate();
const db = getDatabase();
const [userID, setUserID]=useState(null);
const [userAsinList, setuserAsinList]=useState('');
const [SearchData, setSearchData]=useState({SearchData:[]});
const [SearchDataLodes, setSearchDataLodes]=useState(true);
const [searchKey, setSearchkey]=useState('');


  useEffect(()=>{
    ////userDatalod
    onAuthStateChanged(auth, user=>{
    if(user){
      setUserID(user.uid);
      onValue(ref(db, 'User/'+user.uid+'/favlist'), snapshot=>{
        if(snapshot.exists()){
    setuserAsinList(JSON.stringify(snapshot.val()));
        }
      });
    }
    else{
      setUserID('Gust');
    }
    });

    //////Search Data Load
    const params = {
      api_key: process.env.REACT_APP_Rainforestapi,
        type: "search",
        amazon_domain: "amazon.com",
        search_term: id
      }
  axios.get('https://api.rainforestapi.com/request', { params })
  .then(response => {
    setSearchDataLodes(false);
    console.log(response.data)
     response.data.search_results.forEach(item=>{
      
         const Resultfavitem = userAsinList.search(item.asin);
         if(Resultfavitem!==-1){
          item.userFav = 'userfavitem'
         }
      });
      
      setSearchData({SearchData:response.data.search_results});
      //setTopsealesLoes(false);
    }).catch(error => {
  // catch and print the error
  console.log(error);
  });
  },[db, userAsinList, id]);


  /////Add fav button
const handeladdfav = (e)=>{
  const Asin = e.target.attributes.getNamedItem('data-asin').value;
  const title =e.target.attributes.getNamedItem('data-title').value;
  const image = e.target.attributes.getNamedItem('data-image').value;
  const category = e.target.attributes.getNamedItem('data-category').value;

get(child(ref(db), 'User/'+userID+'/favlist/'+Asin)).then(snapshot=>{
if(snapshot.exists()){
  remove(ref(db, 'User/'+userID+'/favlist/'+Asin));
}
else{
  update(ref(db, 'User/'+userID+'/favlist/'+Asin), {
    title:title,
    image:image,
    category:category,
    asin:Asin
    });
}
});
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
<div className="searchlist__top">
   <h1>Searching {id} </h1>

   <div className="search-form-page">
    <fieldset>
     <div className="search-area">
    <div style={{display:'inline-block'}} className="autocomplete-wrapper">
    <input type="text"
    value={searchKey} 
    onChange={e=>setSearchkey(e.target.value)}
    onSubmit={e=>navigate('/search/'+searchKey)}
    className="search-input" placeholder="Dyson, Samsung Galaxy S20, KitchenAid..." 
    />
    </div>
    <button onClick={e=>navigate('/search/'+searchKey)} className="search-submit" type="submit" data-test="search-submit">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <title>search</title>
    <path d="M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z">
    </path>
     </svg>Search</button>
    </div>
     </fieldset>
    </div>
</div>



  <div className="row justify-content-between">
  {SearchDataLodes?
  <SearchLoder/>
  :
  <>
  {SearchData.SearchData.map((row, index)=>{
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
    <div className="brandlink">{row.categories[0].name}</div>
    </div>
    <div className="card-footer-lister">
     <div className="actions">
    <div className="fav-btns">
    <button 
    onClick={handeladdfav}
    data-image={row.image}
    data-title={row.title}
    data-category={row.categories[0].name}
    data-asin={row.asin}
    className={"fav-button-page "+row.userFav}>
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

export default Search