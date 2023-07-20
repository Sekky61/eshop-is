import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import PersonalInfoForm from '@/components/PersonalInfoForm';
import { TypeOf, literal, object, string } from 'zod';
import CreditCardForm from '@/components/CreditCardForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { merchNameToPath } from '@/common/Utilities';
import client from '@/common/fetch/apollo-client';
import { OrderDocument } from '@/generated/graphql';
import useUser from '@/common/UserContext';

const orderSchema = object({
    phoneNumber: string().nonempty('Phone number is required'),
    street: string().nonempty('Street is required'),
    city: string().nonempty('City is required'),
    postalCode: string().nonempty('Postal code is required'),
    state: string().nonempty('State is required'),
    cardNumber: string().nonempty('Card number is required'),
    ccv: string().nonempty('CCV is required'),
    expirationDate: string().nonempty('Expiration date is required'),
    cardHolderName: string().nonempty('Card holder name is required'),
})

type OrderInputSchema = TypeOf<typeof orderSchema>;

// First - address
// Second - payment
// Third - confirmation
export default function CheckoutPage() {

    const router = useRouter();

    const [userContext, { refetchUserInfo }] = useUser();
    console.log(userContext)
    const hasNameAndAddress = userContext?.customerInfo != null;
    const hasPayment = userContext?.customerInfo?.paymentInformation != null;
    const isBasketEmpty = userContext?.basketInfo?.basketItemCount == 0;

    console.log(hasNameAndAddress)
    const [useYourAddress, setUseYourAddress] = useState(hasNameAndAddress);
    console.log(useYourAddress)
    const [useYourPayment, setUseYourPayment] = useState(hasPayment);


    const canPlaceOrder = !isBasketEmpty;

    const { register, formState: { errors }, getValues, setValue, handleSubmit } = useForm<OrderInputSchema>({
        resolver: zodResolver(orderSchema),
    });

    const OnSubmit = async (e: any) => {

        // Get values
        const values = getValues();

        console.log("onsubmit");
        console.log(values)

        let input = {};

        if (!useYourAddress) {
            let address = {
                street: values.street,
                city: values.city,
                postalCode: values.postalCode,
                state: values.state,
            }
            input = {
                ...input,
                address
            }
        }

        if (!useYourPayment) {
            let creditCard = {
                cardNumber: values.cardNumber,
                ccv: values.ccv,
                expirationDate: values.expirationDate,
                cardHolderName: values.cardHolderName,
            }
            input = {
                ...input,
                creditCard
            }
        }

        console.log("After");
        console.log(input);

        // Place order
        await client.mutate({
            mutation: OrderDocument,
            variables: {
                input
            }
        }).then((res) => {
            console.log(res);
            const success = res.data?.orderBasket || false;

            if (success) {
                alert("Order placed successfully");
                refetchUserInfo();
                router.push('/');
            } else {
                alert("Order failed");
            }
        });
    };

    return (
        <>
            <Head>
                <title>Checkout</title>
            </Head>

            <main>
                <h1 className='text-center text-4xl font-bold my-8'>Checkout</h1>

                <form onSubmit={handleSubmit(OnSubmit)} className='flex flex-col gap-3'>
                    <div className="primary-cont p-4 bg-white">
                        <h2 className="text-2xl font-bold ">Your Address</h2>
                        {hasNameAndAddress ? (
                            <div className='flex gap-2 my-3'>
                                <input type="checkbox" checked={useYourAddress} onChange={(e: any) => setUseYourAddress(e.target.checked)} />
                                <label>Use your saved address and phone number</label>
                            </div>
                        ) : null}
                        {!useYourAddress ? (
                            <PersonalInfoForm register={register} errors={errors}></PersonalInfoForm>
                        ) : null}
                    </div>
                    <div className='primary-cont p-4 bg-white'>
                        <h2 className="text-2xl font-bold ">Your payment method</h2>
                        {hasPayment ? (
                            <div className='flex gap-2 my-3'>
                                <input type="checkbox" checked={useYourPayment} onChange={(e: any) => setUseYourPayment(e.target.checked)} />
                                <label>Use your payment method</label>
                            </div>
                        ) : null}
                        {!useYourPayment ? (
                            <CreditCardForm register={register} errors={errors}></CreditCardForm>
                        ) : null}
                    </div>
                    <div className='primary-cont p-4 bg-white'>
                        <h2 className="text-2xl font-bold ">Order Summary</h2>
                        <Summary></Summary>
                    </div>
                    <button disabled={!canPlaceOrder} type='submit' className='button-primary'>Place order</button>
                </form>
            </main >
        </>
    );
}


const Summary = () => {
    const [userContext, { refetchUserInfo }] = useUser();

    const basket = userContext?.basketInfo;

    if (!basket) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-semibold">Your cart is empty</h1>
            </div>
        );
    }

    // Calculate total cost and total items
    const totalCost = basket.items.reduce((acc, item) => acc + item.merchandise.price * item.quantity, 0).toFixed(2);
    const totalItems = basket.items.reduce((acc, item) => acc + item.quantity, 0);

    const basketEls = basket.items.map((item) => {
        return (
            <li key={item.merchandiseId}>
                <BasketItem basketItem={item} onQuantityChange={false} onRemoveClick={false} />
            </li>
        );
    });

    return (
        <div>
            <ul className="flex flex-col gap-2">{basketEls}</ul>
            <div className="grid grid-cols-3 grid-rows-2">
                <div className="p-4 font-semibold">
                    Total cost:
                </div>
                <div className="p-4 font-semibold">
                    {totalCost} USD
                </div>
                <div className="p-4 font-semibold">
                    Total items: {totalItems}
                </div>
            </div>
        </div>
    );
};

const BasketItem = ({ basketItem }: any) => {
    const { merchandise, quantity } = basketItem;

    const link = merchNameToPath(merchandise.name, merchandise.id); // Placeholder link, replace with your actual link or remove if not needed

    const sumPrice = (merchandise.price * basketItem.quantity).toFixed(2);

    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
            <div className="flex items-center">
                <div className="text-gray-800">
                    <Link href={link}>
                        <div className="text-lg font-semibold hover:underline">{merchandise.name}</div>
                    </Link>
                    <p className="text-sm">{quantity}x ${merchandise.price} = ${sumPrice}</p>
                </div>
            </div>
        </div>
    );
};
