import Head from 'next/head'
import { gql } from "@apollo/client";
import client from "@/common/fetch/apollo-client";
import ClientOnly from '@/common/fetch/ClientOnly';

export default function fourOhThree() {
    return (
        <>
            <Head>
                <title>403 bro</title>
            </Head>
            <main>
                <h1 className='text-8xl'>403</h1>
                <span className='text-2xl'>Game over</span>
                <p className='pb-2'>
                    I suggest you to go back to the previous page as this page is forbidden for you.
                </p>
            </main>
        </>
    )
}
