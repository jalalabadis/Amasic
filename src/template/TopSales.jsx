import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from './../firebase'
import { child, get, getDatabase, onValue, ref, remove, update } from 'firebase/database';
import TopsalesLoder from '../components/TopsalesLoder';

function TopSales() {
  const db = getDatabase();
  const navigate = useNavigate();
const [userID, setUserID]=useState(null);
const [userAsinList, setuserAsinList]=useState('');
const [topSalesLodes, setTopsealesLoes]=useState(true);
const [topsalesData, setTopSaleData]=useState({topsalesData:[]})
  
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
  
  // set up the request parameters rainforestapi.com
  const params = {
  api_key: process.env.REACT_APP_Rainforestapi,
  type: "bestsellers",
  amazon_domain: "amazon.co.uk",
  category_id: "bestsellers_appliances"
  }
  // make the http GET request to Rainforest API
  axios.get('https://api.rainforestapi.com/request', { params })
  .then(response => {
     response.data.bestsellers.forEach(item=>{
         const Resultfavitem = userAsinList.search(item.asin);
         if(Resultfavitem!==-1){
          item.userFav = 'userfavitem'
         }
      });
      setTopSaleData({topsalesData:response.data.bestsellers.splice(0,12)});
      setTopsealesLoes(false);
    }).catch(error => {
  // catch and print the error
  console.log(error);
  })
  
  // axios.get('https://mocki.io/v1/2ab61b18-99f1-4ad1-89a1-6d098ffeeb30')
  // .then(response => {
  //    response.data.bestsellers.forEach(item=>{
  //        const Resultfavitem = userAsinList.search(item.asin);
  //        if(Resultfavitem!==-1){
  //         item.userFav = 'userfavitem'
  //        }
  //     });
  //     setTopSaleData({topsalesData:response.data.bestsellers.splice(0,12)});
  //     setTopsealesLoes(false);
  //   }).catch(error => {
  // // catch and print the error
  // console.log(error);
  // });

},[db, userAsinList]);

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
    <div className="contents__right">

    <div className="txt genretopseals">Top sales</div>
    <div className="container">
        <div className="row">
        {userID!==null&topSalesLodes!==true?
        <>
          {topsalesData.topsalesData.map((row, index)=>{
          return(
            <div className="col-md-4" key={index}>
            <div className="card">
              <div className="card-media">
              <img className="card-img" src={row.image} alt=''/>
              </div>
              <div className="card-body">
              <div className="card-title">
              <span className="text-wrapper">
               {row.title}
               </span></div>
              <div className="brandlink">{row.current_category.name}</div>
              </div>
              <div className="card-footer-lister">
               <div className="actions">
              <button 
              onClick={handeladdfav}
              data-image={row.image}
              data-title={row.title}
              data-category={row.current_category.name}
              data-asin={row.asin}
              className={"fav-button "+row.userFav}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                </svg> 
                  add fav</button>
              <div className="view-button">
              <button className="view-buttons" onClick={e=>navigate('/product/'+row.asin)}>view</button>
              </div></div></div></div>
              </div>

          )
           })}

</>:
<TopsalesLoder/>
}
   
        </div></div>
        </div>
  )
}

export default TopSales