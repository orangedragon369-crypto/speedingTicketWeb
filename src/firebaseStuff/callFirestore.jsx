import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export default async function getData(refference, single=""){
    let dbRef = single?doc(db, refference, single):collection(db, refference);

    try{
        const ref = await getDocs(dbRef);
        const needed = ref.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id
        }));
        return needed
    } catch (err){
        console.error(err);
    }
}