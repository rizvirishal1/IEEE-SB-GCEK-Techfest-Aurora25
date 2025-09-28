import { useLocation, useNavigate } from "react-router";

function useNavBar() {

    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    function getCurrentPage() {
        return location.pathname;
    }

    return {handleNavigation, getCurrentPage}
}

export default useNavBar;