import { GetCategoriesDocument } from '@/generated/graphql';
import { createContext, useEffect, useState } from 'react';
import { SearchState } from './fetch/MerchQuery';

const defaultFilter: SearchState = {
    filter: {
        name: '',
        category: '',
        min: '',
        max: '',
    },
    count: 10,
}

export const FilterContext = createContext({
    filter: defaultFilter,
    setFilter: (filter: any) => { },
});

type Categories = {
    categoriesList: Category[];
}

type Category = {
    name: string;
}

export const CategoryContext = createContext<Categories>({
    categoriesList: [],
});

export const CategoryContextProvider = ({ children, apolloClient }: any) => {

    const [categories, setCategories] = useState<Categories>(
        { categoriesList: [] }
    );

    // Initial fetch of user info
    useEffect(() => {
        apolloClient.query({
            query: GetCategoriesDocument,
        }).then((result: any) => {
            setCategories({
                categoriesList: result.data.categories.map((category: any) => {
                    return {
                        name: category.name,
                    }
                }),
            });
        });
    }, []);

    return (
        <CategoryContext.Provider value={categories} >
            {children}
        </CategoryContext.Provider>
    );
};

