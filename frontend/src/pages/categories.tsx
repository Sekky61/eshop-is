import Head from 'next/head'
import { gql } from "@apollo/client";
import client from "@/common/fetch/apollo-client";
import { GetCategoriesDocument } from '@/generated/graphql';
import { CategoryCard } from '@/components/CategoryCard';

export default function Categories({ categories }: any) {
    const categoryCards = categories.map((category: any) => {
        return (
            <CategoryCard categoryName={category.name} key={category.name}></CategoryCard>
        )
    });

    return (
        <>
            <Head>
                <title>Categories</title>
            </Head>
            <main>
                <h1 className='heading-primary mb-6'>Categories</h1>
                <div className='grid grid-cols-2 gap-3'>
                    {categoryCards}
                </div>
            </main>
        </>
    )
}

export async function getStaticProps() {

    const categories = await client.query({
        query: GetCategoriesDocument,
    });

    return {
        props: {
            categories: categories.data.categories,
        }
    };
}
