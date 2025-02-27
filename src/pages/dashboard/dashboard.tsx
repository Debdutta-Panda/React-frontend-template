import { NavLink, Outlet, useLocation } from "react-router-dom";
import { SidebarMenuItemData } from "../../components/sidebar/sidebar.type";
import { useBearStore } from "../../main";
import { ChevronDown, ChevronRight, House } from 'lucide-react';
import SidebarComponent from "../../components/sidebar/sidebar";
import { classNames } from "primereact/utils";
import "./dashboard.css"

const menuItems: SidebarMenuItemData[] = [
	{ component: <h1>Hello</h1> },
	{
		label: "Dashboard",
		path: "/dashboard",
		notActionable: true,
		children: [
			{ label: "Page1", path: "/dashboard/page1" },
			{ label: "Page2", path: "/dashboard/page2" },
			{
				label: "Page3",
				path: "/dashboard/page3",
				icon: <House />,
			},
			{
				label: "Page4",
				path: "/dashboard/page4",
				notActionable: true,
				children: [
					{
						label: "Page5",
						path: "/dashboard/page4/page5",
					},
					{
						label: "Page6",
						path: "/dashboard/page4/page6",
					},
				],
			},
		],
	},
	{
		label: "Dashboard2",
		path: "/dashboard2",
		notActionable: true,
		children: [
			{ label: "Page1", path: "/dashboard/page1" },
			{ label: "Page2", path: "/dashboard/page2" },
			{
				label: "Page3",
				path: "/dashboard/page3",
				icon: <House />,
			},
			{
				label: "Page4",
				path: "/dashboard/page4",
				notActionable: true,
				children: [
					{
						label: "Page5",
						path: "/dashboard/page4/page5",
					},
					{
						label: "Page6",
						path: "/dashboard/page4/page6",
					},
				],
			},
		],
	},
	{ component: <h1>Hello</h1> },
];

function truncateString(str: string, maxLength: number) {
	return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}  

export default function Dashboard() {
	const location = useLocation();
	const increasePopulation = useBearStore(
		(state: any) => state.increasePopulation
	);
	return (
		<div className="dashboardContainer">
			<div className="sidebar">
				<SidebarComponent
					collpased={false}
					menuItems={menuItems}
					configuration={{
						sidebarClassName: (
							collapsed: boolean
						) => {
							return (
								classNames(
									collapsed
										? "w-18"
										: "w-64",
									"min-h-screen",
									"bg-gray-100",
									"p-4"
								) || ""
							);
						},
						sidebarItemClassName: (
							item,
							currentPath,
							isActive,
							isOpen,
							depth,
							sidebarCollapsed
						) => {
							return (
								classNames(
									!sidebarCollapsed &&
										"pl-4",
									"text-blue-600",
									"w-full"
								) || ""
							);
						},
						buttonClassName: (
							item,
							currentPath,
							isActive,
							isOpen,
							depth,
							sidebarCollapsed
						) => {
							return (
								classNames(
									"w-full",
									"flex",
									"items-center",
									"justify-between",
									!sidebarCollapsed &&
										"p-2",
									"cursor-pointer",
									"rounded-md",
									"hover:bg-gray-400",
									isActive &&
										"bg-gray-300",
									isActive &&
										"font-semibold"
								) || ""
							);
						},
						button: (
							item,
							currentPath,
							isActive,
							isOpen,
							depth,
							sidebarCollapsed
						) => {
							if (sidebarCollapsed) {
								if (item.icon) {
									return item.icon;
								} else {
									return (
										<div>
											{truncateString(
												item.label ||
													"",
												6
											)}
										</div>
									);
								}
							}
							if (
								typeof item.path ===
									"string" &&
								!item.notActionable
							) {
								return (
									<div
										className={classNames(
											"w-full flex flex-row items-center gap-2"
										)}
									>
										{
											item.icon
										}
										<NavLink
											to={
												item.path ||
												""
											}
											className="w-full"
										>
											{
												item.label
											}
										</NavLink>
									</div>
								);
							} else {
								return (
									<div>
										{
											item.label
										}
									</div>
								);
							}
						},
						childrenContainerClassName: (
							item,
							currentPath,
							isActive,
							isOpen,
							sidebarCollapsed
						) => {
							return (
								classNames(
									!sidebarCollapsed &&
										"ml-4",
									"border-l border-gray-300 gap-2 flex flex-col",
									!sidebarCollapsed &&
										"mt-2"
								) || ""
							);
						},
						expandIcon: (
							item,
							currentPath,
							isActive,
							isOpen,
							depth,
							sidebarCollapsed
						) => {
							return isOpen ? (
								<ChevronDown
									size={
										16
									}
								/>
							) : (
								<ChevronRight
									size={
										16
									}
								/>
							);
						},
					}}
				/>
			</div>

			<div className="main-content">
				<div className="topbar">
					<div>Topbar</div>
				</div>

				<div className="body flex flex-col">
					<Outlet/>
				</div>
				<div className="footer flex flex-row items-center justify-between">
					<div>Footer</div>
				</div>
			</div>
		</div>
	);
}
