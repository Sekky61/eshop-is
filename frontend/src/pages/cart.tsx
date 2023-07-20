import { UserContext } from "@/common/UserContext";
import { merchNameToPath } from "@/common/Utilities";
import ClientOnly from "@/common/fetch/ClientOnly";
import client from "@/common/fetch/apollo-client";
import { SetCartItemDocument } from "@/generated/graphql";
import Link from "next/link";
import { useContext, useState } from "react";

const BasketItem = ({ basketItem, onQuantityChange, onRemoveClick }: any) => {
    const { merchandise, quantity } = basketItem;
    const [selectedQuantity, setSelectedQuantity] = useState(basketItem.quantity);

    const link = merchNameToPath(merchandise.name, merchandise.id); // Placeholder link, replace with your actual link or remove if not needed

    const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const newQuantity = parseInt(e.target.value);
        setSelectedQuantity(newQuantity);

        onQuantityChange(merchandise.id, newQuantity);
    };

    const handleRemoveClick = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        onRemoveClick(merchandise.id); // Call parent function with item id to remove
    };

    return (
        <Link href={link}>
            <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
                <div className="flex items-center">
                    <div className="text-gray-800">
                        <h2 className="text-lg font-semibold">{merchandise.name}</h2>
                        <p className="text-sm">{(merchandise.price * basketItem.quantity).toFixed(2)} USD</p>
                    </div>
                </div>
                <div className="text-gray-800 flex items-center">
                    <select
                        value={selectedQuantity}
                        onChange={handleQuantityChange}
                        onClick={(e) => { e.stopPropagation(); e.preventDefault() }}
                        className="bg-gray-100 px-2 py-1 rounded-md mr-2"
                    >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleRemoveClick}
                        className="button"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </Link>
    );
};

const CartPageContent = () => {
    const [userContext, { refetchUserInfo }] = useContext(UserContext);

    const basket = userContext?.basketInfo;

    const nOfItems = basket?.items.reduce((acc, item) => acc + item.quantity, 0);
    const canCheckout = nOfItems && nOfItems > 0;

    if (!basket) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-semibold">Your cart is empty</h1>
            </div>
        );
    }

    const handleRemove = async (merchandiseId: number) => {
        let res = await client.mutate({
            mutation: SetCartItemDocument,
            variables: {
                input: {
                    merchandiseId,
                    quantity: 0,
                },
            },
        });

        await refetchUserInfo();
    }

    const changeQuantity = async (merchandiseId: number, quantity: number) => {
        let res = await client.mutate({
            mutation: SetCartItemDocument,
            variables: {
                input: {
                    merchandiseId,
                    quantity,
                },
            },
        });

        await refetchUserInfo();
    }

    // Calculate total cost and total items
    const totalCost = basket.items.reduce((acc, item) => acc + item.merchandise.price * item.quantity, 0).toFixed(2);
    const totalItems = basket.items.reduce((acc, item) => acc + item.quantity, 0);

    const basketEls = basket.items.map((item) => {
        return (
            <li key={item.merchandiseId} className="mb-2">
                <BasketItem basketItem={item} onQuantityChange={changeQuantity} onRemoveClick={handleRemove} />
            </li>
        );
    });

    return (
        <div>
            <ul className="flex flex-col gap-2">{basketEls}</ul>
            <div className="grid grid-cols-3 grid-rows-2">
                <div className="p-4 font-semibold">
                    Total cost:
                </div>
                <div className="p-4 font-semibold">
                    {totalCost} USD
                </div>
                <div className="row-span-2 flex items-center justify-center">
                    <Link href="/checkout" className={canCheckout ? "" : "pointer-events-none "}>
                        <div className={"button-primary " + (canCheckout ? "" : "pointer-events-none bg-gray-500")}>Checkout</div>
                    </Link>
                </div>
                <div className="p-4 font-semibold">
                    Total items:
                </div>
                <div className="p-4 font-semibold">
                    {totalItems}
                </div>
            </div>
        </div>
    );
};



const CartPage = () => {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Cart</h1>
            <ClientOnly>
                <CartPageContent></CartPageContent>
            </ClientOnly>
        </div>
    );
};

export default CartPage;
