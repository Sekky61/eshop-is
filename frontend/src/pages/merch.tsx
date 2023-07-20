import Head from 'next/head'
import { GetMerchDocument } from '@/generated/graphql';
import ClientOnly from '@/common/fetch/ClientOnly';
import { MerchCard } from '@/components/MerchCard';
import MerchFilter from '@/components/MerchFilter';
import { use, useEffect, useState } from 'react';
import { SearchState, getQueryArgs } from '@/common/fetch/MerchQuery';
import { useRouter } from 'next/router';
import client from '@/common/fetch/apollo-client';

function MerchListings({ filterState, canFetch }: any) {

    const [pageData, setPageData] = useState({ cursor: undefined, hasNextPage: false }); // todo reset cursor on filter change
    const [merchList, setMerchList] = useState([] as any[]);

    const appendMerchList = (newMerchList: any[]) => {
        setMerchList([...merchList, ...newMerchList]);
    };

    // pass true if you want to append to merchList
    const fetchMerch = (more: boolean) => {
        const fet = async () => {
            let variables: any = getQueryArgs(filterState);
            if (more) {
                variables = { ...variables, afterCursor: pageData.cursor };
            }
            const res = await client.query({
                query: GetMerchDocument,
                variables: variables,
            });
            // update cursor and merchList
            setPageData({ cursor: res.data.merchandise.pageInfo.endCursor, hasNextPage: res.data.merchandise.pageInfo.hasNextPage });
            if (more) {
                appendMerchList(res.data.merchandise.nodes);
            } else {
                setMerchList(res.data.merchandise.nodes);
            }
        };

        if (!canFetch) return;
        fet().catch((e) => {
            console.error(e);
        });
    };

    useEffect(() => fetchMerch(false), [filterState, canFetch]);

    let merchCards = merchList.map((merchItem: any) => {
        return <MerchCard merchInfo={merchItem} key={merchItem.name}></MerchCard>;
    });

    return (
        <div>
            {merchCards.length ? (
                <div className='grid grid-cols-2 gap-6'>
                    {merchCards}
                </div>
            ) : (
                <div className='text-center'>No merch found :(</div>
            )}
            {pageData.hasNextPage &&
                <div className='flex justify-center mt-6'>
                    <button className='button-primary' onClick={() => fetchMerch(true)}>Load more</button>
                </div>}
        </div>
    );
}

const defaultFilter: SearchState = {
    filter: {
        name: '',
        category: 'All',
        min: '',
        max: '',
    },
    count: 10,
}

function filterStateToQueryParams(filterState: SearchState) {
    let queryParams = {};
    if (filterState.filter.name) {
        queryParams = {
            ...queryParams,
            text: filterState.filter.name,
        }
    }

    if (filterState.filter.category) {
        queryParams = {
            ...queryParams,
            cat: filterState.filter.category,
        }
    }

    if (filterState.filter.min) {
        queryParams = {
            ...queryParams,
            minPrice: filterState.filter.min,
        }
    }

    if (filterState.filter.max) {
        queryParams = {
            ...queryParams,
            maxPrice: filterState.filter.max,
        }
    }

    return queryParams;
}

function queryParamsToFilterState(queryParams: any) {
    let filterState = defaultFilter;
    if (queryParams.text) {
        filterState = {
            ...filterState,
            filter: {
                ...filterState.filter,
                name: queryParams.text as string,
            }
        }
    }

    if (queryParams.cat) {
        filterState = {
            ...filterState,
            filter: {
                ...filterState.filter,
                category: queryParams.cat as string,
            }
        }
    }

    if (queryParams.minPrice) {
        filterState = {
            ...filterState,
            filter: {
                ...filterState.filter,
                min: queryParams.minPrice as string,
            }
        }
    }

    if (queryParams.maxPrice) {
        filterState = {
            ...filterState,
            filter: {
                ...filterState.filter,
                max: queryParams.maxPrice as string,
            }
        }
    }

    return filterState;
}

// Query parameters:
// text: search query (string) -- comming from search bar / filter
// cat: category (string) -- comming from category page / filter
// minPrice: min price (int) -- comming from filter
// maxPrice: max price (int) -- comming from filter
export default function MerchPage() {
    const router = useRouter();

    const [canFetch, setCanFetch] = useState(false);
    const [filterState, setFilterState] = useState<SearchState>(() => queryParamsToFilterState(router.query));

    // when query changes, update filterState
    useEffect(() => {
        if (!router.isReady) return;
        // Now that query params are ready, update filterState
        const newState = queryParamsToFilterState(router.query);
        setFilterState(newState);
        if (!canFetch) {
            setCanFetch(true);
        }
    }, [router.isReady]);

    useEffect(() => {
        router.push({
            pathname: '/merch',
            query: filterStateToQueryParams(filterState),
        },
            undefined, { shallow: true }
        )
    }, [filterState]);

    return (
        <>
            <Head>
                <title>Merchandise</title>
            </Head>
            <div className='min-h-screen flex flex-col'>
                <main className='flex-grow'>
                    <h1 className='heading-primary'>Merchandise</h1>
                    <ClientOnly>
                        <div className='flex flex-col gap-4'>
                            <MerchFilter filterState={filterState} setFilter={setFilterState}></MerchFilter>
                            <MerchListings filterState={filterState} canFetch={canFetch}></MerchListings>
                        </div>
                    </ClientOnly>
                </main>
            </div>
        </>
    );
}
