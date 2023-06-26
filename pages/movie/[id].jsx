import React from 'react';
import { useRouter } from 'next/router';
import { baseUrl } from '../../Constants';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Head from 'next/head';

const Movie = () => {
  const [movie, setMovie] = React.useState(undefined);
  const [similar, setSimilar] = React.useState([]);
  const [id, setId] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  React.useEffect(() => {
    setId(router.query?.id);
  }, [router]);
  React.useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      try {
        const resp = await fetch(
          `${baseUrl}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        );
        const returnMovie = await resp.json();
        setMovie(returnMovie);
        console.log(returnMovie);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);
  React.useEffect(() => {
    if (!id) return;
    const fetchSimilar = async () => {
      const resp = await fetch(
        `${baseUrl}/movie/${id}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      );
      const returnSimilar = await resp.json();
      setSimilar(returnSimilar.results);
    };
    fetchSimilar();
  }, [id]);
  if (loading) return <div>Loading...</div>;
  if (!loading && !movie?.original_title) return <div> NO DATA FOUND</div>;
  return (
    <>
      <Head>
        <title>{movie.original_title}-MoviesHaven</title>
        <meta
          name='description'
          content='Discover and explore a dynamic movie showcase powered by Next.js and the TMDB API. Experience a constantly updated collection of movies, featuring the latest releases, popular films, and timeless classics. With automatic updates and seamless navigation, this website brings the world of cinema to your fingertips.'
        />
        <link rel='icon' href='/favicon.ico' type='image/x-icon'></link>
      </Head>
      <section className='flex flex-col lg:items-center lg:justify-center lg:py-10 gap-6'>
        <div
          className='md:flex md:items-center md:justify-center md:gap-3 
        lg:items-center lg:flex-row
        '
        >
          <img
            className='lg:col-span-3 max-h-[50vh] max-w-[50vw] md:w-[100%] md:h-[100%] md:bg-cover'
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt='loading...'
          />
          <div className='flex flex-col gap-5 lg:col-span-2 sm:text-sm px-2 border-l-[2px] pb-3 border-yellow-600'>
            <h2 className='text-5xl font-bold'>{movie.original_title}</h2>
            {movie.tagline && (
              <p className='font-semibold italic'>{`"${movie.tagline}"`}</p>
            )}
            <p className='lg:w-[35vw]'>{movie.overview}</p>
            <p>in cinemas : {movie.release_date}.</p>
            {movie.status == 'Released' ? (
              <div className='w-[10px] h-[10px] rounded-full bg-green-500'></div>
            ) : (
              <div className='w-[10px] h-[10px] rounded-full bg-red-500'></div>
            )}
            {console.log(movie.status)}
            <p>
              movie length : {Math.floor(movie.runtime / 60)}hr{' '}
              {movie.runtime % 60} minutes.
            </p>
            {movie.homepage && (
              <a
                target='_blank'
                href={movie?.homepage}
                className='border-yellow-600 border-[2px] rounded-lg p-2 w-fit'
                rel='noreferrer'
              >
                Movie Homepage
              </a>
            )}
          </div>
        </div>

        <div className='flex flex-wrap gap-5 '>
          <h2 className='text-5xl'>You may also like:</h2>
          <div className='flex flex-wrap items-center justify-center gap-8'>
            {similar?.length > 0 &&
              similar.map((res) => (
                <Link key={res.id} href={`/movie/${res.id}`}>
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
                    <h2 className='text-2xl font-bold'>
                      {' '}
                      {res.original_title}{' '}
                    </h2>
                  </motion.div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Movie;
