
import utilStyles from '../../styles/utils.module.css';
import Date from '../../components/date';
import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export default function Project({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>
          {postData.title}
        </h1>

        <p>{postData.description}</p>

        <h2>Technologies</h2>
        <p className={utilStyles.codeText}>
          {postData.technologies}
        </p>    

        <h2>Completion Date</h2>
        <div className={`${utilStyles.lightText} ${utilStyles.codeText}`}>
          <Date dateString={postData.completionDate} />
        </div>

        <h2>Project Link</h2>
        {postData.projectUrl && (
          <a
            href={postData.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Project
          </a>
        )}
      </article>
    </Layout>
  );
}
