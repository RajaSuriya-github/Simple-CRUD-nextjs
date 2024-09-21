import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

export default function Create() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await axios.post('/api/items', { name, description });
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
      <h1 className="text-2xl font-bold mb-4">Create Item</h1>
      <form className='block max-w-sm w-full lg:max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700' onSubmit={handleSubmit}>
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 me-2 rounded">
          Save
        </button>
        <Link href="/" legacyBehavior>
        <button className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
      </Link>
      </form>
    </div>
    </>
  );
}
