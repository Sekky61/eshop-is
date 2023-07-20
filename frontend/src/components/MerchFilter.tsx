import { CategoryContext } from "@/common/Contexts";
import { useContext } from "react";

export default function MerchFilter({ filterState, setFilter }: any) {

    // Get categories and add "All" to the beginning
    const categories = useContext(CategoryContext);

    let categoryNames = categories.categoriesList.map((category: any) => {
        return category.name;
    });
    categoryNames.unshift("All");

    const handleMaxChange = (e: any) => {
        const { value } = e.target;
        setFilter((prev: any) => ({ ...prev, filter: { ...prev.filter, max: value } }));
    };

    const handleMinChange = (e: any) => {
        const { value } = e.target;
        setFilter((prev: any) => ({ ...prev, filter: { ...prev.filter, min: value } }));
    };

    const handleNameChange = (e: any) => {
        const { value } = e.target;
        setFilter((prev: any) => ({ ...prev, filter: { ...prev.filter, name: value } }));
    };

    const handleCategoryChange = (e: any) => {
        const { value } = e.target;
        setFilter((prev: any) => ({ ...prev, filter: { ...prev.filter, category: value } }));
    };

    //add favourite filter
    return (
        <div className="bg-gray-100 p-2 mt-8 rounded-lg shadow-md flex flex-col gap-4 py-4 px-4 mb-6" style={{ height: '100%' }}>
            <h2 className="text-xl font-medium mb-4">Filter Merchandise</h2>
            <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-medium mb-2">
                    Product Name
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    className="py-2 px-3 rounded-lg border-gray-300 w-64"
                    onChange={handleNameChange}
                    value={filterState.filter.name}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="priceRange" className="text-sm font-medium mb-2">
                    Price Range
                </label>
                <div className="flex gap-2 items-center">
                    <span className='text-sm font-medium mb-2'>From</span>
                    <input
                        onChange={handleMinChange}
                        value={filterState.filter.min}
                        type="number" name="min" id="min" className="py-2 w-32 px-3 rounded-lg border-gray-300" />
                    <span className='text-sm font-medium mb-2'>To</span>
                    <input
                        onChange={handleMaxChange}
                        value={filterState.filter.max}
                        type="number" name="min" id="min" className="py-2 w-32 px-3 rounded-lg border-gray-300" />
                </div>
            </div>
            <div className="flex flex-col">
                <label htmlFor="category" className="text-sm font-medium mb-2">
                    Product Category
                </label>
                <select onChange={handleCategoryChange} value={filterState.filter.category} name="category" className="py-2 px-3 p-2 rounded-lg border-gray-300 w-64">
                    {categoryNames.map((category: any) => (
                        <option value={category} key={category}>{category}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
