import React from 'react';

import { client } from '../lib/client';

import { FooterBanner, HeroBanner, Product } from '../components';


const Home = ({products, bannerData}) => (
 
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {/* {console.log(bannerData)} */}
      <></>
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speacers of many variations</p>
      </div>

      <div className='products-container'>
        {/* {['Product 1', 'Product 2'].map((product) => product)} */}
        {products?.map(
          (product) => product.name)}
      </div>

      <FooterBanner />
    </div>
);

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}


export default Home;