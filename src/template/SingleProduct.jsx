import React, { useEffect, useState } from 'react'
import UserButton from './../components/UserButton';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { getDatabase, ref, onValue, update, remove, get, child } from 'firebase/database';
import ProductImageLoder from './../components/ProductImageLoder';
import PriceCardLoder from '../components/PriceCardLoder';

function SingleProduct() {
const {id}=useParams();
const db = getDatabase();
const [userID, setUserID]=useState(null);
const [userAsin, setuserAsin]=useState(false);
///Price
const [Ukprice, setUkprice]=useState();
const [Beprice, setBeprice]=useState();
const [Deprice, setDeprice]=useState();
const [Esprice, setEsprice]=useState();
const [Frprice, setFrprice]=useState();
const [Itprice, setItprice]=useState();
const [Nlprice, setNlprice]=useState();
const [Plprice, setPlprice]=useState();
const [Seprice, setSeprice]=useState();

///Rating
const [Ukrating, setUkrating]=useState();
const [Berating, setBerating]=useState();
const [Derating, setDerating]=useState();
const [Esrating, setEsrating]=useState();
const [Frrating, setFrrating]=useState();
const [Itrating, setItrating]=useState();
const [Nlrating, setNlrating]=useState();
const [Plrating, setPlrating]=useState();
const [Serating, setSerating]=useState();

//Single Data
const [title, setTitle]=useState();
const [description, setDescription]=useState();
const [categories, setCategories]=useState();
const [Main_Img, setMain_Img]=useState();
const [Image0, setImage0]=useState();
const [Image1, setImage1]=useState();
const [Image2, setImage2]=useState();
const [Image3, setImage3]=useState();
//ProdictCompare
const [AllPriceData, setAllPriceData]=useState({AllPriceData:[]});


///uk data red

axios.get('https://api.rainforestapi.com/request', { params : {
  api_key: process.env.REACT_APP_Rainforestapi,
    amazon_domain: "amazon.co.uk",
    asin: id,
    type: "product",
  }})
    .then(result=>{
      if(result.data.product){
       
    //Price & Rating
     setUkprice(result.data.product.buybox_winner.price.value?result.data.product.buybox_winner.price.value:'notFound');
     setUkrating(result.data.product.rating?result.data.product.rating:null);
     //////Single Data
     if(result.data.product.images[0].link){
      setImage0(result.data.product.images[0].link); setMain_Img(result.data.product.images[0].link)};
     if(result.data.product.images[1].link){setImage1(result.data.product.images[1].link)};
     if(result.data.product.images[2].link){setImage2(result.data.product.images[2].link)};
     if(result.data.product.images[3].link){setImage3(result.data.product.images[3].link)};
     if(result.data.product.title){setTitle(result.data.product.title)};
     if(result.data.product.description){setDescription(result.data.product.description)};
     if(result.data.product.categories_flat){setCategories(result.data.product.categories_flat)}
    console.log(0)
      }
      else{
        setUkprice('notFound');
      }
    }).catch(error=>{
      setUkprice('notFound');
      console.log(error)
    });
    

///be data load
axios.get('https://api.rainforestapi.com/request', { params : {
  api_key: process.env.REACT_APP_Rainforestapi,
  asin: id,
  type: "product",
  amazon_domain: "amazon.com.be"
  }})
    .then(result=>{
      if(result.data.product){
      //Price & Rating
     setBeprice(result.data.product.buybox_winner.price.value?result.data.product.buybox_winner.price.value:'notFound');
     setBerating(result.data.product.rating?result.data.product.rating:null);
     //////Single Data
     if(result.data.product.images[0].link){
      setImage0(result.data.product.images[0].link); setMain_Img(result.data.product.images[0].link)};
     if(result.data.product.images[1].link){setImage1(result.data.product.images[1].link)};
     if(result.data.product.images[2].link){setImage2(result.data.product.images[2].link)};
     if(result.data.product.images[3].link){setImage3(result.data.product.images[3].link)};
     if(result.data.product.title){setTitle(result.data.product.title)};
     if(result.data.product.description){setDescription(result.data.product.description)};
     if(result.data.product.categories_flat){setCategories(result.data.product.categories_flat)}
      }
      else{
        setBeprice('notFound');
      }
    }).catch(error=>{
      setBeprice('notFound');
      console.log(error);
    });

///de data load
axios.get('https://api.rainforestapi.com/request', { params : {
  api_key: process.env.REACT_APP_Rainforestapi,
    asin: id,
    type: "product",
    
    amazon_domain: "amazon.de"
  } })
    .then(result=>{
      if(result.data.product){
      //Price & Rating
     setDeprice(result.data.product.buybox_winner.price.value?result.data.product.buybox_winner.price.value:'notFound');
     setDerating(result.data.product.rating?result.data.product.rating:null);
     //////Single Data
     if(result.data.product.images[0].link){
      setImage0(result.data.product.images[0].link); setMain_Img(result.data.product.images[0].link)};
     if(result.data.product.images[1].link){setImage1(result.data.product.images[1].link)};
     if(result.data.product.images[2].link){setImage2(result.data.product.images[2].link)};
     if(result.data.product.images[3].link){setImage3(result.data.product.images[3].link)};
     if(result.data.product.title){setTitle(result.data.product.title)};
     if(result.data.product.description){setDescription(result.data.product.description)};
     if(result.data.product.categories_flat){setCategories(result.data.product.categories_flat)}
      }
      else{
        setDeprice('notFound');
      }
    }).catch(error=>{
      setDeprice('notFound');
      console.log(error);
    });
///es data load
axios.get('https://api.rainforestapi.com/request', { params : {
  api_key: process.env.REACT_APP_Rainforestapi,
    asin: id,
    type: "product",
    
    amazon_domain: "amazon.es"
  } })
.then(result=>{
      if(result.data.product){
      //Price & Rating
     setEsprice(result.data.product.buybox_winner.price.value?result.data.product.buybox_winner.price.value:'notFound');
     setEsrating(result.data.product.rating?result.data.product.rating:null);
     //////Single Data
     if(result.data.product.images[0].link){
      setImage0(result.data.product.images[0].link); setMain_Img(result.data.product.images[0].link)};
     if(result.data.product.images[1].link){setImage1(result.data.product.images[1].link)};
     if(result.data.product.images[2].link){setImage2(result.data.product.images[2].link)};
     if(result.data.product.images[3].link){setImage3(result.data.product.images[3].link)};
     if(result.data.product.title){setTitle(result.data.product.title)};
     if(result.data.product.description){setDescription(result.data.product.description)};
     if(result.data.product.categories_flat){setCategories(result.data.product.categories_flat)}
      }
      else{
        setEsprice('notFound');
      }
    }).catch(error=>{
      setEsprice('notFound');
      console.log(error);
    });
///fr data load
axios.get('https://api.rainforestapi.com/request', { params : {
  api_key: process.env.REACT_APP_Rainforestapi,
    asin: id,
    type: "product",
    
    amazon_domain: "amazon.fr"
  } })
    .then(result=>{
      if(result.data.product){
      //Price & Rating
     setFrprice(result.data.product.buybox_winner.price.value?result.data.product.buybox_winner.price.value:'notFound');
     setFrrating(result.data.product.rating?result.data.product.rating:null);
     //////Single Data
     if(result.data.product.images[0].link){
      setImage0(result.data.product.images[0].link); setMain_Img(result.data.product.images[0].link)};
     if(result.data.product.images[1].link){setImage1(result.data.product.images[1].link)};
     if(result.data.product.images[2].link){setImage2(result.data.product.images[2].link)};
     if(result.data.product.images[3].link){setImage3(result.data.product.images[3].link)};
     if(result.data.product.title){setTitle(result.data.product.title)};
     if(result.data.product.description){setDescription(result.data.product.description)};
     if(result.data.product.categories_flat){setCategories(result.data.product.categories_flat)}
      }
      else{
        setFrprice('notFound');
      }
    }).catch(error=>{
      setFrprice('notFound');
      console.log(error);
    });
///It data load
axios.get('https://api.rainforestapi.com/request', { params : {
  api_key: process.env.REACT_APP_Rainforestapi,
    asin: id,
    type: "product",
    
    amazon_domain: "amazon.it"
  } })
    .then(result=>{
      if(result.data.product){
      //Price & Rating
     setItprice(result.data.product.buybox_winner.price.value?result.data.product.buybox_winner.price.value:'notFound');
     setItrating(result.data.product.rating?result.data.product.rating:null);
     //////Single Data
     if(result.data.product.images[0].link){
      setImage0(result.data.product.images[0].link); setMain_Img(result.data.product.images[0].link)};
     if(result.data.product.images[1].link){setImage1(result.data.product.images[1].link)};
     if(result.data.product.images[2].link){setImage2(result.data.product.images[2].link)};
     if(result.data.product.images[3].link){setImage3(result.data.product.images[3].link)};
     if(result.data.product.title){setTitle(result.data.product.title)};
     if(result.data.product.description){setDescription(result.data.product.description)};
     if(result.data.product.categories_flat){setCategories(result.data.product.categories_flat)}
      }
      else{
        setItprice('notFound');
      }
    }).catch(error=>{
      setItprice('notFound');
      console.log(error);
    });
///Nl data load
axios.get('https://api.rainforestapi.com/request', { params : {
  api_key: process.env.REACT_APP_Rainforestapi,
    asin: id,
    type: "product",
    
    amazon_domain: "amazon.nl"
  } })
    .then(result=>{
      if(result.data.product){
      //Price & Rating
     setNlprice(result.data.product.buybox_winner.price.value?result.data.product.buybox_winner.price.value:'notFound');
     setNlrating(result.data.product.rating?result.data.product.rating:null);
     //////Single Data
     if(result.data.product.images[0].link){
      setImage0(result.data.product.images[0].link); setMain_Img(result.data.product.images[0].link)};
     if(result.data.product.images[1].link){setImage1(result.data.product.images[1].link)};
     if(result.data.product.images[2].link){setImage2(result.data.product.images[2].link)};
     if(result.data.product.images[3].link){setImage3(result.data.product.images[3].link)};
     if(result.data.product.title){setTitle(result.data.product.title)};
     if(result.data.product.description){setDescription(result.data.product.description)};
     if(result.data.product.categories_flat){setCategories(result.data.product.categories_flat)}
      }
      else{
        setNlprice('notFound');
      }
    }).catch(error=>{
      setNlprice('notFound');
      console.log(error);
    });
///pl data load
axios.get('https://api.rainforestapi.com/request', { params : {
  api_key: process.env.REACT_APP_Rainforestapi,
    asin: id,
    type: "product",
    
    amazon_domain: "amazon.pl"
  } })
    .then(result=>{
      if(result.data.product){
      //Price & Rating
     setPlprice(result.data.product.buybox_winner.price.value?result.data.product.buybox_winner.price.value:'notFound');
     setPlrating(result.data.product.rating?result.data.product.rating:null);
     //////Single Data
     if(result.data.product.images[0].link){
      setImage0(result.data.product.images[0].link); setMain_Img(result.data.product.images[0].link)};
     if(result.data.product.images[1].link){setImage1(result.data.product.images[1].link)};
     if(result.data.product.images[2].link){setImage2(result.data.product.images[2].link)};
     if(result.data.product.images[3].link){setImage3(result.data.product.images[3].link)};
     if(result.data.product.title){setTitle(result.data.product.title)};
     if(result.data.product.description){setDescription(result.data.product.description)};
     if(result.data.product.categories_flat){setCategories(result.data.product.categories_flat)}
      }
      else{
        setPlprice('notFound');
      }
    }).catch(error=>{
      setPlprice('notFound');
      console.log(error);
    });
////se Data lod
axios.get('https://api.rainforestapi.com/request', { params : {
  api_key: process.env.REACT_APP_Rainforestapi,
    asin: id,
    type: "product",
    
    amazon_domain: "amazon.se"
  } })
    .then(result=>{
      if(result.data.product){
      //Price & Rating
     setSeprice(result.data.product.buybox_winner.price.value?result.data.product.buybox_winner.price.value:'notFound');
     setSerating(result.data.product.rating?result.data.product.rating:null)
     //////Single Data
     if(result.data.product.images[0].link){
      setImage0(result.data.product.images[0].link); setMain_Img(result.data.product.images[0].link)};
     if(result.data.product.images[1].link){setImage1(result.data.product.images[1].link)};
     if(result.data.product.images[2].link){setImage2(result.data.product.images[2].link)};
     if(result.data.product.images[3].link){setImage3(result.data.product.images[3].link)};
     if(result.data.product.title){setTitle(result.data.product.title)};
     if(result.data.product.description){setDescription(result.data.product.description)};
     if(result.data.product.categories_flat){setCategories(result.data.product.categories_flat)}
      }
      else{
        setSeprice('notFound');
      }
    }).catch(error=>{
      setSeprice('notFound');
      console.log(error);
    });


useEffect(()=>{
////userDatalod
onAuthStateChanged(auth, user=>{
  if(user){
    setUserID(user.uid);
    onValue(ref(db, 'User/'+user.uid+'/favlist'), snapshot=>{
      if(snapshot.exists()){
const  AsinResult = JSON.stringify(snapshot.val()).search(id);
if(AsinResult!==-1){
setuserAsin(true);
}
else{
  setuserAsin(false);
}
      }
    });
  }
  else{
    setUserID('Gust');
  }
  });

  ///Data check
if(Ukprice&&Beprice&&Deprice&&Esprice&&Frprice&&Itprice&&Nlprice&&Plprice&&Seprice){
  console.log(1)
        const ProductCompare = [{
          Flag: '/assets/img/gb.svg',
          Domain: 'https://www.amazon.co.uk/',
          price: Ukprice,
          rating: Ukrating,

        },
        { 
          Flag: '/assets/img/be.svg',
          Domain: 'https://www.amazon.com.be/',
          price: Beprice,
          rating: Berating,
        },
        { 
          Flag: '/assets/img/de.svg',
          Domain: 'https://www.amazon.de/',
          price: Deprice,
          rating: Derating,
        },
        { 
          Flag: '/assets/img/es.svg',
          Domain: 'https://www.amazon.es/',
          price: Esprice,
          rating: Esrating,
        },
        { 
          Flag: '/assets/img/fr.svg',
          Domain: 'https://www.amazon.fr/',
          price: Frprice,
          rating: Frrating,
        },
        { 
          Flag: '/assets/img/it.svg',
          Domain: 'https://www.amazon.it/',
          price: Itprice,
          rating: Itrating,
        },
        { 
          Flag: '/assets/img/nl.svg',
          Domain: 'https://www.amazon.nl/',
          price: Nlprice,
          rating: Nlrating,
        },
        { 
          Flag: '/assets/img/pl.svg',
          Domain: 'https://www.amazon.pl/',
          price: Plprice,
          rating: Plrating,
        },
        { 
          Flag: '/assets/img/se.svg',
          Domain: 'https://www.amazon.se/',
          price: Seprice,
          rating: Serating,
        }
    
      ];
    ProductCompare.sort((a,b)=>b.price-a.price);
    setAllPriceData({AllPriceData: ProductCompare});
      }      
},[id, db, 
  Ukprice, Beprice, Deprice, Esprice, Frprice, Itprice, Nlprice, Plprice, Seprice, 
  Ukrating, Berating, Derating, Esrating, Frrating, Itrating, Nlrating, Plrating, Serating]);


/////Add fav button
const handeladdfav = (e)=>{
get(child(ref(db), 'User/'+userID+'/favlist/'+id)).then(snapshot=>{
if(snapshot.exists()){
  remove(ref(db, 'User/'+userID+'/favlist/'+id));
}
else{
  update(ref(db, 'User/'+userID+'/favlist/'+id), {
    title:title,
    image:Image0,
    category:categories,
    asin:id
    });
}
});
};

  return (
    <>
    <div className="single__left">
    <div className="hero__top">
      <Link to={'/'}> 
      <img src="/assets/img/logo.svg" loading="lazy" alt="Mubasic" className="top__logo"/>
      </Link>
        <div className="login-bluebtn">
        <UserButton/>
        </div>
    </div>
<div className="product_pages_item">
  {Main_Img?
  <>
<img className='main_img' src={Main_Img} alt=""/>
        <div className="row product_img_ist">
            <div className="col-3">
                <img onClick={e=>setMain_Img(Image0)} src={Image0} onMouseOver={e=>setMain_Img(Image0)} alt=""/>
            </div>
            <div className="col-3">
                <img onClick={e=>setMain_Img(Image1)} onMouseOver={e=>setMain_Img(Image1)} src={Image1} alt=""/>
            </div>
            <div className="col-3">
                <img onClick={e=>setMain_Img(Image2)} onMouseOver={e=>setMain_Img(Image2)} src={Image2} alt=""/>
            </div>
            <div className="col-3">
                <img onClick={e=>setMain_Img(Image3)} onMouseOver={e=>setMain_Img(Image3)} src={Image3} alt=""/>
            </div>
        </div>
        </>:
<ProductImageLoder/>
  }

{title?<div className="product_titlles">{title}</div>: <div className="product_titlles_loder"></div>}

        <div className="hero__top">
      {userID?<> <button onClick={handeladdfav} className={userAsin?"fav-button-page_singel userfavitem":"fav-button-page_singel"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="bi bi-star" viewBox="0 0 16 16">
                    <path
                        d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                </svg>
                add fav</button>

            <button className="fav-button-page_singel">
              <Link to={'https://www.facebook.com/sharer/sharer.php?u='+window.location.href} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="bi bi-facebook" viewBox="0 0 16 16">
                    <path
                        d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg></Link>

                <Link to={'https://twitter.com/intent/tweet/?text='+window.location.href} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="bi bi-twitter" viewBox="0 0 16 16">
                    <path
                        d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg></Link>

                <Link to={'https://api.whatsapp.com/send?text='+window.location.href} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="bi bi-whatsapp" viewBox="0 0 16 16">
                    <path
                        d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
                </Link>
            </button>
            </>
            :
            <>
            <div className="fav-button-page_singel_loder"></div>
            <div className="fav-button-page_singel_loder"></div>
            </>
}
        </div>

       {description?
       <div className="product_discription">
           {description}
        </div>:
        <div className="product_discription">
          <div className="line w95"></div>
          <div className="line w85"></div>
          <div className="line w75"></div>
          <div className="line w65"></div>
          <div className="line w55"></div>
          <div className="line w45"></div>
          <div className="line w35"></div>
          <div className="line w25"></div>
          <div className="line w15"></div>
        </div>
}
    </div>
</div>

{/* Right Side */}
 <div className="single__right">
  <div className="login-drkbtn-ss">
<UserButton/>
</div>
<div className="product-price-rating">
    <h1>Compare prices</h1>


{Ukprice!==undefined&&Beprice!==undefined&&Seprice!==undefined?
<>
{AllPriceData.AllPriceData.map((row, index)=>{
      return(
    <div className={"price-cards "+row.price} key={index}>
        <div className="row justify-content-end"> 
<div className="col-3 col-md-2">
    <img className="flag-img" src={row.Flag} alt=''/>
</div>
<div className="col-4 col-md-5">
    <span>€{row.price}</span><br/>
    <div className="rating-style">
    <span>{row.rating}</span>
    {row.rating>=1&&row.rating<2?
    <>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-half" viewBox="0 0 16 16">
       <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/>
     </svg>
     </>
      :
      <></>}
     {row.rating>=2&&row.rating<3?
    <>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-half" viewBox="0 0 16 16">
       <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/>
     </svg>
     </>
      :
      <></>}
    {row.rating>=3&&row.rating<4?
    <>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-half" viewBox="0 0 16 16">
       <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/>
     </svg>
     </>
      :
      <></>}
     {row.rating>=4&&row.rating<5?
    <>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-half" viewBox="0 0 16 16">
       <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/>
     </svg>
     </>
      :
      <></>}
 {row.rating===5?
    <>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
     </>
      :
      <></>}
    </div>
</div>
<div className="col-5 col-md-5">
  <Link to={row.Domain+'dp/'+id} target="_blank">  <button className="float-right">Buy to amazon</button></Link>
</div>
</div>
</div>
  )
})}
</>:
<PriceCardLoder/>

}

</div></div>
</>
  )
}

export default SingleProduct