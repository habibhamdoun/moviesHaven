import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import TvRow from './TvRow';
import BgTv from './BgTv';
import Head from 'next/head';
import Nav from './Nav';

const LayoutTv = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>MoviesHaven</title>
      </Head>
      <motion.section
        className='flex flex-col items-center'
        transition={{ duration: 100 }}
      >
        <Nav />
        <BgTv />
        <div className='pt-10'>
          <h2 className='text-5xl mt-2 py-4 border-yellow-600 border-l-[2px]'>
            POPULAR:
          </h2>
          <TvRow fetchedGenre={'popular'} title={'POPULAR:'} loadPage={1} />
          <h2 className='text-5xl mt-2 py-4 border-yellow-600 border-l-[2px]'>
            TOP RATED:
          </h2>
          <TvRow fetchedGenre={'top_rated'} title={'TOP RATED:'} loadPage={1} />
          <h2 className='text-5xl mt-2 py-4 border-yellow-600 border-l-[2px]'>
            ON THE AIR:
          </h2>
          <TvRow
            fetchedGenre={'on_the_air'}
            title={'ON THE AIR:'}
            loadPage={2}
          />
          <h2 className='text-5xl mt-2 py-4 border-yellow-600 border-l-[2px]'>
            AIRING TODAY:
          </h2>
          <TvRow
            fetchedGenre={'airing_today'}
            title={'AIRING TODAY:'}
            loadPage={1}
          />
        </div>
      </motion.section>
    </>
  );
};

export default LayoutTv;
