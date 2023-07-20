import { createContext, useContext, useEffect, useState } from "react";
import { ApolloClient } from "@apollo/client";
import { GetMyInfoDocument, GetMyInfoQuery, LoginDocument, MutationLoginArgs, RegisterCustomerDocument, RegisterCustomerInput } from "@/generated/graphql";
import SessionChange from "./fetch/SessionChange";
import { setCookie } from 'cookies-next';
import { useRouter } from "next/router";

function setAuthCookie(role: Role) {
    setCookie('role', role);
}

// Role enum
// Must equal to what is in token
export enum Role {
    Admin,
    Manager,
    Customer,
    AnonymousCustomer,
}

const convertStringToRole = (str: string): Role | null => {
    if (Role.hasOwnProperty(str)) { // Check if string is a valid enum key
        return Role[str as keyof typeof Role]; // Access corresponding enum value
    } else {
        return null; // Return null for invalid string values
    }
};

interface UserDetailsMethods {
    getDisplayName(this: UserDetails): string;
    // Method for checking if the user is a customer or an anonymous customer
    isCustomer(this: UserDetails): boolean;
}

const userMethods: UserDetailsMethods = {
    getDisplayName: function (this: UserDetails): string {
        if (!this.accountInfo) {
            throw new Error("User has no accountInfo");
        }
        if (this.customerInfo) {
            return this.customerInfo.firstName + " " + this.customerInfo?.lastName;
        } else {
            return this.accountInfo.email;
        }
    },
    isCustomer: function (this: UserDetails): boolean {
        return this.role == Role.Customer || this.role == Role.AnonymousCustomer;
    }
}

export interface UserDetails extends GetMyInfoQuery, UserDetailsMethods {
    isLoggedIn: boolean;
    role: Role;
}

// Fetch user info from backend
// Convert to UserDetails
async function fetchUserInfo(client: ApolloClient<any>): Promise<UserDetails> {
    // query GetMyInfoDocument
    return await client.query({
        query: GetMyInfoDocument,
    }).then((res) => {
        let converted = convertQueryToUserDetails(res.data);
        return converted;
    });
}

// Convert query result to UserDetails
function convertQueryToUserDetails(data: GetMyInfoQuery): UserDetails {
    const { authentication, accountInfo, customerInfo } = data;

    let roleString = authentication.role;
    let role = convertStringToRole(roleString);

    let res: UserDetails = {
        ...data,
        ...userMethods,
        isLoggedIn: accountInfo !== null,
        role: role ?? Role.AnonymousCustomer,
    }

    return res;
}

// Method for adding an item to the basket
function addToBasket(item: string): void {
    throw new Error("Not implemented");
}

// Method for removing an item from the basket
function removeFromBasket(item: string): void {
    throw new Error("Not implemented");
}

// Method for registering a customer
async function register(client: ApolloClient<any>, input: RegisterCustomerInput): Promise<UserDetails> {
    return await client.mutate({
        mutation: RegisterCustomerDocument,
        variables: {
            input
        }
    })
        .then(async (queryRes) => SessionChange(queryRes.data.registerCustomer.token))
        .then(() => fetchUserInfo(client));
}

// Method for logging in
async function login(client: ApolloClient<any>, variables: MutationLoginArgs): Promise<UserDetails> {
    return await client.mutate({
        mutation: LoginDocument,
        variables
    })
        .then(async (queryRes) => SessionChange(queryRes.data.login.token))
        .then(() => fetchUserInfo(client));
}

// Method for logging out
function logout() {
    // For now, just remove the token
    localStorage.removeItem("token");
    // TODO
}

// Create and initialize an instance of UserContext
const defaultUserContext: UserDetails = {
    ...userMethods,
    authentication: {
        isAuthenticated: false,
        role: "AnonymousCustomer",
    },
    accountInfo: null,
    customerInfo: null,
    isLoggedIn: false,
    role: Role.AnonymousCustomer,
}

const defaultUserContextMutator: UserContextMutator = {
    refetchUserInfo: () => { return Promise.resolve() },
    registerUser: (input: RegisterCustomerInput) => { return Promise.resolve() },
    loginUser: (variables: MutationLoginArgs) => { return Promise.resolve() },
    logoutUser: () => { },
}

interface UserContextMutator {
    refetchUserInfo: () => Promise<void>;
    registerUser: (input: RegisterCustomerInput) => Promise<void>;
    loginUser: (variables: MutationLoginArgs) => Promise<void>;
    logoutUser: () => void;
}

type UserContextType = [UserDetails, UserContextMutator];

// Create a context for UserContext
export const UserContext = createContext<UserContextType>([defaultUserContext, defaultUserContextMutator]);

export const UserContextProvider = ({ children, apolloClient }: any) => {

    const [userDetails, setUserDetails] = useState<UserDetails>(
        defaultUserContext
    );

    const router = useRouter();

    // Initial fetch of user info
    useEffect(() => {
        fetchUserInfo(apolloClient).then((data: any) => {
            let newUserData = {
                ...userDetails,
                ...data,
            };
            setUserDetails(newUserData);
            setAuthCookie(newUserData.role);
        }).catch((e: any) => {
            console.error(e);
        });
    }, []);

    const refetchUserInfo = async () => {
        return await fetchUserInfo(apolloClient).then((data: any) => {
            let newUserData = {
                ...userDetails,
                ...data,
            };
            setUserDetails(newUserData);
            setAuthCookie(newUserData.role);
        });
    }

    const registerUser = async (input: RegisterCustomerInput) => {
        return await register(apolloClient, input).then((data: any) => {
            let newData = {
                ...userDetails,
                ...data,
            };
            console.log("Incoming data:")
            console.log(data);
            setUserDetails(newData);
        });
    }

    const loginUser = async (variables: MutationLoginArgs) => {
        return await login(apolloClient, variables).then((data: any) => {
            let newData = {
                ...userDetails,
                ...data,
            };
            setUserDetails(newData);
            // Set cookie for middleware
            setAuthCookie(newData.role);
        });
    }

    const logoutUser = async () => {
        logout();
        setUserDetails(defaultUserContext)
        // Set cookie for middleware
        setAuthCookie(defaultUserContext.role);
        router.push("/");
    }

    return (
        <UserContext.Provider value={[userDetails, { refetchUserInfo, registerUser, loginUser, logoutUser }]}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = (): UserContextType => {
    const x = useContext(UserContext);
    return x
}

export default useUser;

