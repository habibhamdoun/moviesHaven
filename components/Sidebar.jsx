import React from 'react';
import MenuIcon from '../assets/bars-solid.svg';
import Xicon from '../assets/x-solid.svg';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Sidebar = () => {
  const [open, setOpen] = React.useState(false);
  function toggleSide() {
    setOpen((prevState) => {
      return !prevState;
    });
  }

  return (
    <>
      <AnimatePresence>
        {!open ? (
          <motion.div
            className='border-r-2 border-[gray] w-fit h-[300vh] flex  justify-center'
            initial={{ width: 0 }}
            animate={{ width: 'fit-content' }}
          >
            <span onClick={toggleSide} className='fill-white p-5 m-0'>
              <MenuIcon width='50px' />
            </span>
          </motion.div>
        ) : (
          <motion.div
            className='border-r-2 border-[gray] w-[10vw] h-[300vh] flex  justify-between font-bold'
            initial={{ width: 0 }}
            animate={{ width: '10vw' }}
          >
            <div className='flex flex-col items-start gap-4 mt-4 text-2xl'>
              <Link href='/movies'>
                <button>Movies</button>
              </Link>
              <Link href='/tv'>
                <button>Tv Shows</button>
              </Link>
            </div>
            <div onClick={toggleSide} className='fill-white p-1'>
              <Xicon width='20px' />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
