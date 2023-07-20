import { TextField } from "@mui/material";
import InputField from "./InputField";


const PersonalInfoForm = ({ register, errors }: any) => {
    return (
        <>
            <InputField register={register} errors={errors} name="phoneNumber" labelText='Phone number'></InputField>
            <div className="flex gap-2">
                <InputField register={register} errors={errors} name="street" labelText='Street Address'></InputField>
                <InputField register={register} errors={errors} name="city" labelText='City'></InputField>
                <InputField register={register} errors={errors} name="state" labelText='State'></InputField>
                <InputField register={register} errors={errors} name="postalCode" labelText='Postal Code'></InputField>
            </div>
        </>
    )
}

export default PersonalInfoForm;
