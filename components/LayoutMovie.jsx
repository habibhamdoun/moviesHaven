import React from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import MovieRow from './MovieRow';
import BgMovie from './BgMovie';

const LayoutMovie = () => {
  const [test, setTest] = React.useState(false);
  const [bgMovie, setBgMovie] = React.useState({
    original_title: 'Orphan: First Kill',
    overview:
      'After escaping from an Estonian psychiatric facility, Leena Klammer travels to America by impersonating Esther, the missing daughter of a wealthy family. But when her mask starts to slip, she is put against a mother who will protect her family from the murderous “child” at any cost.',
    backdrop_path: '/5GA3vV1aWWHTSDO5eno8V5zDo8r.jpg',
  });
  function handleClick(receivedData) {
    setTest(true);
    if (!receivedData) return handleClick;
    setInterval(() => {
      let random = Math.floor(Math.random() * receivedData?.length);
      setBgMovie(receivedData[random]);
      console.log(bgMovie);
    }, 3000);
    if (test) return;
  }
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
          handleClick={handleClick}
        />
        <MovieRow
          fetchedGenre={'top_rated'}
          title={'TOP RATED:'}
          handleClick={handleClick}
        />
        <MovieRow
          fetchedGenre={'upcoming'}
          title={'UPCOMING:'}
          handleClick={handleClick}
        />
        <MovieRow
          fetchedGenre={'popular'}
          title={'POPULAR:'}
          handleClick={handleClick}
        />
      </div>
    </motion.section>
  );
};

export default LayoutMovie;
