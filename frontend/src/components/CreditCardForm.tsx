import InputField from "./InputField";

// cardNumber
// ccv
// expirationDate
// cardHolderName
const CreditCardForm = ({ register, errors }: any) => {
    return (
        <>
            <InputField register={register} errors={errors} name="cardNumber" labelText='Card number'></InputField>
            <InputField register={register} errors={errors} name="ccv" labelText='CCV'></InputField>
            <InputField register={register} errors={errors} name="expirationDate" labelText='Expiration date'></InputField>
            <InputField register={register} errors={errors} name="cardHolderName" labelText='Cardholder name'></InputField>
        </>
    )
}

export default CreditCardForm;
