import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { getDatabase, onValue, ref } from 'firebase/database';

function UserButton() {
  const navigate = useNavigate();
  const db =getDatabase();
const [userDataLod, setuserDataLod]=useState(true);
const [avatar, setAvatar]=useState();
const [displayName, setDisplayName]=useState();
  useEffect(()=>{
onAuthStateChanged(auth, user=>{
  if(user){
onValue(ref(db, 'User/'+user.uid), snapshot=>{
setAvatar(snapshot.val().photoUrl);
setDisplayName(snapshot.val().displayName);
})
setuserDataLod('user');
  }
  else{
    setuserDataLod('gust');
  }
});
  },[db]);
  return (
    <>
    {userDataLod===true?
    <div className="line" style={{width: '5vw', height: '22px'}}></div>
    : userDataLod==='user'&&avatar!==undefined?
     <Link data-test="profile-btn" to={"/profile"}>
    <figure className="avatar">
    <img src={'/'+avatar} alt={displayName}/>
    </figure><span className="username">{displayName}</span>
    </Link>
     : userDataLod==='gust'?
     <button onClick={e=>navigate('/login')}>Login</button>
:<></>
  }
    </>
   
  )
}

export default UserButton