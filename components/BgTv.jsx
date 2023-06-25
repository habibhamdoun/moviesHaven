import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { set } from 'nprogress';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../Constants';

const BgTv = () => {
  const [bgTv, setBgTv] = React.useState({
    name: 'Cobra Kai',
    backdrop_path: '/g63KmFgqkvXu6WKS23V56hqEidh.jpg',
    overview:
      'This Karate Kid sequel series picks up 30 years after the events of the 1984 All Valley Karate Tournament and finds Johnny Lawrence on the hunt for redemption by reopening the infamous Cobra Kai karate dojo. This reignites his old rivalry with the successful Daniel LaRusso, who has been working to maintain the balance in his life without mentor Mr. Miyagi.',
  });
  const [data, setData] = React.useState(undefined);
  const [genreDataState, setGenreDataState] = React.useState(undefined);
  const [page, setPage] = React.useState(null);
  const [maxPages, setMaxPages] = React.useState(0);
  const [apiCallDone, setApiCallDone] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        if (!apiCallDone) {
          try {
            const resp = await fetch(
              `${baseUrl}/tv/top_rated?api_key=${
                process.env.NEXT_PUBLIC_API_KEY
              }&page=${page || 1}`,
            );
            const returnData = await resp.json();
            setGenreDataState(returnData?.results);
            setMaxPages(returnData?.total_pages);
            console.log(genreDataState);
            changeBg();
          } catch (err) {
            console.log(err);
          }
        }
      };
      fetchData();
    }, 5000);
  }, [genreDataState]);
  const [dropDown, setDropDown] = useState(false);
  function changeBg() {
    if (!genreDataState) return;
    let random = Math.floor(Math.random() * genreDataState?.length);
    setTimeout(() => {
      setBgTv({
        name: genreDataState[random]?.name,
        overview: genreDataState[random]?.overview,
        backdrop_path: genreDataState[random]?.backdrop_path,
        id: genreDataState[random]?.id,
      });
    }, 6000);

    console.log(bgTv);
  }
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.screen.width < 768) {
      setIsMobile(true);
    }
  }, []);
  console.log(bgTv.name);
  return (
    <section>
      <motion.div className='w-[100vw] relative' key={bgTv}>
        <motion.img
          initial={{ translateX: 1000 }}
          animate={{ translateX: 0 }}
          src={`https://image.tmdb.org/t/p/w1280${
            bgTv ? bgTv.backdrop_path : '/xfNHRI2f5kHGvogxLd0C5sB90L7.jpg}'
          }`}
          key={bgTv.backdrop_path}
          className={
            isMobile
              ? 'w-[100vw] h-[35vh] aspect-auto relative'
              : 'w-[100vw] h-[100vh] aspect-auto relative'
          }
          alt='loading...
          '
        />
        <motion.div
          className={
            isMobile
              ? 'flex flex-col justify-start items-start bg-transparent gap-6 border-l-[2px] pb-3 border-yellow-600 pl-8 w-[100%] h-fit'
              : 'flex flex-col justify-start items-start bg-transparent gap-6 border-l-[2px] pb-3 border-yellow-600 pl-8 absolute bottom-0  w-[100%] h-fit'
          }
          initial={{ translateX: -1000 }}
          animate={{ translateX: 0 }}
          key={bgTv.name}
        >
          <h2
            className={
              isMobile
                ? 'text-5xl font-extrabold pb-2 bg-transparent'
                : 'text-7xl font-extrabold pb-2 bg-transparent'
            }
          >
            {bgTv.name}
          </h2>
          <p
            className={
              'w-[40%] overflow-hidden h-[200px] bg-transparent text-base'
            }
          >{`"${bgTv?.overview == '' ? changeBg() : bgTv.overview}"`}</p>
          {isMobile && <span className={'bg-transparent border-0 '}>...</span>}
          <Link href={`/movie/${bgTv?.id}`}>
            <button
              className={
                isMobile
                  ? 'border-yellow-600 border-[2px] rounded-lg p-2 w-fit mt-7 text-2xl whitespace-nowrap'
                  : 'border-yellow-600 border-[2px] rounded-lg p-2 w-fit mt-7 text-4xl'
              }
            >
              About This Movie
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BgTv;
