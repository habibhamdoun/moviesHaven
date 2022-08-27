import React from "react";
import Link from "next/link";
import { baseUrl } from "../Constants";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useRouter } from "next/router";

const LayoutMovie = () => {
  const [data, setData] = React.useState([]);
  const [genre, setGenre] = React.useState("latest");
  const [maxPages, setMaxPages] = React.useState(0);
  const router = useRouter();
  React.useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        `${baseUrl}/movie/now_playing?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&page=${router.query?.page || 1}`
      );
      const returnData = await resp.json();
      setData(returnData.results);
      setMaxPages(returnData.total_pages);
      console.log(returnData);
      console.log(resp);
    };
    fetchData();
  }, [router]);
  console.log(data);
  if (!data) {
    return <div className="text-5xl">no data found</div>;
  }
  return (
    <motion.section
      className="flex flex-col items-center"
      transition={{ duration: 100 }}
    >
      <div className="flex justify-between p-5">
        <p>
          Welcome to <span className="text-2xl">Movies2U</span>
        </p>
      </div>
      <div
        // className="flex  justify-center items-center flex-wrap gap-6"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
      >
        {data.map((res) => (
          <Link href={`/movie/${res.id}`}>
            <motion.div
              className="flex flex-col items-center justify-center h-fit overflow-hidden relative"
              initial={{ scale: 0.1 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              key={res.id}
            >
              <div className="overflow-hidden cursor-pointer">
                <img
                  className="w-100% hover:scale-110 duration-500"
                  src={`https://image.tmdb.org/t/p/original${res.poster_path}`}
                />
              </div>
              <h2 className="text-2xl font-bold"> {res.original_title} </h2>
            </motion.div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center gap-5 py-6">
        <button
          onClick={() => {
            router.push(
              router.basePath + `?page=${parseInt(router.query.page) - 1}`
            );
          }}
          className="border-yellow-600 border-[2px] rounded-lg p-2 disabled:opacity-50"
          disabled={!router.query.page || router.query.page == 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            router.push(
              router.basePath + `?page=${parseInt(router.query?.page || 1) + 1}`
            );
          }}
          className="border-yellow-600 border-[2px] rounded-lg p-2 disabled:opacity-50"
          disabled={parseInt(router.query.page) === maxPages}
        >
          Next Page
        </button>
      </div>
    </motion.section>
  );
};

export default LayoutMovie;
