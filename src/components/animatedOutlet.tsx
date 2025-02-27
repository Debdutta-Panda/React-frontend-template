import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties } from "react";
import { Outlet, useLocation } from "react-router-dom";

const pageVariants = {
    initial: { opacity: 0, x: 20 }, // Slight right slide-in
    animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.4, ease: "easeIn" } }, // Slight left slide-out
  };

export type AnimatedOutletProps = {
    className?: string;
    style?: CSSProperties;
    disableAnimation?: boolean;
}

export default function AnimatedOutlet({className, style, disableAnimation}: AnimatedOutletProps) {
    if(disableAnimation){
        return <Outlet />
    }
    const location = useLocation();
	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={location.pathname + location.key} // Ensure unique animations per route
				initial="initial"
				animate="animate"
				exit="exit"
				variants={pageVariants}
                className={className}
                style={style}
			>
				<Outlet />
			</motion.div>
		</AnimatePresence>
	);
}
