// app/blog/[slug]/page.tsx （個別ページ）
import { getPost } from '@/lib/posts'

export default async function Page({ params }: Props) {
  const { slug } = await params 
  const post = await getPost(slug)

  if (!post) return <p>記事が見つかりません</p>

  return (
    <>
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
    <a href="/blog">Back to Blog</a>
    </>
  )
}