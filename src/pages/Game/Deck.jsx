import { useEffect, useState } from "react";
import getData from "../../firebaseStuff/callFirestore";

export default function Deck(){
    const [cardBank, setCardBank] = useState([]);

    useEffect(()=>{
        const retrieve = async ()=>{
            const cards = await getData("Cards");
            console.log(cards)
            setCardBank(cards);
        }
        retrieve();
    }, [])

    return(<div className="flow">
        {cardBank.map((card)=>{
            return(<div className="column cards">
                <div className="row">
                    <div>{card.id}</div>
                    <div>{card.cost}</div>
                </div>
                <div>{card.effect}</div>
            </div>);
        })}
    </div>);
}