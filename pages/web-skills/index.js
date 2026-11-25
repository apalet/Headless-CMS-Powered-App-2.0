
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import { getSortedWebSkillsData } from '../../lib/webSkills';

export async function getStaticProps() {
  const allWebSkillsData = await getSortedWebSkillsData();

  return {
    props: {
      allWebSkillsData,
    },
  };
}

export default function WebSkills({ allWebSkillsData }) {
  return (
    <Layout>
      <Head>
        <title>Web Skills</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.headingXl}>
          Web Skills
        </h1>

        <p>
          Explore the programming languages, frameworks,
          databases, and development tools I use to build
          modern web applications.
        </p>

        <ul className={utilStyles.skillGrid}>
          {allWebSkillsData.map(({ id, name, category }) => (
            <li className={utilStyles.skillCard} key={id}>
              <Link
                href={`/web-skills/${id}`}
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
