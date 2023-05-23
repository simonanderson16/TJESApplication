import "../NavbarStyles.css"
import { Link, useNavigate } from "react-router-dom";
import {FaHome} from "react-icons/fa";

export default function Navbar() {

    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    }

    return (
        <div className="navbar">
            <img src={require("./TJESLogo.png")} className="tjes-logo"></img>
            {/* <Link to="/" className="router-link">Home</Link> */}
            {/* <button onClick={goHome}><FaHome/></button> */}
            <FaHome className="home-button" onClick={goHome}/>

        </div>
    )
}