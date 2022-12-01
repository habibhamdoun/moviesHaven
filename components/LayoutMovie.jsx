import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import MovieRow from './MovieRow';
import BgMovie from './BgMovie';

const LayoutMovie = () => {
  const router = useRouter();
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
      <BgMovie />

      <div className='pt-10'>
        <MovieRow
          fetchedGenre={'now_playing'}
          title={'NOW PLAYING:'}
          loadPage={1}
        />
        <MovieRow
          fetchedGenre={'top_rated'}
          title={'TOP RATED:'}
          loadPage={1}
        />
        <MovieRow fetchedGenre={'upcoming'} title={'UPCOMING:'} loadPage={1} />
        <MovieRow fetchedGenre={'popular'} title={'POPULAR:'} loadPage={2} />
      </div>
    </motion.section>
  );
};

export default LayoutMovie;
