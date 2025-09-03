import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollManager() {
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname == "/events") {
            const savedPosition = sessionStorage.getItem('scrollPosition');
            if (savedPosition) {
                setTimeout(() => {
                    window.scrollTo({ top: savedPosition, behavior: "smooth" });
                    sessionStorage.removeItem('scrollPosition');
                }, 200);
            }
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
}