import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@/common/UserContext";
import client from "@/common/fetch/apollo-client";
import { DeleteSelfDocument } from "@/generated/graphql";

const DeleteSelfPopout = () => {
    const router = useRouter();
    const [userDetails, { logoutUser }] = useContext(UserContext);

    const handleDelete = async () => {
        try {
            const { data } = await client.mutate({
                mutation: DeleteSelfDocument,
            });

            if (data?.deleteSelf) {
                logoutUser();
                router.push("/");
            } else {
                console.warn("Failed to delete");
            }
        } catch (error) {
            console.error("An error occurred while deleting user: ", error);
        }
    };

    return (
        <div className="w-80 h-64 p-8 bg-white rounded relative ">
            <p>Are you sure you want to delete your account?</p>
            <div className="flex justify-center items-center pt-16">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleDelete}
                >
                    Yes, delete
                </button>
            </div>

        </div>
    );
};

export default DeleteSelfPopout;
