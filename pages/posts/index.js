
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import { getSortedPostsData } from '../../lib/posts';
import Date from '../../components/date';

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Projects({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>My Projects</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.headingXl}>
          My Projects
        </h1>

        <p>
          Explore my web development projects, experiments,
          and applications.
        </p>

        <ul className={utilStyles.skillGrid}>
          {allPostsData.map(({ id, name, date }) => (
            <li className={utilStyles.skillCard} key={id}>
              <Link
                href={`/posts/${id}`}
                className={utilStyles.skillLink}
              >
                {name.replace(/&amp;/g, '&')}
              </Link>

              <span className={`${utilStyles.lightText} ${utilStyles.codeText}`}>
                <Date dateString={date} />
              </span>
            </li>
          ))}
        </ul>

      </section>
    </Layout>
  );
}
