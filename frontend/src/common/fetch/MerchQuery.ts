import { GetMerchQueryVariables, MerchandiseInfoFilterInput } from "@/generated/graphql";

// State of search component
export interface SearchState {
    filter: {
        name: string;
        category: string;
        min: string;
        max: string;
    };
    count: number;
    afterCursor?: string;
}

export interface PriceFilter {
    minPrice?: number;
    maxPrice?: number;
}


// Produce query arguments given the state of the search component
export const getQueryArgs = (searchState: SearchState): GetMerchQueryVariables => {
    const { filter, count, afterCursor } = searchState;

    const args: GetMerchQueryVariables = {
        count,
    };

    let graphQLFilter: MerchandiseInfoFilterInput = {};

    // add name filter
    // Dirty hack to always include filter
    graphQLFilter.name = {};
    graphQLFilter.name.contains = filter.name;

    // Add category filter
    if (filter.category && filter.category !== "All" && filter.category !== "") {
        graphQLFilter.categoryName = {};
        graphQLFilter.categoryName.eq = filter.category;
    }

    // Price filter
    const { min, max } = filter;
    const minPrice = parseInt(min);
    const maxPrice = parseInt(max);
    if (minPrice && maxPrice && minPrice > maxPrice) {
        console.warn("Min price cannot be greater than max price");
    } else {
        if (minPrice) {
            graphQLFilter.price = graphQLFilter.price || {};
            graphQLFilter.price.gte = minPrice;
        }
        if (maxPrice) {
            graphQLFilter.price = graphQLFilter.price || {};
            graphQLFilter.price.lte = maxPrice;
        }
    }

    // add filter to args
    if (Object.keys(graphQLFilter).length > 0) {
        args.filter = graphQLFilter;
    }

    // add after cursor to args
    if (afterCursor) {
        args.afterCursor = afterCursor;
    }

    return args;
}



/*
 * const { data, loading, error } = useGetMerchQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      count: // value for 'count'
 *      afterCursor: // value for 'afterCursor'
 *   },
 * });
*/