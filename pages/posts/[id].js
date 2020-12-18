import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'

// Called first
export async function getStaticPaths() {
  console.log('getStaticPaths called');
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

// Called second
export async function getStaticProps({ params }) {
  console.log('getStaticProps', { params });
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}
