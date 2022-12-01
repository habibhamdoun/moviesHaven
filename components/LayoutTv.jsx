import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TvRow from './TvRow';
import BgTv from './BgTv';

const LayoutTv = () => {
  return (
    <motion.section
      className='flex flex-col items-center'
      transition={{ duration: 100 }}
    >
      <div className='flex justify-between p-5 w-[90vw]'>
        <Link href='/movies'>
          <button
            className={
              router.asPath == '/movies'
                ? 'border-yellow-600 border-[2px] rounded-lg p-2 w-fit m-6 font-bold text-xl bg-gray-600'
                : 'border-yellow-600 border-[2px] rounded-lg p-2 w-fit m-6'
            }
          >
            Movies
          </button>
        </Link>
        <p>
          Welcome to{' '}
          <span className='text-2xl'>
            Movies <span className='text-yellow-600'> Hub </span>
          </span>
        </p>
        <Link href='/tv'>
          <button
            className={
              router.asPath == '/tv'
                ? 'border-yellow-600 border-[2px] rounded-lg p-2 w-fit m-6 font-bold text-xl bg-gray-600'
                : 'border-yellow-600 border-[2px] rounded-lg p-2 w-fit m-6'
            }
          >
            Tv Shows
          </button>
        </Link>
      </div>
      <BgTv />
      <TvRow fetchedGenre={'popular'} title={'POPULAR:'} />
      <TvRow fetchedGenre={'top_rated'} title={'TOP RATED:'} />
      <TvRow fetchedGenre={'on_the_air'} title={'ON THE AIR:'} />
      <TvRow fetchedGenre={'airing_today'} title={'AIRING TODAY:'} />
    </motion.section>
  );
};

export default LayoutTv;
