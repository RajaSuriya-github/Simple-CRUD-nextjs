import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import dbConnect from '../../lib/mongodb';
import Item from '../../models/Item';
import Link from 'next/link';
export default function Edit({ item }:any) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await axios.put(`/api/items/${item._id}`, { name, description });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/items/${item._id}`);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
     <nav className="navbar navbar-light bg-primary d-flex justify-content-center">
  <span className="navbar-brand mb-0 h1 p-2" style={{color:"white"}}>Simple CRUD Application in Nextjs SSR</span>
</nav>
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Edit Item</h1>
      <form className='block max-w-sm w-full lg:max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700' onSubmit={handleSubmit}>
      <Link href="/" legacyBehavior>
      <div className='d-flex justify-content-end p-2' style={{cursor:"pointer"}}>X</div>
      </Link>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border mb-2 p-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border mb-2 p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
        >
          Delete
        </button>
      </form>
    </div>
    </>
  );
}
export async function getServerSideProps(context: { params: { id: any; }; }) {
    await dbConnect();
    const { id } = context.params;
  
    // Fetch the item directly from the database
    const item = await Item.findById(id).lean(); 
  
    if (!item) {
      return {
        notFound: true, // If no item is found, return a 404 page
      };
    }
  
    return {
      props: {
        item: JSON.parse(JSON.stringify(item)), // Convert the Mongoose document to a plain object
      },
    };
  }