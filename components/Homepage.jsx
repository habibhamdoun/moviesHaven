import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Homepage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.screen.width < 768) {
      setIsMobile(true);
    }
  }, []);
  return (
    <section className='h-[100vh] flex flex-col items-center justify-center gap-8 homepage '>
      <h1 className={isMobile ? 'text-4xl font-bold' : 'text-6xl font-bold'}>
        What are you looking for?
      </h1>
      <div className='flex gap-5 '>
        <Link href={`/movies`}>
          <h2
            className={
              isMobile
                ? 'text-2xl font-extrabold bg-yellow-600  rounded-lg p-2 w-fit cursor-pointer'
                : 'text-4xl font-extrabold bg-yellow-600  rounded-lg p-2 w-fit cursor-pointer'
            }
          >
            Movies
          </h2>
        </Link>
        <Link href={`/tv`}>
          <h2
            className={
              isMobile
                ? 'text-2xl font-extrabold bg-yellow-600  rounded-lg p-2 w-fit cursor-pointer'
                : 'text-4xl font-extrabold bg-yellow-600  rounded-lg p-2 w-fit cursor-pointer'
            }
          >
            Tv Shows
          </h2>
        </Link>
      </div>
    </section>
  );
};

export default Homepage;
