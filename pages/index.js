import Head from 'next/head';
import Homepage from '../components/Homepage';
export default function Home() {
  return (
    <div>
      <Head>
        <title>MoviesHaven</title>
        <meta
          name='description'
          content='Discover and explore a dynamic movie showcase powered by Next.js and the TMDB API. Experience a constantly updated collection of movies, featuring the latest releases, popular films, and timeless classics. With automatic updates and seamless navigation, this website brings the world of cinema to your fingertips.'
        />
        <link rel='shortcut icon' href='../favicon.ico' />
      </Head>
      <Homepage />
    </div>
  );
}
