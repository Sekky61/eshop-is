import Link from "next/link";
import { Router, useRouter } from "next/router";
import ClientOnly from "../fetch/ClientOnly";
import UserBubble from "@/components/UserBubble";

const linksToDisplay = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Categories",
        href: "/categories",
    },
    {
        label: "Merch",
        href: "/merch",
    }
];

const Header = () => {

    const router = useRouter();

    const navLinks = linksToDisplay.map((link) => {
        const isActive = router.route === link.href;
        return (
            <li key={link.label}>
                <Link href={link.href}>
                    <span className={"navlink " + (isActive ? "navlink-active" : "")}>{link.label}</span>
                </Link>
            </li>
        );
    });

    const handleKeyDown = async (e: any) => {
        if (e.key === "Enter") {
            console.log("Enter pressed");
            // Go to /search?q=whatever

            const searchQuery = e.target.value;
            console.log(searchQuery);

            await router.push({
                pathname: '/merch',
                query: { text: searchQuery },
            })
        }
    };

    return (
        <div className="neutral-bg sticky top-0 w-full border-b divide-slate-500 z-10">
            <div className="surface-1">
                <div className="large-container py-3">
                    <div className="flex gap-3 items-center px-2">
                        <Link href="/">
                            <span className="whitespace-nowrap text-2xl">CZCZC.CZ</span>
                        </Link>
                        <div className="flex-grow">
                            <div className="flex justify-center">

                                <div className="relative hidden md:block">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <input onKeyDown={handleKeyDown} type="text" id="search-navbar" className=" lg:max-w-300 max-w-150 block w-64 px-2 py-1.5 pl-10 text-sm text-gray-900 border border-gray-400 rounded-full bg-gray-50" placeholder="Search..." />
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center text-sm">
                            <nav>
                                <ul className="flex space-x-5">
                                    {navLinks}
                                </ul>
                            </nav>
                        </div>
                        <ClientOnly>
                            <UserBubble />
                        </ClientOnly>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header