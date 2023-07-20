import Head from 'next/head'
import client from "@/common/fetch/apollo-client";
import { GetCategoriesDocument } from '@/generated/graphql';
import { CategoryCard } from '@/components/CategoryCard';
import { useState } from 'react';


export default function Home({ categories }: any) {
  return (
    <>
      <Head>
        <title>Basket</title>
      </Head>
      
      <main>
        <div>
            <h1 className='text-center text-4xl font-bold my-8'>
              Welcome to CZCZC.CZ.<br/> What do you want to buy?
            </h1>
        </div>
          <div className='mb-4'>
            <h3 className='mb-5'>Favourite merchandise:</h3>
          
            <div className='sm:grid sm:grid-cols-3 sm:gap-4'>
              <div className='bg-gray-200 text-center p-4 my-1'>Favourite</div>
              <div className='bg-gray-200 text-center p-4 my-1'>Favourite</div>
              <div className='bg-gray-200 text-center p-4 my-1'>Favourite</div>
            </div>
          </div>
          <div className='mb-4'>
          <h3 className='mb-5'>Available categories:</h3>
          
          </div>
      </main>
    </>
  )
}
