import EditStockForm from "./EditStockForm";
import { TextField } from "@mui/material";
import InputField from "./InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TypeOf, number, object, string } from "zod";
import client from "@/common/fetch/apollo-client";
import { UpdateMerchandiseDocument } from "@/generated/graphql";
import { useEffect } from "react";

const stockSchema = object({
    description: string(),
    name: string(),
    category: string(),
    stock: number(),
    price: number(),
});

type EditStockSchema = TypeOf<typeof stockSchema>;

const EditStockPopup = ({ onClose, merch }: any) => {

    const { register, formState: { errors }, getValues, setValue, handleSubmit } = useForm<EditStockSchema>({
        resolver: zodResolver(stockSchema),
    });

    // fill in the form with the user's info
    useEffect(() => {
        if (merch == null) {
            return;
        }

        console.log(merch)
        console.log(merch.stock)

        setValue("description", merch.description);
        setValue("name", merch.name);
        setValue("category", merch.categoryName);
        setValue("stock", merch.stock);
        setValue("price", merch.price);
    }, [merch]);

    const OnSubmit = async (e: any) => {

        // Get values
        const values = getValues();
        console.log(values);

        await client.mutate({
            mutation: UpdateMerchandiseDocument,
            variables: {
                input: {
                    id: merch.id,
                    description: values.description,
                    name: values.name,
                    category: values.category,
                    price: values.price,
                    inStockCount: values.stock,
                }
            }
        }).then((e) => {
            console.log(e)
            onClose();
        });
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md mx-auto px-6 py-4 relative">
            <button
                className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={onClose}
            >
            </button>
            <h2 className="text-2xl font-bold mb-2">Add Merchandise</h2>
            <form onSubmit={handleSubmit(OnSubmit)} >
                <EditStockForm register={register} errors={errors} />
                <button type="submit" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg mt-4">
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditStockPopup;
