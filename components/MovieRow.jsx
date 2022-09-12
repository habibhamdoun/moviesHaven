import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { motion } from 'framer-motion';
import { baseUrl } from '../Constants';

const MovieRow = (props) => {
  const [data, setData] = React.useState(undefined);
  const [genreDataState, setGenreDataState] = React.useState(undefined);
  const router = useRouter();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          `${baseUrl}/movie/${props.fetchedGenre}?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
          }&page=${router.query?.page || 1}`,
        );
        const returnData = await resp.json();
        setData(returnData.results);
        setGenreDataState(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [genreDataState, data]);
  return (
    <section>
      <div
        //   className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 overflow-y-scroll'
        className='flex justify-center items-center gap-2 overflow-scroll'
      >
        <h2>{props.title}</h2>
        {genreDataState?.map((res) => (
          <Link key={res.id} href={`/movie/${res.id}`}>
            <motion.div
              key={res.id}
              className='flex flex-col items-center justify-center h-fit overflow-hidden relative w-[20rem] aspect-auto'
              initial={{ scale: 0.1 }}
              animate={{ scale: 1 }}
            >
              <div className='overflow-hidden cursor-pointer'>
                <img
                  className='w-100% hover:scale-110 duration-500'
                  src={`https://image.tmdb.org/t/p/original${res.poster_path}`}
                />
              </div>
              <h2 className='text-2xl font-bold'> {res.original_title} </h2>
            </motion.div>
          </Link>
        ))}
      </div>{' '}
    </section>
  );
};

export default MovieRow;
