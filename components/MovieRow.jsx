import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { baseUrl } from '../Constants';

const MovieRow = (props) => {
  const [data, setData] = React.useState(undefined);
  const [genreDataState, setGenreDataState] = React.useState(undefined);
  const [page, setPage] = React.useState(null);
  const [maxPages, setMaxPages] = React.useState(0);
  const [loadPage, setLoadPage] = React.useState(props.loadPage);
  const movieStyle = {
    borderRadius: '46px 46px 46px 46px',
    webkitBorderRadius: '46px 46px 46px 46px',
    mozBorderRadius: '46px 46px 46px 46px',
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          `${baseUrl}/movie/${props.fetchedGenre}?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
          }&page=${page || loadPage}`,
        );
        const returnData = await resp.json();
        setData(returnData.results);
        setGenreDataState(data);
        setMaxPages(returnData.total_pages);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [genreDataState, data, page]);
  if (!data) {
    return <div className='text-5xl'>no data found</div>;
  }
  return (
    <section className='overflow-scroll w-[100vw] lg:scrollbar-hide'>
      <h2 className='text-5xl pb-4 border-l-[2px] pb-3 border-yellow-600'>
        {props.title}
      </h2>
      <div className='flex w-fit gap-5'>
        {genreDataState?.map((res) => (
          <Link key={res.id} href={`/movie/${res.id}`}>
            <motion.div
              key={res.id}
              className='flex flex-col items-center justify-center h-fit overflow-hidden relative w-[20rem] aspect-auto '
              initial={{ scale: 0.1 }}
              animate={{ scale: 1 }}
            >
              <div
                className='overflow-hidden cursor-pointer'
                style={movieStyle}
              >
                <img
                  className='w-[100%] hover:scale-110 duration-500 rounded-md'
                  src={`https://image.tmdb.org/t/p/original${res.poster_path}`}
                />
              </div>
              <h2 className='text-2xl font-bold'> {res.original_title} </h2>
            </motion.div>
          </Link>
        ))}
      </div>
      <div className='flex justify-center gap-5 py-6'>
        <button
          onClick={() => {
            setPage((prevPage) => (prevPage -= 1));
          }}
          className='border-yellow-600 border-[2px] rounded-lg p-2 disabled:opacity-50'
          disabled={!page || page === 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            setPage((prevPage) => (prevPage += 1));
          }}
          className='border-yellow-600 border-[2px] rounded-lg p-2 disabled:opacity-50'
          disabled={page === maxPages}
        >
          Next Page
        </button>
      </div>
    </section>
  );
};

export default MovieRow;
