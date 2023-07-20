import { RegisterCustomerInput, useRegisterCustomerMutation } from "@/generated/graphql";
import { useForm } from "react-hook-form";
import { literal, object, string, TypeOf } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect } from "react";
import { Button, Checkbox, FormControlLabel, FormGroup, FormHelperText, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import SessionChange from "@/common/fetch/SessionChange";
import { UserContext } from "@/common/UserContext";
import PersonalInfoForm from "./PersonalInfoForm";
import InputField from "./InputField";

const registerSchema = object({
    firstName: string()
        .nonempty('First name is required')
        .max(32, 'Name must be less than 32 characters'),
    lastName: string()
        .nonempty('First name is required')
        .max(32, 'Name must be less than 32 characters'),
    email: string().nonempty('Email is required').email('Email is invalid'),
    password: string()
        .nonempty('Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string().nonempty('Please confirm your password'),
    phoneNumber: string().nonempty('Phone number is required'),
    street: string().nonempty('Street is required'),
    city: string().nonempty('City is required'),
    postalCode: string().nonempty('Postal code is required'),
    state: string().nonempty('State is required'),
    terms: literal(true, {
        invalid_type_error: 'Accept Terms is required',
    }),
}).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
});

type RegisterInputSchema = TypeOf<typeof registerSchema>;

export default function RegisterForm() {
    const router = useRouter();

    const [userDetails, { registerUser }] = useContext(UserContext);

    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
        getValues
    } = useForm<RegisterInputSchema>({
        resolver: zodResolver(registerSchema),
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    const OnSubmit = async (e: any) => {

        // Get values
        const values = getValues();
        console.log(values);

        // Create input
        const input: RegisterCustomerInput = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            city: values.city,
            phoneNumber: values.phoneNumber,
            postalCode: values.postalCode,
            state: values.state,
            street: values.street,
        };

        // Register
        registerUser(input).then(() => {
            router.push('/');
        });
    };

    return (
        <form onSubmit={handleSubmit(OnSubmit)} >
            <div className="flex gap-2">
                <InputField register={register} errors={errors} name="firstName" labelText='First Name'></InputField>
                <InputField register={register} errors={errors} name="lastName" labelText='Last Name'></InputField>
            </div>
            <InputField register={register} errors={errors} name="email" labelText='Email'></InputField>
            <InputField register={register} errors={errors} name="password" labelText='Password' type="password"></InputField>
            <InputField register={register} errors={errors} name="passwordConfirm" labelText='Confirm Password' type="password"></InputField>
            <PersonalInfoForm register={register} errors={errors}></PersonalInfoForm>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox required />}
                    {...register('terms')}
                    label={
                        <Typography color={errors['terms'] ? 'error' : 'inherit'}>
                            Accept Terms and Conditions
                        </Typography>
                    }
                />
                <FormHelperText error={!!errors['terms']}>
                    {errors['terms'] ? errors['terms'].message : ''}
                </FormHelperText>
            </FormGroup>

            <Button className="bg-red-500 mt-4 text-white text-center" type='submit'>Register</Button>
        </form>
    );
}