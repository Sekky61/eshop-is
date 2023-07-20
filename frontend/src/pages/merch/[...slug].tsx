import client from '@/common/fetch/apollo-client';
import { GetMerchDocument, MerchandiseInfo } from '@/generated/graphql';
import Head from 'next/head';
import { merchNameToPath } from "@/common/Utilities";
import { SetCartItemDocument } from "@/generated/graphql";
import { useContext } from "react";
import { Role, UserContext } from "@/common/UserContext";
import { MerchCard } from '@/components/MerchCard';
import Link from 'next/link';

export default function ProductPage({ merchInfo, merch }: { merchInfo: MerchandiseInfo, merch: MerchandiseInfo[] }) {
    const [userContext, { refetchUserInfo }] = useContext(UserContext);
    const merchUrl = merchNameToPath(merchInfo.name, merchInfo.id);
    const isInStock = merchInfo.stock > 0;

    const canAddToBasket = userContext.role === Role.Customer || userContext.role === Role.AnonymousCustomer;

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
        });
        if (!success.data.setCartItem) {
            console.warn("Failed to add to basket");
        }
        await refetchUserInfo();
    };

    const merchCards = merch.map((merchandise: any) => {
        return (
            <MerchCard merchInfo={merchandise} key={merchandise.name}></MerchCard>
        )
    });

    let addToBasketButton;
    if (isAlreadyInBasket) {
        addToBasketButton = (
            <button className="h-20 bg-gray-200 text-black mt-4 rounded-lg px-4 py-2">
                Already in basket
            </button>
        );
    } else if (!isInStock) {
        addToBasketButton = (
            <button disabled className="h-20 bg-gray-200 text-black mt-4 rounded-lg px-4 py-2 disabled:cursor-not-allowed">
                Not in stock
            </button>
        );
    } else {
        addToBasketButton = (
            <button disabled={!canAddToBasket} onClick={handleAddToBasket} className="h-20 bg-red-500 mt-4 text-white rounded-lg px-4 py-2 hover:bg-red-600 disabled:cursor-not-allowed">
                Add to basket
            </button>
        );
    }

    return (
        <>
            <Head>
                <title>{merchInfo.name}</title>
            </Head>
            <main>
                <div className="flex flex-wrap gap-4 w-full p-4 bg-gray-100 rounded-lg shadow-md">
                    <div className="flex-1 flex flex-col justify-between">
                        <div className='flex gap-4 mt-4 mb-8'>
                            <div className='flex-1'>
                                <h1 className='text-2xl font-bold text-gray-700'>{merchInfo.name}</h1>
                                <div className="flex flex-col gap-4 mt-4 mb-8">
                                    <p>Price: ${merchInfo.price}</p>
                                    <p>Availability: {merchInfo.stock ? 'In Stock (' + merchInfo.stock + ' pieces)' : 'Out of Stock'}</p>
                                </div>
                            </div>
                            <div className='flex-shrink-0 flex justify-end items-start'>
                                {merchInfo.imagesUrl &&
                                    <img className="w-48 h-64" src={merchInfo.imagesUrl[0] ?? ''} alt={merchInfo.name} />
                                }
                            </div>
                        </div>
                        <div className="pt-5 pb-2">
                            <h2 className=''>Description:</h2>
                            <p className='text-lg text-gray-500'>{merchInfo.description}</p>
                        </div>
                        {addToBasketButton}
                        <h2 className="py-4 text-xl font-bold text-gray-700">Similar Items from category&nbsp;
                            <Link href={`/merch?cat=${merchInfo.categoryName}`}>
                                <span className='underline'>{merchInfo.categoryName}</span>
                            </Link>
                        </h2>
                        <div className="grid grid-cols-3 gap-2 text-center mt-4">
                            {merchCards.length > 0 ? merchCards.slice(0, 3) : <p>No similar items found</p>}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

// This gets called on every request
export async function getServerSideProps(context: any) {

    const { slug } = context.query;

    // Fetch data from external API
    const { data } = await client.query({
        query: GetMerchDocument,
        variables: {
            filter: {
                id: {
                    eq: slug[1]
                }
            }
        }
    });

    const merchList = data.merchandise.nodes;


    if (merchList.length === 0) {
        return {
            notFound: true,
        }
    }

    const category = merchList[0].categoryName;

    const similarMerch = await client.query({
        query: GetMerchDocument,
        variables: {
            filter: {
                id: {
                    neq: slug[1]
                },
                categoryName: {
                    eq: category
                }
            }
        }
    });

    const similarList = similarMerch.data.merchandise.nodes;
    console.log(similarList);

    // Pass data to the page via props
    return {
        props: {
            merchInfo: merchList[0],
            merch: similarList
        }
    }
}
