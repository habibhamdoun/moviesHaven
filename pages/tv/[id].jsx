import React from "react";
import { useRouter } from "next/router";
import { baseUrl } from "../../Constants";
import Link from "next/link";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

const Tv = () => {
  const [tv, setTv] = React.useState(undefined);
  const [similar, setSimilar] = React.useState([]);
  const [seasons, setSeasons] = React.useState([]);
  const [id, setId] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  React.useEffect(() => {
    setId(router.query?.id);
  }, [router]);
  React.useEffect(() => {
    if (!id) return;
    const fetchTv = async () => {
      try {
        const resp = await fetch(
          `${baseUrl}/tv/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const returnTv = await resp.json();
        setTv(returnTv);
        // console.log(returnTv);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchTv();
  }, [id]);
  // console.log(tv);
  React.useEffect(() => {
    if (!id) return;
    const fetchSimilar = async () => {
      const resp = await fetch(
        `${baseUrl}/tv/${id}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const returnSimilar = await resp.json();
      setSimilar(returnSimilar.results);
    };
    fetchSimilar();
  }, [id]);
  React.useEffect(() => {
    if (!id) return;
    for (let i = 0; i < tv?.seasons.length; i++) {
      const fetchSeasons = async () => {
        const resp = await fetch(
          `${baseUrl}/tv/${id}/season/${i}/?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const returnSeasons = await resp.json();
        setSeasons((prevState) => {
          return [...prevState, returnSeasons];
        });
      };
      fetchSeasons();
    }
  }, [id]);
  console.log(seasons);
  console.log(tv?.seasons);
  if (loading) return <div>Loading...</div>;
  if (!loading && !tv?.original_name) return <div> NO DATA FOUND</div>;
  return (
    <section className="flex flex-col items-center justify-center py-10 gap-6">
      <div
        //  className="flex items-center justify-center gap-3"
        className="grid grid-cols-5 gap-4"
      >
        <img
          className="col-span-3"
          src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
        />
        <div className="flex flex-col gap-5 col-span-2">
          <h2 className="text-5xl font-bold">{tv.original_name}</h2>
          {tv.tagline && <p className="font-semibold italic">"{tv.tagline}"</p>}
          <p className="w-[35vw]">{tv.overview}</p>
          <p>first aired in : {tv.first_air_date}.</p>
          <p>seasons: {tv.number_of_seasons}</p>
          <p>total episodes: {tv.number_of_episodes}</p>
          {tv.homepage && (
            <a
              target="_blank"
              href={tv?.homepage}
              className="border-yellow-600 border-[2px] rounded-lg p-2 w-fit"
            >
              Movie Homepage
            </a>
          )}
        </div>
        <section className="w-[100vw] grid grid-cols-4 gap-9">
          {tv?.seasons.map((season) => {
            return (
              <Link href={`seasons/${season.id}`}>
                <div
                  className={
                    season.name == "Specials"
                      ? "cursor-pointer overflow-hidden order-last"
                      : "cursor-pointer overflow-hidden"
                  }
                >
                  <h3>{season.name}</h3>
                  <div className="overflow-hidden">
                    <div className="overflow-hidden">
                      <img
                        className="w-[20vw] aspect-auto  hover:scale-110 duration-500"
                        src={`https://image.tmdb.org/t/p/w1280${season.poster_path}`}
                      />
                    </div>
                    {season.overview && (
                      <p className="w-[20vw]">"{season.overview}"</p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </div>
      <div className="flex flex-wrap gap-5 ">
        <h2 className="text-5xl">You may also like:</h2>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {similar?.length > 0 &&
            similar.map((res) => (
              <Link href={`/movie/${res.id}`}>
                <motion.div
                  className="flex flex-col items-center justify-center w-72 rounded gap-5 h-fit overflow-hidden relative"
                  initial={{ scale: 0.1 }}
                  animate={{ scale: 1 }}
                  key={res.id}
                >
                  <div className="overflow-hidden cursor-pointer aspect-square rounded-full">
                    <img
                      className="w-100% hover:scale-110 duration-500"
                      src={`https://image.tmdb.org/t/p/w500${res.poster_path}`}
                    />
                  </div>
                  <h2 className="text-2xl font-bold"> {res.original_name} </h2>
                </motion.div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Tv;
