import Head from 'next/head'
import client from "@/common/fetch/apollo-client";
import { GetCategoriesDocument, GetMerchDocument, GetMerchQueryResult, GetMerchQueryVariables, MerchandiseInfo } from '@/generated/graphql';
import { CategoryCard } from '@/components/CategoryCard';
import { MerchCard } from '@/components/MerchCard';

const SHOWCASE_ITEMS_COUNT = 3;

export default function Home({ categories, merch }: { categories: any, merch: MerchandiseInfo[] }) {

  const merchCards = merch.map((merchandise: any) => {
    return (
      <MerchCard merchInfo={merchandise} key={merchandise.name}></MerchCard>
    )
  });

  const categoryCards = categories.map((category: any) => {
    return (
      <CategoryCard categoryName={category.name} key={category.name}></CategoryCard>
    )
  });

  return (
    <>
      <Head>
        <title>CZCZC.CZ</title>
      </Head>

      <main>
        <div>
          <h1 className='text-center text-4xl font-bold my-8'>
            Welcome to CZCZC.CZ.<br /> What do you want to buy?
          </h1>
        </div>

        <div className='mb-4'>
          <h2 className='mb-3 mt-1 text-lg'>You may like:</h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {merchCards}
          </div>
        </div>

        <div className='mb-4'>
          <h2 className='mb-3 mt-1 text-lg'>Available categories:</h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {categoryCards}
          </div>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {

  const categories = await client.query({
    query: GetCategoriesDocument,
  });

  const merch_vars: GetMerchQueryVariables = {
    count: SHOWCASE_ITEMS_COUNT,
  };

  const merchandise = await client.query({
    query: GetMerchDocument,
    variables: merch_vars,
  }) as GetMerchQueryResult;

  if (merchandise.error) {
    throw new Error(merchandise.error.message);
  }

  if (!merchandise.data || !merchandise.data.merchandise || !merchandise.data.merchandise.nodes) {
    throw new Error("No merchandise data.");
  }

  // TODO: Create showcase query, that will randomise on server
  const merch = merchandise.data.merchandise.nodes;
  merch.sort(() => 0.5 - Math.random());

  return {
    props: {
      categories: categories.data.categories,
      merch,
    }
  };
}
