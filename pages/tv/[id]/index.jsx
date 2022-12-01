import React from 'react';
import { useRouter } from 'next/router';
import { baseUrl } from '../../../Constants';
import Link from 'next/link';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

const Tv = () => {
  const [tv, setTv] = React.useState(undefined);
  const [similar, setSimilar] = React.useState([]);
  const [seasons, setSeasons] = React.useState([]);
  const [id, setId] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const seasonStyle = {
    borderRadius: '46px 46px 46px 46px',
    webkitBorderRadius: '46px 46px 46px 46px',
    mozBorderRadius: '46px 46px 46px 46px',
  };
  React.useEffect(() => {
    setId(router.query?.id);
  }, [router]);
  React.useEffect(() => {
    if (!id) return;
    const fetchTv = async () => {
      try {
        const resp = await fetch(
          `${baseUrl}/tv/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        );
        const returnTv = await resp.json();
        setTv(returnTv);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchTv();
  }, [id]);
  React.useEffect(() => {
    if (!id) return;
    const fetchSimilar = async () => {
      const resp = await fetch(
        `${baseUrl}/tv/${id}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      );
      const returnSimilar = await resp.json();
      setSimilar(returnSimilar.results);
    };
    fetchSimilar();
  }, [id]);
  React.useEffect(() => {
    if (!id) return;
    for (let i = 0; i < tv?.seasons.length; i++) {
      const fetchSeasons = async () => {
        const resp = await fetch(
          `${baseUrl}/tv/${id}/season/${i}/?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        );
        const returnSeasons = await resp.json();
        setSeasons((prevState) => {
          return [...prevState, returnSeasons];
        });
      };
      fetchSeasons();
    }
  }, [id]);
  const imgStyles = {
    boxShadow: ' -1px -13px 33px -1px rgba(0,0,0,0.75) inset',
  };
  console.log(seasons);
  console.log(tv?.seasons);
  if (loading) return <div>Loading...</div>;
  if (!loading && !tv?.original_name) return <div> NO DATA FOUND</div>;
  return (
    <section className='flex flex-col lg:items-start lg:justify-start lg:py-10 gap-6'>
      <div className='grid lg:grid-cols-5'>
        <img
          style={imgStyles}
          className='lg:col-span-3'
          src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
        />
        <div className='flex flex-col gap-5 lg:col-span-2 sm:text-sm px-2 pb-4'>
          <h2 className='text-5xl font-bold'>{tv.original_name}</h2>
          {tv.tagline && (
            <p className='font-semibold italic'>{`"${tv.tagline}"`}</p>
          )}
          <p className='lg:w-[35vw]'>{tv.overview}</p>
          <p>first aired in : {tv.first_air_date}.</p>
          <p>seasons: {tv.number_of_seasons}</p>
          <p>total episodes: {tv.number_of_episodes}</p>
          {tv.homepage && (
            <a
              target='_blank'
              href={tv?.homepage}
              className='border-yellow-600 border-[2px] rounded-lg p-2 w-fit'
              rel='noreferrer'
            >
              Movie Homepage
            </a>
          )}
        </div>
        <section className='w-[100vw] grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-9'>
          {tv?.seasons.map((season) => {
            return (
              <Link
                key={season.id}
                href={`/tv/${id}/season/${season.season_number}`}
              >
                <div
                  className={
                    season.name == 'Specials'
                      ? 'cursor-pointer overflow-hidden order-last'
                      : 'cursor-pointer overflow-hidden'
                  }
                >
                  <div className='overflow-hidden flex flex-col items-center justify-between'>
                    <h3>{season.name}</h3>
                    <div className='overflow-hidden' style={seasonStyle}>
                      <img
                        className=' aspect-auto  hover:scale-110 duration-500'
                        src={`https://image.tmdb.org/t/p/original${season.poster_path}`}
                      />
                    </div>
                    {/* {season.overview && (
                      <p className='lg:w-[20vw] text-xs md:text-base lg:text-lg'>{`"${season.overview}"`}</p>
                    )} */}
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </div>
      <div className='flex flex-wrap gap-5 '>
        <h2 className='text-5xl'>You may also like:</h2>
        <div className='flex flex-wrap items-center justify-center gap-8'>
          {similar?.length > 0 &&
            similar.map((res) => (
              <Link key={res.id} href={`/tv/${res.id}`}>
                <motion.div
                  className='flex flex-col items-center justify-center w-72 rounded gap-5 h-fit overflow-hidden relative'
                  initial={{ scale: 0.1 }}
                  animate={{ scale: 1 }}
                  key={res.id}
                >
                  <div className='overflow-hidden cursor-pointer aspect-square rounded-full'>
                    <img
                      className='w-100% hover:scale-110 duration-500'
                      src={`https://image.tmdb.org/t/p/w500${res.poster_path}`}
                    />
                  </div>
                  <h2 className='text-2xl font-bold'> {res.original_name} </h2>
                </motion.div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Tv;
