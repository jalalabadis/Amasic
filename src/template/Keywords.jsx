import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { child, getDatabase, get, ref } from 'firebase/database';

function Keywords() {
  const db = getDatabase();
  const [SearchKeyList, setSearchKeyList]=useState({SearchKeyList:[]});
  const [keyLod, setKeyLod]=useState(true);

  useEffect(()=>{
get(child(ref(db), 'SearchKey')).then(snapshot=>{
  setKeyLod(false);
  const result = [
  {
      "Count": 1,
      "Key": "Leptop"
  },
  {
    "Count": 1,
    "Key": "Dyson"
},
{
  "Count": 1,
  "Key": "Apple"
},
{
  "Count": 1,
  "Key": "Samsung"
},
{
  "Count": 1,
  "Key": "Clock"
},
{
  "Count": 1,
  "Key": "Android"
},
{
  "Count": 1,
  "Key": "Toys"
},
{
  "Count": 1,
  "Key": "Candy"
},
{
  "Count": 1,
  "Key": "Ipad"
},
{
  "Count": 1,
  "Key": "Dresser"
}
  ];
if(snapshot.exists()){
  snapshot.forEach(childSnaphot=>{
  result.push(childSnaphot.val());
  });
  result.sort((a,b)=> b.Count-a.Count);
  
setSearchKeyList({SearchKeyList:result.splice(0,10)});
}
else{
  setSearchKeyList({SearchKeyList:result});
}
});
},[db]);
  return (
    <div className="contents__left">
    <div className="txt genre">Most Search Keywords</div>
    <div className="rank_list">
{keyLod?
<>
<div className="keyRanks-cards_loder"></div>
<div className="keyRanks-cards_loder"></div>
<div className="keyRanks-cards_loder"></div>
<div className="keyRanks-cards_loder"></div>
<div className="keyRanks-cards_loder"></div>
<div className="keyRanks-cards_loder"></div>
<div className="keyRanks-cards_loder"></div>
<div className="keyRanks-cards_loder"></div>
<div className="keyRanks-cards_loder"></div>
<div className="keyRanks-cards_loder"></div>
</>
:
 <>    
{SearchKeyList.SearchKeyList.map((row,index)=>{
  return(
    <Link to={'/search/'+row.Key} key={index} className="tab-menu w-inline-block w-tab-link w--current">
    <div className="txt__genre">{row.Key}</div>
    </Link>
  )
})}
  </>
}
    </div></div>
  )
}

export default Keywords