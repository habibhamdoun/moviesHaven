import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import MovieRow from './MovieRow';

const LayoutMovie = () => {
  const [bgMovie, setBgMovie] = React.useState({
    original_title: 'Orphan: First Kill',
    overview:
      'After escaping from an Estonian psychiatric facility, Leena Klammer travels to America by impersonating Esther, the missing daughter of a wealthy family. But when her mask starts to slip, she is put against a mother who will protect her family from the murderous “child” at any cost.',
    backdrop_path: '/5GA3vV1aWWHTSDO5eno8V5zDo8r.jpg',
  });
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
      <div className='w-[100vw] relative'>
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
            {bgMovie?.original_title}
          </h2>
          <p className='w-[40%]'>{`"${bgMovie?.overview}"`}</p>
          <Link href={`/movie/${bgMovie?.id}`}>
            <button className='border-yellow-600 border-[2px] rounded-lg p-2 w-fit mt-7 text-4xl'>
              About The Movie
            </button>
          </Link>
        </div>
      </div>
      <div className='pt-10'>
        <MovieRow fetchedGenre={'now_playing'} title={'NOW PLAYING:'} />
        <MovieRow fetchedGenre={'top_rated'} title={'TOP RATED:'} />
        <MovieRow fetchedGenre={'upcoming'} title={'UPCOMING:'} />
        <MovieRow fetchedGenre={'popular'} title={'POPULAR:'} />
      </div>
    </motion.section>
  );
};

export default LayoutMovie;
