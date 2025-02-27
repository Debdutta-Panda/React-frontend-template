import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SidbarConfiguration, SidebarMenuItemData } from "./sidebar.type";

export type SidebarItemProps = {
	item: SidebarMenuItemData;
	currentPath: string;
	depth: number;
	configuration: SidbarConfiguration;
	sidebarCollapsed: boolean;
};

const SidebarItem = ({
	item,
	currentPath,
	configuration,
	depth,
  sidebarCollapsed
}: SidebarItemProps) => {
	const isActive = item.component
		? false
		: item.path
		? currentPath.startsWith(item.path)
		: false;
	const [isOpen, setIsOpen] = useState(isActive);
	useEffect(() => {
		setIsOpen(isActive);
	}, [isActive]);
	if (item.component) {
		return item.component;
	}
	return (
		<div
			className={configuration.sidebarItemClassName(
				item,
				currentPath,
				isActive,
				isOpen,
				depth,
        sidebarCollapsed
			)}
		>
			<div
				className={configuration.buttonClassName(
					item,
					currentPath,
					isActive,
					isOpen,
					depth,
          sidebarCollapsed
				)}
				onClick={() => setIsOpen(!isOpen)}
			>
				{configuration.button(
					item,
					currentPath,
					isActive,
					isOpen,
					depth,
          sidebarCollapsed
				)}
				{!sidebarCollapsed && !item.component &&
					(item.children?.length || 0) > 0 &&
					configuration.expandIcon(
						item,
						currentPath,
						isActive,
						isOpen,
						depth,
            sidebarCollapsed
					)}
			</div>
			{!sidebarCollapsed && isOpen && item.children && (
				<div
					className={configuration.childrenContainerClassName(
						item,
						currentPath,
						isActive,
						isOpen,
						depth,
            sidebarCollapsed
					)}
				>
					{item.children.map((child) => (
						<SidebarItem
							key={child.path}
							item={child}
							currentPath={
								currentPath
							}
							configuration={
								configuration
							}
							depth={depth + 1}
              sidebarCollapsed={sidebarCollapsed}
						/>
					))}
				</div>
			)}
		</div>
	);
};

type SidebarComponentProps = {
	menuItems: SidebarMenuItemData[];
	configuration: SidbarConfiguration;
	collpased: boolean;
};

const SidebarComponent = ({
	menuItems,
	configuration,
	collpased,
}: SidebarComponentProps) => {
	const location = useLocation();
	return (
		<div className={configuration.sidebarClassName(collpased)}>
			{menuItems.map((item,index) => (
				<SidebarItem
					key={(item.path||"")+index}
					item={item}
					currentPath={location.pathname}
					configuration={configuration}
					depth={0}
					sidebarCollapsed={collpased}
				/>
			))}
		</div>
	);
};

export default SidebarComponent;
