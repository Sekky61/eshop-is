import Head from 'next/head'
import { GetAllOrdersDocument, GetMerchDocument, UpdateOrderStatusDocument } from '@/generated/graphql';
import ClientOnly from '@/common/fetch/ClientOnly';
import { MerchList } from '@/components/MerchList';
import MerchFilter from '@/components/MerchFilter';
import { use, useEffect, useMemo, useState } from 'react';
import { SearchState, getQueryArgs } from '@/common/fetch/MerchQuery';
import client from '@/common/fetch/apollo-client';
import { set } from 'react-hook-form';
import EditStockPopup from '@/components/EditStockPopup';
import Modal from '@/components/Modal';
import { useTable } from 'react-table';
import OrderDetailModal from '@/components/OrderDetailModal';

const DateCell = ({
  value: initialValue,
  row,
  column,
  updateOrder, // This is a custom function that we supplied to our table instance
}: any) => {
  const formattedDate = new Date(initialValue).toLocaleDateString();
  return (
    <span>{formattedDate}</span>
  )
}

const SelectCell = ({
  value: initialValue,
  row,
  column,
  updateOrder, // This is a custom function that we supplied to our table instance
}: any) => {
  // We need to keep and update the state of the cell normally
  const orderId = row.original.id;
  const status = row.original.status;
  const [value, setValue] = useState(status)

  const onChange = (e: any) => {
    if (e.target.value === initialValue) return;
    setValue(e.target.value)
    updateOrder(orderId, e.target.value);
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const options = [
    "Pending",
    "Shipped",
    "Delivered",
    "Cancelled"
  ];

  return (
    <select
      value={value}
      onChange={onChange}
      className="bg-gray-100 px-2 py-1 rounded-md mr-2"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}

const ShowOrders = () => {

  const [pageData, setPageData] = useState({ cursor: undefined, hasNextPage: false }); // todo reset cursor on filter change
  const [ordersList, setOrdersList] = useState([] as any[]);
  const [showModal, setShowModal] = useState(false);
  const [activeOrder, setActiveOrder] = useState({} as any);

  const appendOrdersList = (newOrdersList: any[]) => {
    setOrdersList([...ordersList, ...newOrdersList]);
  };

  // pass true if you want to append to merchList
  const fetchOrders = (more: boolean) => {
    const fet = async () => {
      let variables = { afterCursor: pageData.cursor };
      const res = await client.query({
        query: GetAllOrdersDocument,
        variables: variables,
      });
      // update cursor and merchList
      setPageData({ cursor: res.data.orders.pageInfo.endCursor, hasNextPage: res.data.orders.pageInfo.hasNextPage });
      if (more) {
        appendOrdersList(res.data.orders.nodes);
      } else {
        setOrdersList(res.data.orders.nodes);
      }
    };

    fet().catch((e) => {
      console.error(e);
    });
  };

  useEffect(() => fetchOrders(false), []);

  const columns = useMemo(
    () => [
      {
        Header: 'Order Date',
        accessor: 'orderDate',
        Cell: DateCell,
      },
      {
        Header: 'Price',
        accessor: 'totalPrice',
      },
      {
        Header: 'n Items',
        accessor: (row: any) => row.merchandises.length,
      },
      {
        Header: 'Status',
        Cell: SelectCell,
      },
      {
        Header: 'Actions',
        accessor: (row: any) => {
          return (
            <button className="button" onClick={() => { showModalWithOrder(row) }}>Detail</button>
          )
        },
      }
    ],
    []
  )

  // called after dropdown is changed
  const updateOrder = (orderId: number, status: string) => {
    client.mutate({
      mutation: UpdateOrderStatusDocument,
      variables: {
        orderId: orderId,
        status: status
      }
    }).then((res) => {
      console.log(res);
    });
  }

  // This error is ok
  const tableInstance = useTable({ columns, data: ordersList, updateOrder });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  // Modal

  const showModalWithOrder = (order: any) => {
    setActiveOrder(order);
    setShowModal(true);
  }

  const handleClose = () => setShowModal(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-4 mt-6">Orders</h1>
      </div>
      <div className="">
        <Modal handleClose={handleClose} show={showModal}>
          <OrderDetailModal order={activeOrder}></OrderDetailModal>
        </Modal>
        <table {...getTableProps()} className='w-full text-sm text-left'>
          <thead className='text-xs text-gray-700 uppercase surface-2'>
            {// Loop over the header rows
              headerGroups.map(headerGroup => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {// Loop over the headers in each row
                    headerGroup.headers.map(column => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()} className='px-6 py-3'>
                        {// Render the header
                          column.render('Header')}
                      </th>
                    ))}
                </tr>
              ))}
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {// Loop over the table rows
              rows.map(row => {
                // Prepare the row for display
                prepareRow(row)
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()} className=' border-b'>
                    {// Loop over the rows cells
                      row.cells.map(cell => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()} className='px-6 py-3'>
                            {// Render the cell contents
                              cell.render('Cell')}
                          </td>
                        )
                      })}
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      {pageData.hasNextPage &&
        <div className='flex justify-center mt-6'>
          <button className='button-primary' onClick={() => fetchOrders(true)}>Load more</button>
        </div>}
    </div>
  )
};

