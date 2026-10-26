import { useEffect, useState } from "react";
import capitalize from "../../../components/capitalize";
import getData from "../../../firebaseStuff/callFirestore";

export default function SpecialtySelector(){
    const [perks, setPerks] = useState({});
    const [currentPerk, setCurrentPerk] = useState("");
    const [specialtiesVisible, setSpecialtiesVisible] = useState(false);


    const retrieveData = async ()=>{
        const perks = {};
        const perksTemp = await getData("specialties");
        perksTemp.map((data)=>perks[data.id] = data);
        localStorage.setItem("specialties", JSON.stringify(perks));
        setPerks(perks);
    }

    useEffect(()=>{
        if (localStorage.getItem('specialties')){
            setPerks(JSON.parse(localStorage.getItem('specialties')));
        } else retrieveData();
    }, [])

    return(<>
        <button onClick={()=>setSpecialtiesVisible(!specialtiesVisible)}>Speciality</button>
        {specialtiesVisible?(<div className="flow">
        {Object.keys(perks).map((perk, index)=>{
            const perkInfo = perks[perk];
            const id = capitalize(perkInfo.id)
            return(<div className="column cards" key={index}>
                <div className="centered">{id}</div>
                <div>{perkInfo.effect}</div>
                <div>{}</div>
                <button onClick={()=>{
                    setCurrentPerk(id);
                    localStorage.setItem("specialty", JSON.stringify(id))
                }}>{currentPerk==id?"Saved":"Save as Specialty"}</button>
            </div>);
        })}
    </div>):(<>{currentPerk}</>)}
    </>
    )
}