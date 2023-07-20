import { MutationLoginArgs } from "@/generated/graphql";
import { useForm } from "react-hook-form";
import { literal, object, string, TypeOf } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from "react";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import useUser from "@/common/UserContext";
import InputField from "./InputField";

const debug = true;

const loginSchema = object({
    email: string()
        .nonempty('Email is required')
        .email('Email is invalid'),
    password: string()
        .nonempty('Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
});

type LoginInputSchema = TypeOf<typeof loginSchema>;

export default function LoginForm() {
    const router = useRouter();

    const [userDetails, { loginUser }] = useUser();

    const { register, formState: { errors }, getValues, setValue, handleSubmit } = useForm<LoginInputSchema>({
        resolver: zodResolver(loginSchema),
    });

    const fillIn = (values: any) => () => {
        const { email, password } = values;
        // set input fields
        setValue('email', email);
        setValue('password', password);
    }

    const OnSubmit = async (e: any) => {

        // Get values
        const values = getValues();
        console.log(values);

        // Create input
        const input: MutationLoginArgs = {
            email: values.email,
            password: values.password,
        };

        await loginUser(input).then(() => {
            router.push('/');
        }).catch((error) => {
            console.log("onError running");
            const { graphQLErrors, networkError, operation, forward } = error;
            if (graphQLErrors) {
                for (let err of graphQLErrors) {
                    console.error(`[GraphQL error]: Message: ${err.message}`);
                }
            }

            // Some error, clear fields and show error message
            setValue('password', '');
            alert("Invalid email or password");
        });
    };

    let debugButtons = null;
    if (debug) {
        const logins = [
            {
                email: "customer1@gmail.com",
                password: "customer1",
            },
            {
                email: "customer2@gmail.com",
                password: "customer2",
            },
            {
                email: "customer3@gmail.com",
                password: "customer3",
            },
            {
                email: "manager1@gmail.com",
                password: "manager1",
            },
            {
                email: "admin1@gmail.com",
                password: "admin1",
            },
        ]
        let db = logins.map((login, i) => {
            return (
                <li className="mt-2" key={login.email}>
                    <button onClick={fillIn(login)} className="button">
                        {login.email}
                    </button>
                </li>
            );
        });

        debugButtons = (
            <ul>
                {db}
            </ul>
        );
    }


    return (
        <div>
            <form onSubmit={handleSubmit(OnSubmit)} >
                <div className="flex flex-col lg:items-center max-w-450">
                    <InputField register={register} errors={errors} name="email" labelText='Email'></InputField>
                    <InputField register={register} errors={errors} name="password" labelText='Password' type="password"></InputField>
                    <button
                        className="button"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </form>
            <div className="rounded-lg border border-green-400 p-4 mt-8">
                For your testing purposes:
                {debugButtons}
            </div>
        </div>
    )
}