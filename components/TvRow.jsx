import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { baseUrl } from '../Constants';

const TvRow = (props) => {
  const [data, setData] = React.useState(undefined);
  const [genreDataState, setGenreDataState] = React.useState(undefined);
  const [page, setPage] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [maxPages, setMaxPages] = React.useState(0);
  const [loadPage, seetLoadPage] = React.useState(props.loadPage);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.screen.width < 768) {
      setIsMobile(true);
    }
  }, []);
  const tvStyle = {
    borderRadius: '46px 46px 46px 46px',
    webkitBorderRadius: '46px 46px 46px 46px',
    mozBorderRadius: '46px 46px 46px 46px',
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          `${baseUrl}/tv/${props.fetchedGenre}?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
          }&page=${page || loadPage}`,
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
    };
    fetchData();
  }, [genreDataState, data, page]);
  if (loading) return <div>loading...</div>;
  if (!data) {
    return <div className='text-5xl'>no data found</div>;
  }
  return (
    <>
      <section className='overflow-scroll w-[100vw] lg:scrollbar-hide'>
        <div className='flex w-fit gap-5'>
          {genreDataState?.map((res) => (
            <Link key={res.id} href={`/tv/${res.id}`}>
              <motion.div
                key={res.id}
                className='flex flex-col items-center justify-center h-fit overflow-hidden relative w-[20rem] aspect-auto'
                initial={{ translateX: isMobile ? 150 : 300 }}
                whileInView={{ translateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <div className='overflow-hidden cursor-pointer' style={tvStyle}>
                  <img
                    className='w-[100%] hover:scale-110 duration-500'
                    src={`https://image.tmdb.org/t/p/original${res.poster_path}`}
                  />
                </div>
                <h2 className='text-2xl font-bold'> {res.original_name} </h2>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
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
    </>
  );
};

export default TvRow;
