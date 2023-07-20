// middleware.ts
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { Role } from "./common/UserContext";

const protectedPaths = [
    {
        path: "/admin",
        role: Role.Admin,
    },
    {
        path: "/manager",
        role: Role.Manager,
    },
    {
        path: "/account",
        role: Role.Customer,
    }
];

// User can access if path starts with one of the protected paths and role is equal or higher
// or if path is not in the protected paths
function canAccess(path: string, role: number) {
    for (const protectedPath of protectedPaths) {
        if (path.startsWith(protectedPath.path)) {
            if (role <= protectedPath.role) {
                return true;
            } else {
                return false;
            }
        }
    }
    return true;
}

export async function middleware(request: NextRequest, _next: NextFetchEvent) {

    const role = request.cookies.get('role');
    const roleValue = parseInt(role?.value || "3", 10);
    const { pathname } = request.nextUrl;

    if (canAccess(pathname, roleValue)) {
        return NextResponse.next();
    }

    // Redirect to login page if role is 3 (AnonymousCustomer)
    if (roleValue === Role.AnonymousCustomer) {
        const url = new URL(`/login`, request.url);
        url.searchParams.set("callbackUrl", encodeURI(request.url));
        return NextResponse.redirect(url);
    }

    // show 403
    const url = new URL(`/403`, request.url);
    return NextResponse.rewrite(url);
}