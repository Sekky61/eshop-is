import Link from "next/link"

export const CategoryCard = ({ categoryName }: any) => {
    const nameLower = categoryName.toLowerCase();
    return (
        <Link href={{ pathname: '/merch', query: { cat: categoryName } }}>
            <div className="h-28 p-6 surface-1 border border-gray-200 rounded-lg shadow primary-cont hover:translate-y-1 duration-150 flex items-center justify-center hover:bg-red-500 hover:text-white ">
                <h5 className="text-2xl font-extrabold tracking-tight">{categoryName}</h5>
            </div>
        </Link>
    )
}