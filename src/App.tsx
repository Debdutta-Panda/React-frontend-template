import AuthLayout from "./components/authLayout";
import { Route, Routes } from "react-router-dom";
import 'primeicons/primeicons.css';
import "./custom.scss";


import AnimatedLayout from "./components/animatedLayout";
import Login from "./pages/login";
import Registration from "./pages/registration";
import Dashboard from "./pages/dashboard/dashboard";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2";
import Page3 from "./pages/page3";
import Page5 from "./pages/page5";
import Page6 from "./pages/page6";

function App() {
	return (
		<div className="w-full h-full">
			<Routes>
			<Route
						path="login"
						element={<Login />}
					/>
				<Route element={<AnimatedLayout><AuthLayout /></AnimatedLayout>}>
					
					<Route
						path="register"
						element={<Registration />}
					/>
				</Route>
				<Route path="/dashboard" element={<Dashboard />}>
					<Route
						path="page1"
						element={<AnimatedLayout><Page1 /></AnimatedLayout>}
					/>
					<Route
						path="page2"
						element={<AnimatedLayout><Page2 /></AnimatedLayout>}
					/>
					<Route
						path="page3"
						element={<Page3 />}
					/>
					<Route
						path="page4/page5"
						element={<Page5 />}
					/>
					<Route
						path="page4/page6"
						element={<Page6 />}
					/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
