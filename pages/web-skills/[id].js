
import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import {
  getAllWebSkillIds,
  getWebSkillData,
} from '../../lib/webSkills';

// Retrieve the data for one specific Web Skill
export async function getStaticProps({ params }) {
  const skillData = await getWebSkillData(params.id);

  return {
    props: {
      skillData,
    },
    revalidate: 60,
  };
}

// Generate a static page for every Web Skill
export async function getStaticPaths() {
  const paths = await getAllWebSkillIds();

  return {
    paths,
    fallback: false,
  };
}

export default function WebSkill({ skillData }) {
  return (
    <Layout>
      <Head>
        <title>{skillData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>
          {skillData.title}
        </h1>

        <h2>Category</h2>
        <p className={utilStyles.codeText}>
          {skillData.category}
        </p>
        <h2>Description</h2>
        <p>{skillData.description}</p>

        <h2>Official Website</h2>
        {skillData.officialUrl && (
          <a
            href={skillData.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Official Website
          </a>
        )}

        <div
          dangerouslySetInnerHTML={{
            __html: skillData.content || '',
          }}
        />
      </article>
    </Layout>
  );
}
