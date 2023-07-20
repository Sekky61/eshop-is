import { useGetCustomersQuery } from "@/generated/graphql";

// When this component is rendered in the browser, it will fetch data from the GraphQL endpoint
// Errors are logged to the console _in the browser_.
export default function GraphqlExample() {

  const { data, loading, error, refetch } = useGetCustomersQuery();

  if (loading) {
    return (<h2>Loading...</h2>);
  }

  if (error) {
    console.error(error);
    return (<h2>Error</h2>);
  }

  const customers = data?.customers;
  const count = customers?.length;

  return (
    <>
      <div className="bg-red-400">
        <p>Fetched from server: got {count} customers</p>
      </div>
      <button onClick={() => refetch()} className="rounded bg-slate-500 p-1">Refetch</button>
    </>
  )
}