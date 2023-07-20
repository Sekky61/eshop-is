
import InputField from "./InputField";

export default function EditStockForm({ register, errors }: any) {
    return (
        <>
            <InputField register={register} errors={errors} name="description" labelText='Description'></InputField>
            <div className="flex gap-2">
                <InputField register={register} errors={errors} name="name" labelText='Name'></InputField>
                <InputField register={register} errors={errors} name="category" labelText='Category'></InputField>
                <InputField register={register} errors={errors} name="stock" labelText='Stock' type="number"></InputField>
                <InputField register={register} errors={errors} name="price" labelText='Price' type="number" decimal></InputField>
            </div>
        </>
    )
}
