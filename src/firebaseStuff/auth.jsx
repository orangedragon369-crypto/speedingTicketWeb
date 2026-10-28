import { signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "./firebase";

export const Login = ()=>{
    const [screenName, setScreenName] = useState(null);

    useEffect(() => {
      const timer = setTimeout(() => {
        setScreenName(auth?.currentUser?.displayName);
      }, 250);
      return () => clearTimeout(timer);
    }, [screenName]);   

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
            setScreenName(auth?.currentUser?.displayName !== null?auth?.currentUser?.displayName:"Not found");
        }catch(err){
            console.error(err);
        }
    }

    const logOut = async () => {
        try{
            await signOut (auth);
            setScreenName(null);
        }catch(err){
            console.error(err);
        }
    }

    if(screenName==null)return(<button className="auth" onClick={()=>signInWithGoogle()}>signin</button>);
    else return(<div className="auth">
        <img src={auth.currentUser.photoURL}/>
        <span className="auth">
            {screenName}
            <button onClick={()=>logOut()}>signout</button>
        </span>
    </div>);
}