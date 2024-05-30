import React, { useState } from 'react'
import "./Sidebar.scss";
import { FiMenu } from "react-icons/fi";
import { RiProductHuntLine } from "react-icons/ri";
import menu from "../../data/sidebar"
import SidebarItem from './SidebarItem';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/1x/Asset 1.png'


const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true)
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    const goHome = () =>{
        navigate("/dashboard");
    }
    return (
        <div className='layout'>
            <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>

                <div className="top_section">
                    <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
                        <img src={logo} style={{ cursor: "pointer", maxHeight:"35px" }} onClick={goHome}/>
                    </div>
                    <div className="bars" style={{ marginLeft: isOpen ? "140px" : "0px" }}>
                        <FiMenu onClick={toggle} />
                    </div>
                </div>
                {menu.map((item, index) => {
                    return <SidebarItem key={index}
                        item={item} isOpen={isOpen} />
                })}
            </div>
            <main style={{ paddingLeft: isOpen ? "230px" : "60px", transition: "all .5s", }}>
                {children}
            </main>
        </div>
    )
}

export default Sidebar