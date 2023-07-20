import { MutationLoginArgs, RegisterCustomerInput, useLoginMutation, useRegisterCustomerMutation } from "@/generated/graphql";
import { useForm } from "react-hook-form";
import { literal, object, string, TypeOf } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { UserContext } from "@/common/UserContext";

const deleteUser = object({
    email: string()
        .nonempty('Email is required')
        .email('Email is invalid'),
});

type DeleteUserSchema = TypeOf<typeof deleteUser>;

export default function DeleteUserForm() {
    const router = useRouter();

    const userContext = useContext(UserContext);

    const { register, formState: { errors }, getValues } = useForm<DeleteUserSchema>({
        resolver: zodResolver(deleteUser),
    });

    const OnSubmit = async (e: any) => {
        e.preventDefault();

        // Get values
        const values = getValues();
        console.log(values);
    };

    return (
        <form onSubmit={OnSubmit}>
            <div className="flex flex-col lg:items-center max-w-450">
                <TextField
                    sx={{ mb: 2 }}
                    label='Email'
                    required
                    fullWidth
                    error={!!errors['email']}
                    helperText={errors['email'] ? errors['email'].message : ''}
                />
                <Button
                    className="button-primary"
                    type="submit"
                    sx={{ backgroundColor: 'red' }}
                >
                    Delete
                </Button>
            </div>
        </form>
    )
}