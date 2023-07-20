import { Role } from "@/common/UserContext";
import useUser from "@/common/UserContext";
import { merchNameToPath } from "@/common/Utilities";
import client from "@/common/fetch/apollo-client";
import { SetCartItemDocument } from "@/generated/graphql";
import Link from "next/link";
import { useContext } from "react";

export const MerchCard = ({ merchInfo }: any) => {
  const [userContext, { refetchUserInfo }] = useUser();
  const merchUrl = merchNameToPath(merchInfo.name, merchInfo.id);

  const isCustomer = userContext.role == Role.Customer || userContext.role == Role.AnonymousCustomer;

  let isAlreadyInBasket = false;
  if (userContext.basketInfo) {
    isAlreadyInBasket = userContext.basketInfo.items.some((merch: any) => merch.merchandiseId === merchInfo.id);
  }

  const handleAddToBasket = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Add to basket");
    let success = await client.mutate({
      mutation: SetCartItemDocument,
      variables: {
        input: {
          merchandiseId: merchInfo.id,
          quantity: 1,
        },
      },
    }).then(refetchUserInfo).catch((e) => {
      console.error(e);
      // Not authorized
    });
  };

  let addToBasketButton;
  if (isAlreadyInBasket) {
    addToBasketButton = (
      <button className="bg-gray-400/30 text-black rounded-lg px-3 py-1">
        In basket
      </button>
    );
  } else {
    addToBasketButton = (
      <button disabled={!isCustomer} onClick={handleAddToBasket} className="bg-red-500 text-white max-w-150 rounded-lg px-3 py-1 hover:bg-red-600 disabled:cursor-not-allowed">
        Add to basket
      </button>
    );
  }

  return (
    <Link href={merchUrl}>
      <div className="surface-5 border border-gray-200 rounded-lg shadow flex flex-col gap-1">
        <div className="relative overflow-hidden rounded-t-lg bg-white">
          <div className="filter-none flex justify-center items-center">
            {merchInfo.imagesUrl && (
              <img
                className="h-56 object-contain bg-center"
                src={merchInfo.imagesUrl}
                alt={merchInfo.name}
              />
            )}
          </div>
        </div>
        <div className="px-4 py-3">
          <h5 className="pb-2 text-2xl font-bold tracking-tight">{merchInfo.name}</h5>
          <p className="pb-2">{merchInfo.description}</p>
          <div className="flex-grow"></div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <p className="ml-2">${merchInfo.price}</p>
            </div>
            {addToBasketButton}
          </div>
        </div>
      </div>
    </Link>
  );
};
