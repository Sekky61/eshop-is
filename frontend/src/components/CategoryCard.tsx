import Link from "next/link";

export const CategoryCard = ({ categoryName }: { categoryName: string }) => {
    return (
        <Link href={{ pathname: '/merch', query: { cat: categoryName } }}>
            <div className="h-28 p-5 card hover-card text-2xl font-extrabold tracking-tight">
                {categoryName}
            </div>
        </Link>
    )
}
