import GetRoleFromToken from "@/common/RoleGetter";
import useUser from "@/common/UserContext";
import { useGetMyInfoQuery } from "@/generated/graphql";
import { useContext } from "react";

export const RoleChecker = () => {

    const [userDetails, { refetchUserInfo, loginUser }] = useUser();

    let role = GetRoleFromToken();

    if (role === null) {
        role = "null";
    }
    const { data, loading, error, refetch } = useGetMyInfoQuery();

    if (loading) {
        return (<h2>Loading...</h2>);
    }

    const backendRole = data?.authentication.role;

    const token = localStorage.getItem("token");

    console.log(`Render role checker`)
    console.dir(userDetails)

    return (
        <div className="w-64 break-all p-2 rounded border-green-300 border-2">
            <h1>Role Checker</h1>
            <p>Token says your role is: {role}</p>
            <p>Backend says the request has been done with role: {backendRole}</p>
            <p>Token: {token}</p>
            <p>User context: {JSON.stringify(userDetails)}</p>
        </div>
    );
}