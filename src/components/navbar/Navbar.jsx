import React from 'react'
import NavBarLarge from './NavBarLarge'
import NavBarSmall from './NavBarSmall'
import useNavBar from '../../hooks/useNavBar'

const Navbar = () => {

    const {handleNavigation, getCurrentPage } = useNavBar();

    return (
        <>
            <div className='md:flex hidden md:justify-center'>
                <NavBarLarge handleNavigation={handleNavigation} getPath={getCurrentPage}/>
            </div>

            <div className='md:hidden flex'>
                <NavBarSmall handleNavigation={handleNavigation} getPath={getCurrentPage}/>
            </div>
        </>
    )
}

export default Navbar