import useUser, { Role, UserContext } from "@/common/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const UserBubble = () => {
    const [userDetails] = useUser();

    if (userDetails.isLoggedIn) {
        return <LoggedInBubble></LoggedInBubble>
    }
    else {
        return <LoggedOutBubble></LoggedOutBubble>
    }
}

// Shopping cart icon. Shows the number of items in the cart.
const ShoppingCartIcon = () => {
    const [userContext] = useUser();
    const numberOfItems = userContext.basketInfo?.basketItemCount || 0;

    const cartIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="fill-primary-40">
            <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
    );

    return (
        <Link href="/cart">
            <div className="relative rounded-full transition duration-300 ease-in-out hover:surface-4">
                <div className="w-6 h-6">
                    {cartIcon}
                </div>
                <div className="w-4 h-4 rounded-full bg-red-500 text-[10px] text-white absolute bottom-1/2 left-1/2 text-center">
                    {numberOfItems}
                </div>
            </div>
        </Link>
    )
}

// User is not logged in
const LoggedOutBubble = () => {
    return (
        <div className="py-1 px-3 rounded-lg surface-4 h-10 flex items-center">
            <Link href="/login">
                <span className="navlink">Login</span>
            </Link>
            <Link href="/register">
                <span className="navlink">Register</span>
            </Link>
            <ShoppingCartIcon></ShoppingCartIcon>
        </div>
    );
}

const Dropdown = ({ items }: { items: { name: string, action: () => void }[] }) => {

    const dropdownEls = items.map((item) => {
        return (
            <li className="block px-2 py-1.5 my-1 hover:bg-primary-90" key={item.name}>
                <button onClick={item.action} className="w-full">{item.name}</button>
            </li>
        )
    });

    return (
        <div className={"opacity-0 -translate-y-4 group-focus:opacity-100 group-focus:translate-y-0 absolute top-full mt-2 bg-white rounded shadow w-full transition duration-300"}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {dropdownEls}
            </ul>
        </div>
    )
}

const LoggedInBubble = () => {
    const router = useRouter();

    const [userDetails, { logoutUser }] = useUser();
    const displayName = userDetails.getDisplayName();
    const showCart = userDetails.isCustomer();

    const accountItem =
    {
        name: "Account",
        action: () => router.push("/account")
    };

    const logoutItem =
    {
        name: "Logout",
        action: () => logoutUser()
    };

    const managerItem = {
        name: "Manager",
        action: () => router.push("/manager")
    };

    const adminItem = {
        name: "Admin",
        action: () => router.push("/admin")
    };

    let dropdownItems;
    switch (userDetails.role) {
        case Role.Customer:
            dropdownItems = [accountItem, logoutItem];
            break;
        case Role.Manager:
            dropdownItems = [managerItem, accountItem, logoutItem];
            break;
        case Role.Admin:
            dropdownItems = [adminItem, accountItem, logoutItem];
            break;
        default:
            throw new Error(`Invalid role ${userDetails.role}`);
    }

    const arrowDown = (
        <svg className={"w-4 h-4 ml-2 duration-100 group-focus:rotate-180 "} aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
    );

    return (
        <button className="flex items-center relative group">
            <div className="rounded surface-4 font-medium text-sm px-4 py-2.5 flex items-center gap-2">
                {displayName}
                {showCart &&
                    <ShoppingCartIcon></ShoppingCartIcon>
                }
                {arrowDown}
            </div>
            <Dropdown items={dropdownItems}></Dropdown>
        </button>
    );

}

export default UserBubble;
