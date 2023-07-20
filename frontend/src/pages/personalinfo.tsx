import Head from 'next/head'
import { gql } from "@apollo/client";
import client from "@/common/fetch/apollo-client";
import ClientOnly from '@/common/fetch/ClientOnly';
import RegisterForm from '@/components/RegisterForm';
import PersonalInfoForm from '@/components/PersonalInfoForm';
import CreditCardForm from '@/components/CreditCardForm';
import { TypeOf, object, string } from 'zod';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/common/UserContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateCustomerDocument, UpdateCustomerInput } from '@/generated/graphql';
import { userInfoDiff } from '@/common/Utilities';
import { Button, TextField } from '@mui/material';
import InputField from '@/components/InputField';

const updateInfoSchema = object({
    firstName: string()
        .nonempty('First name is required')
        .max(32, 'Name must be less than 32 characters'),
    lastName: string()
        .nonempty('Last name is required')
        .max(32, 'Name must be less than 32 characters'),
    phoneNumber: string().nonempty('Phone number is required'),
    street: string().nonempty('Street is required'),
    city: string().nonempty('City is required'),
    postalCode: string().nonempty('Postal code is required'),
    state: string().nonempty('State is required'),
    cardNumber: string().nonempty('Card number is required'),
    ccv: string().nonempty('CCV is required'),
    expirationDate: string().nonempty('Expiration date is required'),
    cardHolderName: string().nonempty('Card holder name is required'),
});

type UpdateInputSchema = TypeOf<typeof updateInfoSchema>;

export default function Personalinfo() {
    const router = useRouter();

    const [userDetails, { }] = useContext(UserContext);

    const myId = userDetails.accountInfo?.id;

    console.log(userDetails)

    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
        getValues,
        setValue
    } = useForm<UpdateInputSchema>({
        resolver: zodResolver(updateInfoSchema),
    });

    // fill in the form with the user's info
    useEffect(() => {
        if (userDetails == null) {
            return;
        }
        if (userDetails.customerInfo == null || userDetails.customerInfo.address == null) {
            console.warn("No customer info");
            return;
        }

        setValue("firstName", userDetails.customerInfo.firstName);
        setValue("lastName", userDetails.customerInfo.lastName);
        setValue("phoneNumber", userDetails.customerInfo.phoneNumber);
        setValue("street", userDetails.customerInfo.address.street);
        setValue("city", userDetails.customerInfo.address.city);
        setValue("postalCode", userDetails.customerInfo.address.postalCode);
        setValue("state", userDetails.customerInfo.address.state);

        if (userDetails.customerInfo.paymentInformation == null) {
            return;
        }

        setValue("cardNumber", userDetails.customerInfo.paymentInformation.cardNumber);
        setValue("ccv", userDetails.customerInfo.paymentInformation.ccv);
        setValue("expirationDate", userDetails.customerInfo.paymentInformation.expirationDate);
        setValue("cardHolderName", userDetails.customerInfo.paymentInformation.cardHolderName);
    }, [userDetails]);


    const OnSubmit = async (e: any) => {
        e.preventDefault();

        // Get values
        const values = getValues();
        console.log(values);

        // Create input
        const input = userInfoDiff(userDetails, values);

        if (input === null) {
            return;
        }

        // Update
        const res = await client.mutate({
            mutation: UpdateCustomerDocument,
            variables: {
                input: input,
                customerId: myId
            }
        });
    };

    return (
        <>
            <Head>
                <title>Personal Info</title>
            </Head>
            <main>
                <h1 className='heading-primary'>Update your personal info:</h1>
                <form onSubmit={handleSubmit(OnSubmit)} >
                    <div className='flex flex-col gap-6'>

                        <div className="flex gap-2">
                            <InputField register={register} errors={errors} name="firstName" labelText='First Name'></InputField>
                            <InputField register={register} errors={errors} name="lastName" labelText='Last Name'></InputField>
                        </div>
                        <div>
                            <PersonalInfoForm register={register} errors={errors}></PersonalInfoForm>
                        </div>
                        <div>
                            <CreditCardForm register={register} errors={errors}></CreditCardForm>
                        </div>
                    </div>
                    <button className="button-primary mt-2" type='submit'>Update</button>
                </form>
            </main>
        </>
    )
}
