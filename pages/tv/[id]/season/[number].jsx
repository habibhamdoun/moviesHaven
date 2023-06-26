import React from 'react';
import { useRouter } from 'next/router';
import { baseUrl } from '../../../../Constants';
import Head from 'next/head';

const Season = () => {
  const router = useRouter();
  const [season, setSeason] = React.useState(undefined);
  const [number, setNumber] = React.useState(null);
  const [tv, setTv] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    setId(router.query.id);
    setNumber(router.query.number);
    setLoading(false);
  }, [router]);
  // console.log(router);
  React.useEffect(() => {
    if (!id || !number) return;
    const fetchSeason = async () => {
      try {
        const resp = await fetch(
          `${baseUrl}/tv/${id}/season/${number}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        );
        const returnSeason = await resp.json();
        setSeason(returnSeason);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSeason();
  }, [id, number]);
  React.useEffect(() => {
    const fetchTv = async () => {
      try {
        const resp = await fetch(
          `${baseUrl}/tv/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        );
        const returnTv = await resp.json();
        setTv(returnTv?.seasons?.length);
        console.log(tv);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTv();
  }, [id]);
  if (loading) {
    return <div>loading...</div>;
  }
  if (!season) {
    return <div>NO DATA FOUND</div>;
  }
  return (
    <>
      <Head>
        <title>{season.name}-MoviesHaven</title>
        <meta
          name='description'
          content='Discover and explore a dynamic movie showcase powered by Next.js and the TMDB API. Experience a constantly updated collection of movies, featuring the latest releases, popular films, and timeless classics. With automatic updates and seamless navigation, this website brings the world of cinema to your fingertips.'
        />
        <link rel='icon' href='/favicon.ico' type='image/x-icon'></link>
      </Head>
      <section className='flex flex-col items-center'>
        <div className='flex items-start gap-6 lg:flex-col'>
          <div className='overflow-hidden'>
            <img
              className='w-[20rem] aspect-auto hover:scale-110 duration-500'
              src={`https://image.tmdb.org/t/p/original${season.poster_path}`}
              alt='episode image'
            />
          </div>
          <div className='flex flex-col gap-5 pt-[5%] max-w-[50vw]'>
            <h2 className='text-5xl font-bold'>{season.name}</h2>
            <p>{`"${season.overview}"`}</p>
            <p>Air Date: {season.air_date}</p>
            <p>Episodes : {season.episodes.length}.</p>
            <div className='flex gap-4'>
              <button
                onClick={() => {
                  router.push(`/tv/${id}/season/${parseInt(number) - 1}`);
                }}
                className='border-yellow-600 border-[2px] rounded-lg p-2 w-fit disabled:opacity-50'
                disabled={parseInt(number) <= 1}
              >
                Previous Season
              </button>
              <button
                onClick={() => {
                  router.push(`/tv/${id}/season/${parseInt(number) + 1}`);
                }}
                className='border-yellow-600 border-[2px] rounded-lg p-2 w-fit disabled:opacity-50'
                disabled={parseInt(number) === tv}
              >
                Next Season
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className='text-4xl font-bold py-10'>Episodes:</h2>
          {season.episodes.map((ep) => {
            // console.log(ep);
            return (
              <div key={ep.id} className='grid grid-cols-4 gap-6'>
                <div className='overflow-hidden col-span-2 '>
                  <img
                    className='hover:scale-110 duration-500 py-5'
                    src={`https://image.tmdb.org/t/p/w1280${ep.still_path}`}
                  />
                </div>
                <div className='flex flex-col col-span-2 gap-5 pt-[5%] pl-6 sm:text-sm'>
                  <h2 className='text-5xl font-bold'>{ep.name}</h2>
                  <p>{`"${ep.overview}"`}</p>
                  <p>Air Date: {ep.air_date}</p>
                  <p>
                    runtime :{' '}
                    {Math.floor(ep.runtime / 60) != 0 &&
                      `${Math.floor(ep.runtime / 60)}hr`}{' '}
                    {ep.runtime % 60} minutes.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Season;
