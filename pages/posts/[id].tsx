import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { Date } from '../../components/date';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

// Called first
export const getStaticPaths: GetStaticPaths = async () => {
  console.log('getStaticPaths called');
  const paths = getAllPostIds()
  return {
    paths,
    // fallback: false
    fallback: 'blocking'
  }
}

// Called second
export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('getStaticProps', { params });
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    },
    revalidate: 1 // https://nextjs.org/blog/next-9-5
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>
          {postData.title}
        </h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}
