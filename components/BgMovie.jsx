import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { set } from 'nprogress';
import React from 'react';
import { baseUrl } from '../Constants';

const BgMovie = () => {
  const [bgMovie, setBgMovie] = React.useState({
    original_title: 'Orphan: First Kill',
    overview:
      'After escaping from an Estonian psychiatric facility, Leena Klammer travels to America by impersonating Esther, the missing daughter of a wealthy family. But when her mask starts to slip, she is put against a mother who will protect her family from the murderous “child” at any cost.',
    backdrop_path: '/5GA3vV1aWWHTSDO5eno8V5zDo8r.jpg',
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
              `${baseUrl}/movie/popular?api_key=${
                process.env.NEXT_PUBLIC_API_KEY
              }&page=${page || 1}`,
            );
            const returnData = await resp.json();
            setData(returnData?.results);
            setMaxPages(returnData?.total_pages);
            setGenreDataState(data && data);
            console.log(genreDataState);
            changeBg();
          } catch (err) {
            console.log(err);
          }
        }
      };
      fetchData();
    }, 2000);
  }, [genreDataState, data]);
  function changeBg() {
    let random = Math.floor(Math.random() * genreDataState?.length);
    setTimeout(() => {
      setBgMovie({
        original_title: genreDataState[random]?.original_title,
        overview: genreDataState[random]?.overview,
        backdrop_path: genreDataState[random]?.backdrop_path,
      });
    }, 3000);
    console.log(bgMovie);
  }
  return (
    <section>
      <AnimatePresence>
        {bgMovie && (
          <motion.div
            initial={{ translateX: -1000 }}
            animate={{ translateX: 0 }}
            exit={{ translateX: 1000 }}
            className='w-[100vw] relative'
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BgMovie;
