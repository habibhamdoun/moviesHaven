import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import MovieRow from './MovieRow';
import BgMovie from './BgMovie';
import Head from 'next/head';
import Nav from './Nav';
const LayoutMovie = () => {
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
        <BgMovie />

        <div className='pt-10'>
          <h2 className='text-5xl pb-4 border-l-[2px] pb-3 border-yellow-600'>
            NOW PLAYING:
          </h2>
          <MovieRow
            fetchedGenre={'now_playing'}
            title={'NOW PLAYING:'}
            loadPage={1}
          />
          <h2 className='text-5xl pb-4 border-l-[2px] pb-3 border-yellow-600'>
            TOP RATED:
          </h2>
          <MovieRow
            fetchedGenre={'top_rated'}
            title={'TOP RATED:'}
            loadPage={1}
          />
          <h2 className='text-5xl pb-4 border-l-[2px] pb-3 border-yellow-600'>
            UPCOMING:
          </h2>
          <MovieRow
            fetchedGenre={'upcoming'}
            title={'UPCOMING:'}
            loadPage={1}
          />
          <h2 className='text-5xl pb-4 border-l-[2px] pb-3 border-yellow-600'>
            POPULAR:
          </h2>
          <MovieRow fetchedGenre={'popular'} title={'POPULAR:'} loadPage={2} />
        </div>
      </motion.section>
    </>
  );
};

export default LayoutMovie;
