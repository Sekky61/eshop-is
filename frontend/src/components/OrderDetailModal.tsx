import { merchNameToPath } from "@/common/Utilities";
import client from "@/common/fetch/apollo-client";
import Link from "next/link";
import { useEffect } from "react";


const OrderDetailModal = ({ order }: any) => {

    const itemsList = order.merchandises.map((item: any) => {
        const linkTarget = merchNameToPath(item.merchandise.name, item.merchandiseId);
        return (
            <div className="flex gap-2 flex-nowrap" key={item.merchandiseId}>
                <div className="hover:underline">
                    <Link href={linkTarget}>{item.merchandise.name}</Link>
                </div>
                <div className="">{item.quantity}</div>
                <div>${item.price}</div>
            </div>
        );
    });

    return (
        <div className="bg-white rounded-lg p-6 small-container">
            <h2 className="text-2xl font-bold mb-2">Order Detail</h2>
            <div className="flex flex-col gap-2">
                Items:
                <div className="flex flex-col gap-2">
                    {itemsList}
                </div>
            </div>
        </div>
    )

}

export default OrderDetailModal;
