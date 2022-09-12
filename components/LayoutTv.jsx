import React from 'react';
import Link from 'next/link';
import { baseUrl } from '../Constants';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useRouter } from 'next/router';

const LayoutTv = () => {
  const [data, setData] = React.useState([]);
  const [genre, setGenre] = React.useState('latest');
  const [fetchedGenre, setFetchedGenre] = React.useState('popular');
  const [genreDataState, setGenreDataState] = React.useState(undefined);
  const [loading, setLoading] = React.useState(true);
  const [maxPages, setMaxPages] = React.useState(0);
  const [bgMovie, setBgMovie] = React.useState(
    genreDataState
      ? genreDataState[0]
      : {
          original_name: 'Cobra Kai',
          backdrop_path: '/g63KmFgqkvXu6WKS23V56hqEidh.jpg',
          overview:
            'This Karate Kid sequel series picks up 30 years after the events of the 1984 All Valley Karate Tournament and finds Johnny Lawrence on the hunt for redemption by reopening the infamous Cobra Kai karate dojo. This reignites his old rivalry with the successful Daniel LaRusso, who has been working to maintain the balance in his life without mentor Mr. Miyagi.',
        },
  );
  const router = useRouter();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          `${baseUrl}/tv/${fetchedGenre ? fetchedGenre : 'popular'}?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
          }&page=${router.query?.page || 1}`,
        );
        const returnData = await resp.json();
        setData(returnData.results);
        setGenreDataState(data);
        setMaxPages(returnData.total_pages);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
      // console.log(returnData);
      // console.log(resp);
    };
    fetchData();
  }, [router, fetchedGenre, data]);
  function randomMovie() {
    if (!genreDataState) return;
    let randomNum = Math.floor(Math.random() * 20);
    setBgMovie(genreDataState[randomNum]);
    console.log(bgMovie);
  }
  React.useEffect(() => {
    randomMovie();
  }, []);
  React.useEffect(() => {
    setFetchedGenre('popular');
  }, []);
  async function changeGenre(num) {
    setFetchedGenre(undefined);
    if (!data) return;
    setGenre(num);
    setGenreDataState(() => {
      return data.filter((movie) => {
        if (movie.genre_ids?.includes(num)) return movie;
      });
    });
    console.log('changed');
  }
  function genreName(gen) {
    if (gen == 35) return <span>Comedy</span>;
    if (gen == 18) return <span>Drama</span>;
  }
  if (loading) return <div>loading...</div>;
  if (!data) {
    return <div className='text-5xl'>no data found</div>;
  }
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
        <button onClick={randomMovie}>Change</button>
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
      <div className='flex justify-around flex-wrap'>
        <button
          className={
            fetchedGenre === 'popular'
              ? 'border-yellow-600 border-[2px] rounded-lg p-2 w-fit m-6 font-bold text-xl bg-gray-600'
              : 'border-yellow-600 border-[2px] rounded-lg p-2 w-fit m-6'
          }
          onMouseDown={() => {
            setGenreDataState(data);
            setFetchedGenre('popular');
            setGenre('popular');
          }}
        >
          Popular
        </button>
        <button
          className={
            fetchedGenre === 'on_the_air'
              ? 'border-yellow-600 border-[2px] rounded-lg p-2 w-fit m-6 font-bold text-xl bg-gray-600'
              : 'border-yellow-600 border-[2px] rounded-lg p-2 w-fit m-6'
          }
          onMouseDown={() => {
            setGenreDataState(data);
            setFetchedGenre('on_the_air');
            setGenre('on_the_air');
          }}
        >
          On The Air
        </button>
        <button
          className={
            fetchedGenre === 'airing_today'
              ? 'border-yellow-600 border-[2px] rounded-lg p-2 w-fit m-6 font-bold text-xl bg-gray-600'
              : 'border-yellow-600 border-[2px] rounded-lg p-2 w-fit m-6'
          }
          onMouseDown={() => {
            setGenreDataState(data);
            setFetchedGenre('airing_today');
            setGenre('airing_today');
          }}
        >
          Airing Today
        </button>
        <button
          className={
            fetchedGenre === 'top_rated'
              ? 'border-yellow-600 border-[2px] rounded-lg p-2 w-fit m-6 font-bold text-xl bg-gray-600'
              : 'border-yellow-600 border-[2px] rounded-lg p-2 w-fit m-6'
          }
          onMouseDown={() => {
            setGenreDataState(data);
            setFetchedGenre('top_rated');
            setGenre('topRated');
          }}
        >
          Top rated
        </button>
        <button
          className={
            genre === 35
              ? 'border-yellow-600 border-[2px] rounded-lg p-2 w-fit m-6 font-bold text-xl bg-gray-600'
              : 'border-yellow-600 border-[2px] rounded-lg p-2 w-fit m-6'
          }
          onMouseDown={async () => await changeGenre(35)}
        >
          Comedy
        </button>
        <button
          className={
            genre === 18
              ? 'border-yellow-600 border-[2px] rounded-lg p-2 w-fit m-6 font-bold text-xl bg-gray-600'
              : 'border-yellow-600 border-[2px] rounded-lg p-2 w-fit m-6'
          }
          onMouseDown={async () => await changeGenre(18)}
        >
          Drama
        </button>
      </div>
      <div
        // className="flex  justify-center items-center flex-wrap gap-6"
        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'
      >
        {genreDataState?.length < 1 ? (
          <div>no {genreName(genre)} movies available on this page</div>
        ) : (
          genreDataState?.map((res) => (
            <Link key={res.id} href={`/tv/${res.id}`}>
              <motion.div
                className='flex flex-col items-center justify-center h-fit overflow-hidden relative'
                initial={{ scale: 0.1 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                key={res.id}
              >
                <div className='overflow-hidden cursor-pointer'>
                  <img
                    className='w-100% hover:scale-110 duration-500'
                    src={`https://image.tmdb.org/t/p/original${res.poster_path}`}
                  />
                </div>
                <h2 className='text-2xl font-bold'> {res.original_name} </h2>
              </motion.div>
            </Link>
          ))
        )}
      </div>
      <div className='flex justify-center gap-5 py-6'>
        <button
          onClick={() => {
            router.push(
              router.basePath + `?page=${parseInt(router.query.page) - 1}`,
            );
          }}
          className='border-yellow-600 border-[2px] rounded-lg p-2 disabled:opacity-50'
          disabled={!router.query.page || router.query.page == 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            router.push(
              router.basePath +
                `?page=${parseInt(router.query?.page || 1) + 1}`,
            );
          }}
          className='border-yellow-600 border-[2px] rounded-lg p-2 disabled:opacity-50'
          disabled={parseInt(router.query.page) === maxPages}
        >
          Next Page
        </button>
      </div>
    </motion.section>
  );
};

export default LayoutTv;
