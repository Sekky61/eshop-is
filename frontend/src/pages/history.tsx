import Head from 'next/head'
import { GetAllOrdersDocument, GetMerchDocument, GetOrdersDocument } from '@/generated/graphql';
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

const ShowOrders = () => {

    const [ordersList, setOrdersList] = useState([] as any[]);
    const [showModal, setShowModal] = useState(false);
    const [activeOrder, setActiveOrder] = useState({} as any);

    // pass true if you want to append to merchList
    const fetchOrders = (more: boolean) => {
        const fet = async () => {
            const res = await client.query({
                query: GetOrdersDocument,
            });
            setOrdersList(res.data.customerInfo.orders);
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
                accessor: 'status'
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

    // This error is ok
    const tableInstance = useTable({ columns, data: ordersList });

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
        </div>
    )
};

const defaultFilter: SearchState = {
    filter: {
        name: '',
        category: 'All',
        min: '',
        max: '',
    },
    count: 10,
};

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


    return (
        <ShowOrders></ShowOrders>
    );
}

