import Layout from '@/layouts/Layout'
import React from 'react'
import '@/app/globals.css'
import Head from 'next/head'
import BannerSlider from '@/components/Sliders/BannerSlider'
import { GetServerSideProps } from 'next'
import { getFeaturedProducts, getProducts } from '@/services/productService';
import ProductList from '@/components/Products/ProductList'
import { Product } from '@/interfaces/Product/Product'


interface Slider {
    id: number,
    product_name: string,
    price: number,
    photo_url: string
}

interface ProductListProps {
    products: Product[];
    currentPage: number;
    totalPages: number;
}

interface HomePageProps {
    slider: Slider[];
    products: Product[];
    currentPage: number;
    totalPages: number;
}

const index: React.FC<HomePageProps> = ({ slider, products, currentPage, totalPages }) => {
    return (
        <>
            <Head>
                <title>Qonchaaa</title>
            </Head>
            <div>index</div>
            <BannerSlider slider={slider} />
            <ProductList products={products} currentPage={currentPage} totalPages={totalPages} />
        </>
    )
}

export default index;




export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({ query }) => {
    const page = query.page || 1;
    const [slider, productsResponse] = await Promise.all([
        getFeaturedProducts(),
        getProducts(page as number)
    ])
    const { products, page_size, current_size } = productsResponse;
    const totalPages = Math.ceil(page_size / current_size);


    return {
        props: {
            slider,
            products,
            currentPage: parseInt(page as string),
            totalPages:page_size
        }
    }

}