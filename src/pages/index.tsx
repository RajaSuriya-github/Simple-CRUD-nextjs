import axios from 'axios';
import Link from 'next/link';
//@ts-ignore
export default function Home({ items }) {
  return (
    <>
    <nav className="navbar navbar-light bg-primary d-flex justify-content-center">
  <span className="navbar-brand mb-0 h1 p-2" style={{color:"white"}}>Simple CRUD Application in Nextjs SSR</span>
</nav>
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Item List</h1>
      <Link href="/create" legacyBehavior>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add New Item</button>
      </Link>
      <ul className="mt-4">
      {/*@ts-ignore */}
        {items.map((item) => (
          <li key={item._id} className="block max-w-sm w-full lg:max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 
          border-b py-2
          ">
            {/* <Link href={`/edit/${item._id}`} legacyBehavior> */}
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <h3 className="text-blue-500">{item.name}</h3> 
            <Link href={`/edit/${item._id}`}legacyBehavior>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
      </Link>
            </div>
              
            {/* </Link> */}
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await axios.get('http://localhost:3000/api/items');
  const items = res.data.data;

  return { props: { items } };
}
