import { useLocation } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import closeIcon from "../../assets/icons/close.svg";
import menuIcon from "../../assets/icons/menu.svg";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAbout = location.pathname == "/about";
  const isHome = location.pathname == "/";
  const isLogin = location.pathname == "/login";
  const isEvents = location.pathname == "/events";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const glassMorphismBase =
    "fixed top-[10px] w-[98%] justify-self-center rounded-[35px] backdrop-blur-[20px] bg-cyan-400/10 shadow-[0_4px_32px_0_rgba(31,38,135,0.37)] border border-white/18 z-50 mx-auto left-0 right-0";

  const navbarClasses = isMenuOpen
    ? `h-[98vh] transition-all duration-400 ease-in-out ${glassMorphismBase}`
    : `h-[80px] ${glassMorphismBase}`;

  const itemsOpenClasses =
    "flex justify-end items-start h-full pr-[60px] pt-[10px] gap-10";

  const itemsClosedClasses =
    "flex justify-end items-center h-full pr-[60px] gap-10";

  const itemsClasses = isMenuOpen ? itemsOpenClasses : itemsClosedClasses;

  const menuListClasses = "flex flex-col justify-center gap-[50px] h-full";

  const baseMenuItemClasses =
    "cursor-pointer p-[10px] px-[25px] text-[23px] font-medium transition-colors duration-300";

  const activeClasses = `rounded-[35px] backdrop-blur-md bg-green-500/30 shadow-lg shadow-green-500/20 border border-white/40 text-white`;

  const menuTextClasses = "text-white";

  const menuIconClasses = `
        hidden max-[768px]:block 
        max-[768px]:relative max-[768px]:text-[32px] 
        w-[50px] max-[768px]:left-[30px] 
        cursor-pointer
        filter max-[768px]:brightness-0 max-[768px]:saturate-100 max-[768px]:invert-[35%] max-[768px]:sepia-[95%] max-[768px]:hue-rotate-[296deg] max-[768px]:brightness-[88%] max-[768px]:contrast-[85%]
    `;

  const handleNavigation = (path) => {
    navigate(path);
    setTimeout(() => {
      if (window.innerWidth <= 768) {
        setIsMenuOpen(false);
        document.body.style.overflow = "auto";
      }
    }, 300);
  };

  const handleMenuToggle = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    document.body.style.overflow = newState ? "hidden" : "auto";
  };

  const getMenuItemClasses = (isActive) => {
    const activeStyle = isActive ? activeClasses : menuTextClasses;
    return `${baseMenuItemClasses} ${activeStyle}`;
  };

  return (
    <div className={navbarClasses}>
      <div className={itemsClasses}>
        <div
          className={`${menuListClasses} 
                        ${isMenuOpen ? "flex" : "hidden"} 
                        md:flex md:flex-row md:justify-end md:items-center 
                        md:gap-10 md:h-full md:p-0`}
        >
          <span
            className={getMenuItemClasses(isHome)}
            onClick={() => handleNavigation("/")}
          >
            Home
          </span>
          <span
            className={getMenuItemClasses(isAbout)}
            onClick={() => handleNavigation("/about")}
          >
            About
          </span>
          <span
            className={getMenuItemClasses(isLogin)}
            onClick={() => handleNavigation("/login")}
          >
            Login
          </span>

          <span
            className={getMenuItemClasses(isEvents)}
            onClick={() => handleNavigation("/events")}
          >
            Events
          </span>
        </div>

        <img
          className={menuIconClasses}
          src={isMenuOpen ? closeIcon : menuIcon}
          alt="Menu"
          onClick={handleMenuToggle}
        />
      </div>
      <h1
        className={`
          ${isMenuOpen ? "hidden " : ""}
        absolute text-white font-nico text-4xl whitespace-nowrap
    top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
    md:left-4 md:translate-x-0 
  `}
      >
        AURORA'25
      </h1>
    </div>
  );
}
