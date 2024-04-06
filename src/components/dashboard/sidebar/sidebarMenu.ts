import path from 'path';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';

export const sideBarItem = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: HiArrowSmRight
    },
    {
        title: "Create Product",
        path: "/dashboard/create-product",
        icon: HiChartPie
    },
    {
        title: "Account",
        path: "/dashboard/account",
        icon: HiChartPie
    },
    {
        title: "Setting",
        path: "/dashboard/setting",
        icon: HiViewBoards
    },
]