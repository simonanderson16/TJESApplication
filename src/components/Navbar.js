import "../NavbarStyles.css"
import { useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { getAuth } from "firebase/auth";

export default function Navbar() {

    const navigate = useNavigate();
    const userActive = getAuth().currentUser;

    const goHome = () => {
        if (userActive)
            navigate("/home");
        else
            navigate("/");
    }

    const goLogOut = () => {
        getAuth().signOut();
        navigate('/');
    }

    return (
        <div className="navbar">
            <img src={require("./TJESLogo.png")} className="tjes-logo"></img>
            <div className="navbar-controls">
                <FaHome className="home-button" onClick={goHome} />
                <FaSignOutAlt hidden={userActive} className="home-button" onClick={goLogOut} />
            </div>
        </div>
    )
}