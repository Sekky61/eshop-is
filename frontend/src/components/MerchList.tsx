import useUser from "@/common/UserContext";
import { merchNameToPath } from "@/common/Utilities";
import { useContext, useState } from "react";
import DeleteSelfPopout from "./DeleteSelfPopout";
import Modal from "./Modal";
import EditStockPopup from "./EditStockPopup";

export const MerchList = ({ merchInfo }: any) => {
    const [userContext, { refetchUserInfo }] = useUser();
    const merchUrl = merchNameToPath(merchInfo.name, merchInfo.id);
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleEdit = async (e: any) => {
        e.preventDefault();
        setShowModal(true);
    };

    let editButton = (
        <Modal show={showModal} handleClose={handleCloseModal}>
            <EditStockPopup merch={merchInfo} onClose={() => setShowModal(false)}></EditStockPopup>
        </Modal>
    );


    return (
        <div className="h-full w-full pb-2">
            <div className="h-full w-full p-6 surface-1 border border-gray-200 rounded-lg shadow primary-cont">
                <div className="flex items-center justify-between mb-4 h-12">
                    <h5 className="text-2xl font-extrabold tracking-tight">{merchInfo.name}</h5>
                    <button className="button-primary" onClick={handleEdit}>Edit</button>
                    {editButton}
                </div>
                <p>{merchInfo.description}</p>
                <div className="flex-grow"></div>
                <div className="flex justify-between items-center">
                    <div className="items-center">
                        <p>Price: {merchInfo.price} $</p>
                        <p>Stock: {merchInfo.stock}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
