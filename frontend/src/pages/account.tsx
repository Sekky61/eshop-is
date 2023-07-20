import Head from 'next/head';
import { useContext, useState } from 'react';
import client from '@/common/fetch/apollo-client';
import { GetCategoriesDocument } from '@/generated/graphql';
import { CategoryCard } from '@/components/CategoryCard';
import RegisterForm from '@/components/RegisterForm';
import { Role, UserContext } from '@/common/UserContext';
import Link from 'next/link';
import DeleteSelfPopout from '@/components/DeleteSelfPopout';
import Modal from '@/components/Modal';

export default function AccountPage() {

  const [userContext, { }] = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const isCustomer = userContext.role == Role.Customer;

  const handleShowDeleteAccountModal = () => {
    console.log("delete account")
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  let tilesToShow: JSX.Element[] = [];

  if (isCustomer) {
    tilesToShow = [
      (
        <div className="bg-white p-6 rounded-lg shadow-md" key={"a"}>
          <h2 className="text-2xl font-bold mb-4">Edit personal information</h2>
          <p className="text-gray-600">
            Update your address and credit card information.
          </p>
          <Link href="/personalinfo">
            <button className="mt-6 w-full button-primary">Edit</button>
          </Link>
        </div>
      ), (

        <div className="bg-white p-6 rounded-lg shadow-md" key={"b"}>
          <h2 className="text-2xl font-bold mb-4">See orders</h2>
          <p className="text-gray-600">
            Display your order history.
          </p>
          <Link href="/history">
            <button className="mt-6 w-full button-primary">Expand</button>
          </Link>
        </div>
      ), (

        <div className="bg-white p-6 rounded-lg shadow-md" key={"c"}>
          <h2 className="text-2xl font-bold mb-4">Delete account</h2>
          <p className="text-gray-600">

          </p>
          <button className="mt-16 w-full button-primary" onClick={handleShowDeleteAccountModal}>Delete account</button>
        </div>
      )
    ]
  }


  return (
    <>
      <Head>
        <title>Account Page</title>
      </Head>
      <Modal show={showModal} handleClose={handleCloseModal}>
        <DeleteSelfPopout></DeleteSelfPopout>
      </Modal>

      <main className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-center text-4xl font-bold my-8">Account</h1>
          {tilesToShow.length > 0 ?
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tilesToShow}
            </div> :
            <div className='w-full text-center'>Nothing to do here</div>
          }
        </div>
      </main>
    </>
  );
}
