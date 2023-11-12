import ProductList from '@/components/Products/ProductList';
import Layout from '@/layouts/Layout';
import { getCategories } from '@/services/categoryService';
import { getProducts } from '@/services/productService';
import { GetServerSideProps } from 'next';
import '@/app/globals.css'


interface Product {
  id: number;
  product_name: string;
  photo_url: string;
  price: number
}

interface Category {
  id: number,
  category_name: string
}


interface ProductsPageProps {
  products: Product[];
  currentPage: number;
  pageSize: number;
  categories: Category[]; // Define the shape of category data
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products, currentPage, pageSize, categories }) => {
  return (
    <>
      {/* Render your product and category data */}
      <ProductList products={products} currentPage={currentPage} totalPages={pageSize} />
      {/* Render category data */}
      <ul>
        {
        categories.map((category) => (
          <li key={category.id}>{category.category_name}</li>
        ))}
      </ul>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ProductsPageProps> = async ({ query }) => {
  const page = query.page || 1;

  // Fetch products and categories concurrently
  const [productsResponse, categoriesResponse] = await Promise.all([
    getProducts(page as number),
    getCategories(),
  ]);

  if (!productsResponse.products || !categoriesResponse) {
    return {
      notFound: true,
    };
  }

  const { products, page_size, current_size } = productsResponse;
  const totalPages = Math.ceil(page_size / current_size);

  return {
    props: {
      products,
      currentPage: parseInt(page as string),
      pageSize: page_size,
      categories: categoriesResponse,
    },
  };
};

export default ProductsPage;
