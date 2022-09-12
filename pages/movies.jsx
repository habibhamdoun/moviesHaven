import React from 'react';
import LayoutMovie from '../components/LayoutMovie';
import { baseUrl } from '../Constants';

const movies = ({ data, maxPages }) => {
  // return <LayoutMovie data={data} maxPages={maxPages} />;
  return <LayoutMovie />;
};

export default movies;
// export const getServerSideProps = async ({ query }) => {
//   let data = [];
//   let maxPages = [];
//   try {
//     const resp = await fetch(
//       `${baseUrl}/movie/${query?.genre || 'now_playing'}?api_key=${
//         process.env.NEXT_PUBLIC_API_KEY
//       }&page=${query?.page || 1}`,
//     );
//     const returnData = await resp.json();
//     data = returnData.results;
//     maxPages = returnData.total_pages;
//     // console.log(returnData);
//     // console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
//   return {
//     props: {
//       data: data || null,
//       maxPages: maxPages || null,
//     },
//   };
// };
