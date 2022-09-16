import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import TvRow from './TvRow';

const LayoutTv = () => {
  const [bgMovie, setBgMovie] = React.useState({
    original_name: 'Cobra Kai',
    backdrop_path: '/g63KmFgqkvXu6WKS23V56hqEidh.jpg',
    overview:
      'This Karate Kid sequel series picks up 30 years after the events of the 1984 All Valley Karate Tournament and finds Johnny Lawrence on the hunt for redemption by reopening the infamous Cobra Kai karate dojo. This reignites his old rivalry with the successful Daniel LaRusso, who has been working to maintain the balance in his life without mentor Mr. Miyagi.',
  });
  function handleClick(receivedData) {
    if (!receivedData) return handleClick;
    let random = Math.floor(Math.random() * receivedData?.length);
    setBgMovie(receivedData[random]);
    console.log(bgMovie);
  }
  React.useEffect(() => {
    handleClick();
  }, []);
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
      <motion.div className='w-[100vw] relative'>
        <img
          src={`https://image.tmdb.org/t/p/w1280${
            bgMovie
              ? bgMovie.backdrop_path
              : '/xfNHRI2f5kHGvogxLd0C5sB90L7.jpg}'
          }`}
          className='w-[100vw] h-[100vh] aspect-auto relative'
        />
        <div className='flex flex-col justify-start items-start gap-6 border-l-[2px] pb-3 border-yellow-600 pl-8 absolute bottom-0 bg-[rgba(0,0,0,0.4)] w-[100%]'>
          <h2 className='text-7xl font-extrabold pb-2'>
            {bgMovie?.original_name}
          </h2>
          <p className='w-[40%]'>{`"${bgMovie?.overview}"`}</p>
          <Link href={`/movie/${bgMovie?.id}`}>
            <button className='border-yellow-600 border-[2px] rounded-lg p-2 w-fit mt-7 text-4xl'>
              About The Movie
            </button>
          </Link>
        </div>
      </motion.div>
      <TvRow
        fetchedGenre={'popular'}
        title={'POPULAR:'}
        handleClick={handleClick}
      />
      <TvRow
        fetchedGenre={'top_rated'}
        title={'TOP RATED:'}
        handleClick={handleClick}
      />
      <TvRow
        fetchedGenre={'on_the_air'}
        title={'ON THE AIR:'}
        handleClick={handleClick}
      />
      <TvRow
        fetchedGenre={'airing_today'}
        title={'AIRING TODAY:'}
        handleClick={handleClick}
      />
    </motion.section>
  );
};

export default LayoutTv;
