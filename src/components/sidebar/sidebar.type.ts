import { JSX } from "react";


export type SidebarMenuNodeItemData = {
	label?: string;
	path?: string;
	children?: SidebarMenuItemData[];
	component?: JSX.Element;
	notActionable?: boolean;
	icon?: JSX.Element;
	data?: any;
}

export type SidebarMenuItemData = SidebarMenuNodeItemData;

export type SidbarConfiguration = {
	sidebarItemClassName: (
		item: SidebarMenuItemData,
		currentPath: string,
		isActive: boolean,
		isOpen: boolean,
		depth: number,
		sidebarCollapsed: boolean
	) => string;
    buttonClassName: (
		item: SidebarMenuItemData,
		currentPath: string,
		isActive: boolean,
		isOpen: boolean,
		depth: number,
		sidebarCollapsed: boolean
	) => string;
    button: (
		item: SidebarMenuItemData,
		currentPath: string,
		isActive: boolean,
		isOpen: boolean,
		depth: number,
		sidebarCollapsed: boolean
	) => JSX.Element;
    childrenContainerClassName: (
		item: SidebarMenuItemData,
		currentPath: string,
		isActive: boolean,
		isOpen: boolean,
		depth: number,
		sidebarCollapsed: boolean
	) => string;
    expandIcon: (
		item: SidebarMenuItemData,
		currentPath: string,
		isActive: boolean,
		isOpen: boolean,
		depth: number,
		sidebarCollapsed: boolean
	) => JSX.Element;
	sidebarClassName: (collapsed: boolean)=> string;
};