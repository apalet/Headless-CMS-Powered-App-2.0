
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import {
  getSortedDigitalMediaSkillsData,
} from '../../lib/digitalMediaSkills';

export async function getStaticProps() {
  const allDigitalMediaSkillsData =
    await getSortedDigitalMediaSkillsData();

  return {
    props: {
      allDigitalMediaSkillsData,
    },
    revalidate: 60,
  };
}

export default function DigitalMediaSkills({
  allDigitalMediaSkillsData,
}) {
  return (
    <Layout>
      <Head>
        <title>Digital Media Skills</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.headingXl}>
          Digital Media Skills
        </h1>

        <p>
          Explore the digital media tools I use for photo
          editing, vector graphics, audio editing, and video
          production.
        </p>

        <ul className={utilStyles.skillGrid}>
          {allDigitalMediaSkillsData.map(({ id, name, category }) => (
            <li className={utilStyles.skillCard} key={id}>
              <Link
                href={`/digital-media-skills/${id}`}
                className={utilStyles.skillLink}
              >
                {name.replace(/&amp;/g, '&')}
              </Link>

              <span className={`${utilStyles.lightText} ${utilStyles.codeText}`}>
                {category.replace(/&amp;/g, '&')}
              </span>
            </li>
          ))}
        </ul>

      </section>
    </Layout>
  );
}