const orderData = [
  { id: 1, name: 'Shirt', price: 25, date: '2021-01-01', status: 'pending' },
  { id: 2, name: 'Sweater', price: 50, date: '2021-01-02', status: 'active' },
  { id: 3, name: 'Hat', price: 10, date: '2021-01-03', status: 'active' },
  { id: 4, name: 'Pants', price: 35, date: '2021-01-04', status: 'closed' },
  { id: 5, name: 'Jacket', price: 75, date: '2021-01-05', status: 'pending' },
];


function Manager({ filterState }: { filterState: SearchState }) {
  const [pageData, setPageData] = useState({ cursor: undefined }); // todo reset cursor on filter change
  const [merchList, setMerchList] = useState([] as any[]);

  // pass true if you want to append to merchList
  const fetchMerch = (more: boolean) => {
    const fet = async () => {
      let variables: any = getQueryArgs(defaultFilter);
      if (more) {
        variables = { ...variables, afterCursor: pageData.cursor };
      }
      const res = await client.query({
        query: GetMerchDocument,
        variables: variables,
      });
      // update cursor and merchList
      setPageData({ cursor: res.data.merchandise.pageInfo.endCursor });
      setMerchList(res.data.merchandise.nodes);

    };

    fet().catch((e) => {
      console.error(e);
    });
  };

  useEffect(() => fetchMerch(true), [filterState]);

  let merchCards = merchList.map((merchItem: any) => {
    return <MerchList merchInfo={merchItem} key={merchItem.name}></MerchList>;
  });

  return (
    <div>
      {merchCards.length ? (
        <div>
          {merchCards}
        </div>
      ) : (
        <div className='text-center'>No merch found :(</div>
      )}
    </div>
  );
}

const defaultFilter: SearchState = {
  filter: {
    name: '',
    category: 'All',
    min: '',
    max: '',
  },
  count: 10,
};

// Query parameters:
// text: search query (string) -- comming from search bar / filter
// cat: category (string) -- comming from category page / filter
// minPrice: min price (int) -- comming from filter
// maxPrice: max price (int) -- comming from filter
export default function ManagerPage() {
  const [showMerch, setShowMerch] = useState(false);
  const [showAddMerch, setShowAddMerch] = useState(false);
  const [filterState, setFilterState] = useState<SearchState>(defaultFilter);
  const [showModal, setShowModal] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  }

  function handleShowMerch() {
    setShowMerch(!showMerch);
    setShowAddMerch(false);
  }

  function handleBrowseOrders() {
    setShowOrders(true);
    setShowMerch(false);
    setShowAddMerch(false);
  }

  function handleAddMerch() {
    setShowMerch(false);
    setShowAddMerch(!showAddMerch);
    setShowModal(true);
  }

  let addMerchButton = (
    <Modal show={showModal} handleClose={handleCloseModal}>
      <EditStockPopup></EditStockPopup>
    </Modal>
  );

  return (
    <>
      <Head>
        <title>Manager Page</title>
      </Head>
      {addMerchButton}
      <main className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-center text-4xl font-bold my-8">Manager Page</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Orders Management</h2>
              <p className="text-gray-600">
                View and manage orders to keep track of your business activities.
              </p>
              <button onClick={handleBrowseOrders} className="mt-6 w-full button-primary">Browse Orders</button>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Stock Management</h2>
              <p className="text-gray-600">
                Add and manage merchandise to keep your stock up-to-date.
              </p>
              <div className="flex mt-6">
                <button onClick={handleAddMerch} className="flex-1 mr-2 button-primary">Add Merchandise</button>
                <button onClick={handleShowMerch} className="flex-1 ml-2 button-primary">Show Stock</button>
              </div>
            </div>

          </div>
          {showMerch && (
            <>
              <ClientOnly>
                <div className='flex flex-col gap-4'>
                  <MerchFilter filterState={filterState} setFilter={setFilterState}></MerchFilter>
                  <h1 className='heading-primary'>Merchandise</h1>
                  <Manager filterState={filterState} ></Manager>
                </div>
              </ClientOnly>
            </>)}
          {showOrders && (
            <ShowOrders></ShowOrders>
          )}
        </div>
      </main>
    </>
  );
}

