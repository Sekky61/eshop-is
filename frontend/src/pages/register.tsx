import Head from 'next/head'
import { gql } from "@apollo/client";
import client from "@/common/fetch/apollo-client";
import ClientOnly from '@/common/fetch/ClientOnly';
import RegisterForm from '@/components/RegisterForm';

export default function Register() {
    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <main>
                <h1 className='heading-primary'>Create new account:</h1>
                <RegisterForm></RegisterForm>
            </main>
        </>
    )
}
