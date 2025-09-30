import { useState } from "react";
import closeIcon from "../../assets/icons/close.svg";
import menuIcon from "../../assets/icons/menu.svg";
import { motion } from "framer-motion";

const NavBarSmall = ({handleNavigation, getPath}) => {

    const container = `fixed top-[10px] w-[98%] z-50 rounded-[35px] backdrop-blur-[20px] bg-cyan-400/10 shadow-[0_4px_32px_0_rgba(31,38,135,0.37)] border border-white/18 mx-auto left-0 right-0 py-4 px-4 flex flex-col justify-center items-center`
    const header = `text-white font-nico text-4xl whitespace-nowrap`

    const iconStyle = `
        hidden max-[768px]:block 
        max-[768px]:relative max-[768px]:text-[32px] 
        w-[50px]  
        cursor-pointer
        filter max-[768px]:brightness-0 max-[768px]:saturate-100 max-[768px]:invert-[35%] max-[768px]:sepia-[95%] max-[768px]:hue-rotate-[296deg] max-[768px]:brightness-[88%] max-[768px]:contrast-[85%]
    `

    const menu = ['Home', 'About', 'Login', 'Events']
    const paths = ['/', '/about', '/login', '/events']
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={container}>

            <h1 className={header}>
                AURORA'25
            </h1>

            <div className='h-full w-full absolute top-0 left-0 flex flex-col items-end bg-transparent px-4'>
                <div className="py-3 pr-2">
                    <img onClick={() => setMenuOpen(!menuOpen)} className={iconStyle} src={menuOpen ? closeIcon : menuIcon}></img>
                </div>

            </div>


            {menuOpen && (
                <motion.div 
                    initial={{scaleY: 0}}
                    animate={{scaleY: 1}}
                    transition={{ease: 'easeOut', duration: 0.24}}
                    
                    className="origin-top w-full h-fit justify-center mt-2 flex flex-col items-center gap-4 z-50">
                    {menu.map((item, i) => (
                        <MenuItem handleNaviagtion={handleNavigation} setMenuOpen={setMenuOpen} path={paths[i]} getPath={getPath} name={item} key={`menu-item-s-${i}`} />
                    ))}
                </motion.div>
            )}
        </div>
    )
}


function MenuItem({ name, path, getPath, handleNaviagtion, setMenuOpen }) {

    const isOnUserDashboard = (path == '/login' && getPath() == '/user-dashboard');

    return <span onClick={() => { handleNaviagtion(path); setMenuOpen(false); }} className={`rounded-[35px] backdrop-blur-md  w-full shadow-lg  text-white px-5 py-[10px] text-2xl font-semibold ${path === getPath() || isOnUserDashboard ? "bg-green-500/30 shadow-green-500/20 border border-white/40" : "bg-transparent"}`}>
        {name}
    </span>
}

export default NavBarSmall