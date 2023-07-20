import Head from 'next/head';
import { useState } from 'react';
import RegisterForm from '@/components/RegisterForm';
import { useRouter } from 'next/router';
import DeleteUserForm from '@/components/DeleteUserForm';
import LoginForm from '@/components/LoginForm';

export default function Admin({ categories }: any) {
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showDeleteUserForm, setShowDeleteUserForm] = useState(false);
  const [showAddManagerForm, setShowAddManagerForm] = useState(false);
  const router = useRouter();

  const handleAddUserClick = () => {
    setShowAddUserForm(!showAddUserForm);
    setShowDeleteUserForm(false);
    setShowAddManagerForm(false);
  }

  const handleDeleteUserClick = () => {
    setShowDeleteUserForm(!showDeleteUserForm);
    setShowAddUserForm(false);
    setShowAddManagerForm(false);
  }

  const handleAddManagerClick = () => {
    setShowAddManagerForm(!showAddManagerForm);
    setShowAddUserForm(false);
    setShowDeleteUserForm(false);
  }

  function handleButtonClick() {
    router.push('/manager');
  }


  return (
    <>
      <Head>
        <title>Admin Page</title>
      </Head>

      <main className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-center text-4xl font-bold my-8">Admin Page</h1>
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Managers Management</h2>
                <p className="text-gray-600">
                  Add and manage managers. Managers can manage orders and stock.
                </p>
                <div className="flex mt-6">
                  <button
                    className="flex-1 mr-2 button-primary"
                    onClick={handleAddManagerClick}
                  >
                    Add Manager
                  </button>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Stock Management</h2>
                <p className="text-gray-600">
                  Add and manage merchandise to keep your stock up-to-date.
                </p>
                <div className="flex mt-6">
                  <button
                    className="flex-1 mr-2 button-primary"
                    onClick={handleButtonClick}
                  >
                    Manage Stock
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">User Management</h2>
              <p className="text-gray-600">
                Add, delete, and manage users to maintain your user database.
              </p>
              <div className="flex mt-6">
                <button
                  className="flex-1 mr-2 button-primary"
                  onClick={handleAddUserClick}
                >
                  Add User
                </button>
                <button
                  className="flex-1 mr-2 button-primary"
                  onClick={handleDeleteUserClick}
                >
                  Search Users
                </button>
              </div>
            </div>
          </div>
        </div>
        {showAddUserForm && (
          <div className="w-auto p-6 h-auto flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <button className="absolute top-2 right-2" onClick={handleAddUserClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-2xl font-bold mb-4">Add User</h2>
              <RegisterForm></RegisterForm>
            </div>
          </div>
        )}
        <div className="flex items-center justify-center ">
          {showDeleteUserForm && (
            <div className="flex items-center mb-4">
              <label htmlFor="email" className="mr-2">
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="border border-gray-400 py-2 px-4 rounded-lg"
              />
              <button className="button-primary m-2">
                Delete
              </button>
            </div>
          )}
        </div>



        {showAddManagerForm && <LoginForm></LoginForm>}
      </main>
    </>
  );

}
