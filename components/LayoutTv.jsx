import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import TvRow from './TvRow';
import BgTv from './BgTv';
import Head from 'next/head';
import Nav from './Nav';

const LayoutTv = () => {
  const [others, setOthers] = useState(false);
  const router = useRouter();
  const movieTitles = ['POPULAR', 'TOP RATED', 'ON THE AIR', 'AIRING TODAY'];
  const [rnd, setRnd] = useState(0);
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
        <BgTv />
        <div className='pt-10'>
          <h2 className='text-5xl pb-4 border-l-[2px] pb-3 border-yellow-600'>
            {movieTitles[rnd]}:
          </h2>
          <TvRow
            fetchedGenre={movieTitles[rnd]
              .toLowerCase()
              .replace(' ', '_')
              .replace(' ', '_')}
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
                  <TvRow
                    fetchedGenre={element
                      .toLowerCase()
                      .replace(' ', '_')
                      .replace(' ', '_')}
                    title={element}
                    loadPage={1}
                  />
                </div>
              </>
            ))}
        </div>
        <button
          className='border-yellow-600 border-[2px] rounded-lg p-2 disabled:opacity-50'
          onClick={() => {
            setOthers((prev) => !prev);
          }}
        >
          {others ? 'Show Less' : 'Show Others'}
        </button>
      </motion.section>
    </>
  );
};

export default LayoutTv;
