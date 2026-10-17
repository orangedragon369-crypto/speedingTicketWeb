import { NavLink } from "react-router-dom";
import { Auth } from "../firebaseStuff/auth";

export default function Nav(){
    return(<nav>
        <NavLink to={"/"}>Game</NavLink>
        <NavLink to={"/stats"}>Stats</NavLink>
        <Auth/>
    </nav>)
}