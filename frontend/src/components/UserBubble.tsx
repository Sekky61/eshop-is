import { Role, UserContext } from "@/common/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

function roleToPath(role: Role): string {
    switch (role) {
        case Role.Admin:
            return "/admin";
        case Role.Manager:
            return "/manager";
        case Role.Customer:
            return "/account";
        default:
            return "/";
    }
}

const ShoppingCart = ({ numberOfItems }: any) => {
    return (
        <Link href="/cart">
            <div className="relative rounded-full transition duration-300 ease-in-out hover:surface-4">
                <div className="w-7 h-7">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 3H4.5L6.5 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM6.07142 14H18L21 5H4.78571M11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 17.8954 7.89543 17 9 17C10.1046 17 11 17.8954 11 19Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </div>
                <div className="w-4 h-4 rounded-full bg-red-500 text-xs absolute top-1/2 left-1/2 text-center">
                    {numberOfItems}
                </div>
            </div>
        </Link>
    )
}

const UserBubble = () => {

    const router = useRouter();

    // UserContext
    const [userDetails, { logoutUser }] = useContext(UserContext);

    const showCart = userDetails.role === Role.Customer || userDetails.role === Role.AnonymousCustomer;
    const nOfItems = userDetails.basketInfo?.basketItemCount || 0;

    // Dropdown
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    }

    const onLogoutClicked = () => {
        logoutUser();
    }

    const onAccountClicked = () => {
        // redirect to account page
        router.push("/account");
    }

    const closeDropdown = () => {
        // Delay closing the dropdown to allow for the click event to fire
        setTimeout(() => {
            setOpen(false);
        }, 200);
    }

    if (userDetails.isLoggedIn) {
        let displayName;
        if (userDetails.customerInfo) {
            displayName = userDetails.customerInfo?.firstName + " " + userDetails.customerInfo?.lastName;
        } else {
            displayName = userDetails.accountInfo?.email;
        }

        let dropdownItems = [
            {
                name: "Account",
                action: onAccountClicked
            },
            {
                name: "Logout",
                action: onLogoutClicked
            }
        ]

        let managerAction = {
            name: "Manager",
            action: () => router.push("/manager")
        };

        if (userDetails.role === Role.Admin) {
            dropdownItems.unshift(managerAction);
            dropdownItems.unshift({
                name: "Admin",
                action: () => router.push("/admin")
            })
        }

        if (userDetails.role === Role.Manager) {
            dropdownItems.unshift(managerAction);
        }

        if (userDetails.role === Role.Customer) {
            dropdownItems.unshift({
                name: "Cart",
                action: () => router.push("/cart")
            })
        }

        const dropdownEls = dropdownItems.map((item) => {
            return (
                <li className="block px-2 py-2 hover:bg-primary-90" key={item.name}>
                    <button onClick={item.action} className="w-full">{item.name}</button>
                </li>
            )
        })

        return (
            <div className="flex items-center relative">
                <button onClick={toggleOpen} onBlur={closeDropdown} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="rounded-lg surface-4 focus:ring-4 font-medium text-sm px-4 py-2.5 text-center inline-flex items-center " type="button">
                    {displayName}
                    {showCart &&
                        <ShoppingCart numberOfItems={nOfItems}></ShoppingCart>
                    }
                    <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="dropdown" className={"absolute top-full z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 " + (open ? "" : "hidden")}>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        {dropdownEls}
                    </ul>
                </div>
            </div>
        );
    }
    else {
        // User is not logged in
        return (
            <div className="py-1 px-3 rounded-lg surface-4 h-10 flex items-center">
                <Link href="/login">
                    <span className="navlink">Login</span>
                </Link>
                <Link href="/register">
                    <span className="navlink">Register</span>
                </Link>
                {showCart &&
                    <ShoppingCart numberOfItems={nOfItems}></ShoppingCart>
                }
            </div>
        );
    }
}

export default UserBubble;
