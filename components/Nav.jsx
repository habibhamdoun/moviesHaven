import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Nav = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.screen.width < 768) {
      setIsMobile(true);
    }
  }, []);
  return (
    <nav className='flex justify-between p-5 w-[90vw]'>
      <Link href={'/'}>
        <div className='cursor-pointer flex items-center font-bold'>
          {/* <p>
            Welcome to{' '}
            <span className='text-lg font-bold'>
              Movies
              <span className='text-yellow-600 text-lg'>Haven</span>
            </span>
          </p> */}
          {isMobile ? '' : <p>Mo</p>}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={isMobile ? '32' : '40'}
            height={isMobile ? '32' : '40'}
            viewBox='0 0 48 48'
          >
            <rect
              x='2'
              y='2'
              width='44'
              height='44'
              rx='4'
              fill='rgb(202, 138, 4)'
            />
            <circle cx='24' cy='24' r='18' fill='#000000' />
            <circle cx='24' cy='24' r='7' fill='rgb(202, 138, 4)' />
            <path d='M19.5 14.5v19l11-9.5z' fill='#000000' />
          </svg>
          {isMobile ? (
            ''
          ) : (
            <>
              <p>
                vi<span className='text-yellow-600'>e</span>s
              </p>
              <p className='px-3'>
                Hav<span className='text-yellow-600'>e</span>n
              </p>
            </>
          )}
        </div>
      </Link>
      <div className='flex gap-7 items-center justify-center font-semibold text-lg '>
        <Link href='/movies'>
          <button
            className={
              router.asPath == '/movies'
                ? 'text-yellow-600 max-[600px]:text-base hover:text-yellow-600 transition-all'
                : 'max-[600px]:text-base hover:text-yellow-600 transition-all'
            }
          >
            {!isMobile ? (
              'Movies'
            ) : (
              <>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                  className={
                    router.asPath != '/movies'
                      ? 'w-5 h-5 fill-white hover:fill-yellow-600 transition-all'
                      : 'w-5 h-5 fill-yellow-600 hover:fill-white transition-all'
                  }
                >
                  <path d='M448 32H361.9l-1 1-127 127h92.1l1-1L453.8 32.3c-1.9-.2-3.8-.3-5.8-.3zm64 128V96c0-15.1-5.3-29.1-14-40l-104 104H512zM294.1 32H201.9l-1 1L73.9 160h92.1l1-1 127-127zM64 32C28.7 32 0 60.7 0 96v64H6.1l1-1 127-127H64zM512 192H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192z' />
                </svg>
              </>
            )}
          </button>
        </Link>
        <Link href='/tv'>
          <button className='hover:text-yellow-600 duration-150 max-[600px]:text-base'>
            {isMobile ? (
              <svg
                fill='#000000'
                width='800px'
                height='800px'
                viewBox='0 0 32 32'
                version='1.1'
                className={
                  router.asPath == '/tv'
                    ? 'w-6 h-6 fill-yellow-600 hover:fill-white transition-all'
                    : 'w-6 h-6 fill-white hover:fill-yellow-600 transition-all'
                }
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>tv</title>
                <path d='M28.015 28.944h-2.049v1.056h-3.043v-1.056h-13.908v1.056h-3.043l0.001-1.056h-1.988c-1.098 0-1.987-0.89-1.987-1.987v-18.937c0-1.097 0.89-1.987 1.987-1.987h6.954c0 0 0.438-0.608 1.239-1.162l-2.553-2.554 0.703-0.702 2.755 2.754c0.524-0.225 1.131-0.385 1.83-0.385 0.743 0 1.373 0.183 1.91 0.43l2.799-2.799 0.702 0.702-2.614 2.615c0.729 0.537 1.115 1.102 1.115 1.102h9.189c1.098 0 1.987 0.89 1.987 1.987v18.937c0.001 1.097-0.889 1.986-1.986 1.986zM20.937 10.007c0-0.549-0.445-0.993-0.994-0.993h-13.908c-0.549 0-0.994 0.444-0.994 0.993v14.964c0 0.549 0.445 0.993 0.994 0.993h13.907c0.549 0 0.994-0.444 0.994-0.993v-14.964zM24.042 25.964h2.917v-0.993h-2.917v0.993zM24.042 23.977h2.917v-0.992h-2.917v0.992zM24.042 21.928h2.917v-0.993h-2.917v0.993zM24.042 19.941h2.917v-0.994h-2.917v0.994zM25.431 9.038c-0.822 0-1.49 0.667-1.49 1.49s0.668 1.49 1.49 1.49c0.823 0 1.49-0.667 1.49-1.49s-0.667-1.49-1.49-1.49zM25.431 13c-0.822 0-1.49 0.666-1.49 1.489s0.668 1.49 1.49 1.49c0.823 0 1.49-0.667 1.49-1.49s-0.667-1.489-1.49-1.489z'></path>
              </svg>
            ) : (
              <>
                <span
                  className={router.asPath == '/tv' ? 'text-yellow-600' : ''}
                >
                  Tv Sh
                </span>
                <span
                  className={
                    router.asPath == '/tv'
                      ? 'text-yellow-600 max-[600px]:text-base'
                      : 'max-[600px]:text-base'
                  }
                >
                  o
                </span>
                ws
              </>
            )}
          </button>
        </Link>
        <a
          className='p-0 hover:text-yellow-600 duration-150 '
          href='https://www.themoviedb.org/documentation/api'
        >
          A<span className='text-yellow-600'>p</span>i
        </a>
        <a
          href='https://github.com/habibhamdoun/movies2u'
          target='_blank'
          rel='noreferrer'
          className={
            isMobile
              ? 'w-6 h-6 fill-yellow-600 hover:fill-white duration-150'
              : 'w-7 h-7 fill-yellow-600 hover:fill-white duration-150'
          }
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 496 512'>
            <path d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z' />
          </svg>
        </a>
        <a
          href='https://www.linkedin.com/in/habibhamdoun/'
          target='_blank'
          rel='noreferrer'
          className={
            isMobile
              ? 'w-6 h-6 fill-yellow-600 hover:fill-white duration-150'
              : 'w-7 h-7 fill-yellow-600 hover:fill-white duration-150'
          }
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
            <path d='M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z' />
          </svg>
        </a>
      </div>
    </nav>
  );
};

export default Nav;
