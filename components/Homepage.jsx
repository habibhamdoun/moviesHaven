import Link from 'next/link';
import React from 'react';

const Homepage = () => {
  return (
    <section className='h-[100vh] flex flex-col items-center justify-center gap-8 homepage '>
      <h1 className='text-6xl font-bold'>What are you looking for?</h1>
      <div className='flex gap-5 '>
        <Link href={`/movies`}>
          <h2 className='text-4xl font-extrabold bg-yellow-600  rounded-lg p-2 w-fit cursor-pointer'>
            Movies
          </h2>
        </Link>
        <Link href={`/tv`}>
          <h2 className='text-4xl font-extrabold bg-yellow-600  rounded-lg p-2 w-fit cursor-pointer'>
            Tv Shows
          </h2>
        </Link>
      </div>
    </section>
  );
};

export default Homepage;
