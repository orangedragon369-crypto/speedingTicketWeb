import { useEffect, useState } from "react";
import getData from "../../firebaseStuff/callFirestore";

export default function Deck(){
    const [cardBank, setCardBank] = useState([]);

    useEffect(()=>{
        let cards;
        async()=>{
            cards = localStorage.getItem('cardBank')!==null? localStorage.getItem('cardBank'): await getData("Cards");
        }
        setCardBank(cards);
        console.log(cards)
    }, [])

    return(<div>
        {cardBank.map((card)=>{
            return(<div>
                {card.id}<br/>
                {card.effect}<br/>
                {card.cost}<br/>
            </div>);
        })}
    </div>);
}