
const NavBarLarge = ({handleNavigation, getPath}) => {

    const container = `fixed top-[10px] w-[98%] z-50 rounded-[35px] backdrop-blur-[20px] bg-cyan-400/10 shadow-[0_4px_32px_0_rgba(31,38,135,0.37)] border border-white/18 mx-auto left-0 right-0 py-3 px-4 flex flex-row justify-between items-center`
    const header = `text-white font-nico text-4xl whitespace-nowrap`
    const itemContainer = `flex gap-4 lg:gap-12 lg:mr-12`

    const menu = ['Home', 'About', 'Login', 'Events']
    const paths = ['/', '/about', '/login', '/events']

    return (
        <div className={container}>
            <h1 className={header}>
                AURORA'25
            </h1>

            <div className={itemContainer}>
                {menu.map((item, i) => {
                    return <MenuItem path={paths[i]} handleNavigation={handleNavigation} getPath={getPath} key={`menu_item_${i}`} name={item}/>
                })}
            </div>
        </div>
    )
}

function MenuItem({name, path, getPath, handleNavigation}) {

    const isOnUserDashboard = (path == '/login' && getPath() == '/user-dashboard');

    return <span onClick={() => handleNavigation(path)} className={`rounded-[35px] cursor-pointer text-white px-5 py-[10px] text-2xl font-semibold ${path === getPath() || isOnUserDashboard ? "backdrop-blur-md bg-green-500/30 shadow-lg shadow-green-500/20 border border-white/40" : ""}`}>
        {name}
    </span>
}

export default NavBarLarge