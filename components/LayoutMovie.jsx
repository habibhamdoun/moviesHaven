import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import MovieRow from './MovieRow';
import BgMovie from './BgMovie';
import Head from 'next/head';
import Nav from './Nav';
const LayoutMovie = () => {
  const [others, setOthers] = useState(false);
  const router = useRouter();
  const movieTitles = ['NOW PLAYING', 'TOP RATED', 'UPCOMING', 'POPULAR'];
  const [rnd, setRnd] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    setRnd(Math.floor(Math.random() * movieTitles.length));
  }, []);
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
            {movieTitles[rnd]}:
          </h2>
          <MovieRow
            fetchedGenre={movieTitles[rnd].toLowerCase().replace(' ', '_')}
            title={movieTitles[rnd]}
            loadPage={2}
          />
        </div>

        <div className='pt-10'>
          {others &&
            movieTitles.map((element) => (
              <>
                <div>
                  <h2 className='text-5xl pb-4 border-l-[2px] pb-3 border-yellow-600'>
                    {element}:
                  </h2>
                  <MovieRow
                    fetchedGenre={element.toLowerCase().replace(' ', '_')}
                    title={element}
                    loadPage={1}
                  />
                </div>
              </>
            ))}
        </div>
        <button
          className='border-yellow-600 border-[2px] rounded-lg p-2 disabled:opacity-50'
          onClick={(e) => {
            e.stopPropagation();
            setOthers((prev) => !prev);
          }}
        >
          {others ? 'Show Less' : 'Show Others'}
        </button>
      </motion.section>
    </>
  );
};

export default LayoutMovie;
