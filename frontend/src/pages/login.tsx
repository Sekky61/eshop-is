import Head from 'next/head'
import { gql } from "@apollo/client";
import client from "@/common/fetch/apollo-client";
import ClientOnly from '@/common/fetch/ClientOnly';
import { RoleChecker } from '@/components/RoleChecker';
import LoginForm from '@/components/LoginForm';

export default function Login() {
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <main>
                <h1 className="heading-primary py-4 lg:text-center">Please login:</h1>
                <div className="lg:flex justify-center items-center mb-5">
                    <LoginForm></LoginForm>
                </div>
            </main>
        </>
    )
}
