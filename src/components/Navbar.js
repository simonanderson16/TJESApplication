import "../NavbarStyles.css"
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="navbar">
            <img src={require("./TJESLogo.png")} className="tjes-logo"></img>
            <Link to="/" className="router-link">Home</Link>
        </div>
    )
}