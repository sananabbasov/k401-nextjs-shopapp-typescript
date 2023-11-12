import React, { useEffect } from 'react';
import Link from 'next/link';
import { Pagination } from '@mui/material'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from '@emotion/react';

interface Product {
  id: number;
  product_name: string;
  photo_url: string;
  price: number
}

interface ProductListProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
}

const ProductList: React.FC<ProductListProps> = ({ products, currentPage, totalPages }) => {

  const { data: session } = useSession();
  const { getUserCart } = useActions()

  const { data, loading, error } = useTypedSelector(x => x.cart)

  const router = useRouter()
  const handleChange = (event: string, value: number) => {
    router.push(`?page=${value}`, { scroll: false })
  };


  const addToCart = async (productId: number) => {
    try {
      await fetch(`https://localhost:7037/api/v1/WishList/add?ProductId=${productId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session?.user?.token}`
        }
      }).then(function (response) {
        if (response.status == 401) {
          toast.warning("Evvelce daxil olmalisiniz");
        } else {
          toast.success("Elave olundu");
        }
      })
      getUserCart(session?.user.token)
    } catch (error) {
      toast.error("Karta elave eden zaman xeta bas verdi.");
    }
  }


  useEffect(() => {
    getUserCart(session?.user.token)
  }, [])




  return (
    <div>
      <h1>Product List</h1>
      <ul>


        <div className="w-[70%] m-auto grid grid-cols-4 gap-4">
          {
            products.map((d, index) => (

              <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link href="#">
                  <img className="rounded-t-lg" src={`${d.photo_url}`} alt="" />
                </Link>
                <div className="p-5">
                  <Link href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{d.product_name}</h5>
                  </Link>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  <div className="flex justify-between">
                    <Link href={`/product/detail/${d.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more
                      <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </Link>

                    <button onClick={() => addToCart(d.id)} className='text-white'>
                      Add to favorit
                    </button>

                    <ToastContainer
                 
                      closeOnClick autoClose={5000}
                    />

                  </div>
                </div>
              </div>

            ))


          }
        </div>

      </ul>
      <div>


      </div>
      <div className='mt-5 w-full flex justify-center'>
        <Pagination className='' count={totalPages} page={currentPage} onChange={(e, v) => handleChange(e as any, v as number)} boundaryCount={2} variant="outlined" shape="rounded" />
      </div>
    </div>
  );
};

export default ProductList;
