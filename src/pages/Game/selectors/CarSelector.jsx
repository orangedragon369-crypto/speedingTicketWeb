import { useEffect, useState } from "react";
import capitalize from "../../../components/capitalize";
import getData from "../../../firebaseStuff/callFirestore";

export default function CarSelector(){
    const [carData, setCarData] = useState({});
    const [currentCar, setCurrentCar] = useState("");
    const [carsVisible, setCarsVisible] = useState(false);

    const retrieveData = async ()=>{
        const cars = {};
        const carsTemp = await getData("cars");
        carsTemp.map((data)=>cars[data.id] = data);
        localStorage.setItem("cars", JSON.stringify(cars));
        setCarData(cars);
    }

    useEffect(()=>{
        if (localStorage.getItem('cars')){
            setCarData(JSON.parse(localStorage.getItem('cars')));
        } else retrieveData();
    }, [])

    return(<>
        <button onClick={()=>setCarsVisible(!carsVisible)}>Cars</button>
        {carsVisible?(<div className="flow">
            {Object.values(carData).map((car, index)=>{
                return(<div className="column cards" key={index}>
                    <div>{capitalize(car.id)}</div>
                    <div>Acceleration Mod: {car.accelerationMod}</div>
                    <div>Hit Points: {car.hp}</div>
                    <div>Weight: {car.weight}</div>
                    <button onClick={()=>{
                        setCurrentCar(car.id);
                        localStorage.setItem("car", JSON.stringify(car.id))
                    }}>{currentCar==car.id?"Saved":"Save as car"}</button>
                </div>);
            })}
        </div>):<>{currentCar}</>}
    </>)
}