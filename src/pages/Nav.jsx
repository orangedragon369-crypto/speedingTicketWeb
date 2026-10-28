import { NavLink } from "react-router-dom";
import { Login } from "../firebaseStuff/auth";

export default function Nav(){
  const activeClass = ({ isActive }) => isActive ? "active" : "";

  return (<nav>
        <i className="fa-solid fa-bars menu"></i>
        <NavLink to={"/"}end className={activeClass}>Game</NavLink>
        <NavLink to={"/stats"} className={activeClass}>Stats</NavLink>
        <NavLink to={"/feedback"} className={activeClass}>FeedBack</NavLink>
        <Login/>
    </nav>);
}

// add shrink nav button to shorten nav and adjust board?