import Head from 'next/head'
import client from "@/common/fetch/apollo-client";
import { GetCategoriesDocument, GetMerchDocument } from '@/generated/graphql';
import { CategoryCard } from '@/components/CategoryCard';
import { useState } from 'react';
import { MerchCard } from '@/components/MerchCard';


export default function Home({ categories, merch }: any) {
  const [isOpen, setIsOpen] = useState(true);

  function handleClose() {
    setIsOpen(false);
  }

  const categoryCards = categories.map((category: any) => {
    return (
      <CategoryCard categoryName={category.name} key={category.name}></CategoryCard>
    )
  });

  const merchCards = merch.map((merchandise: any) => {
    return (
      <MerchCard merchInfo={merchandise} key={merchandise.name}></MerchCard>
    )
  });



  function Popup({ handleClose }: { handleClose: () => void }) {

    const handlePopupClose = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setIsOpen(false);
      handleClose();
    }

    return (
      <div className={`popup-window ${isOpen ? 'open' : ''}`}>
        <div className="hidden md:flex fixed bottom-0 left-0 right-0 bg-white p-4 shadow" style={{ justifyContent: 'center', maxWidth: '1600px' }}>
          <p className='lg:w-1/4 md:1/2'>Hey there! Do you want to receive updates about our products and promotions? Enter your email below:</p>
          <form className="mt-4">
            <input type="email" placeholder="Enter your email" className="border border-gray-300 rounded px-4 py-2 w-full" />
            <button className="button-primary">Subscribe</button>
            <button onClick={handlePopupClose} className="bg-red-500 text-white rounded px-4 py-2 ml-5 mt-4">Close</button>
          </form>
        </div>
      </div>
    );
  }

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
          <h3 className='mb-5'>You may like:</h3>

          <div className='sm:grid sm:grid-cols-3 sm:gap-4'>
            {merchCards.slice(0, 3)}
          </div>
        </div>

        <div className='mb-4'>
          <h3 className='mb-5'>Available categories:</h3>
          <div className='sm:grid sm:grid-cols-3 sm:gap-4'>
            {categoryCards}
          </div>
        </div>
      </main>

      {isOpen && <Popup handleClose={handleClose} />}
    </>
  )
}

// This is how to statically load data from GraphQL
export async function getStaticProps() {

  const categories = await client.query({
    query: GetCategoriesDocument,
  });

  const merchandise = await client.query({
    query: GetMerchDocument,
  });

  const merch = merchandise.data.merchandise.nodes;
  const randomMerch = merch.sort(() => 0.5 - Math.random());

  return {
    props: {
      categories: categories.data.categories,
      merch: merchandise.data.merchandise.nodes,
    }
  };
}
