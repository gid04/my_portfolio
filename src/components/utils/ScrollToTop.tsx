import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollToTop = () => {
    const location = useLocation();
    const navType = useNavigationType();

    useEffect(() => {
        // "POP" means back/forward button. We generally want to let the browser restore scroll.
        // "PUSH" or "REPLACE" means new navigation. We want to scroll to top.
        if (navType !== "POP") {
            if (!location.hash) {
                window.scrollTo(0, 0);
            }
        }
    }, [location, navType]);

    return null;
};

export default ScrollToTop;
