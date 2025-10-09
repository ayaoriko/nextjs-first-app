// app/blog/[slug]/page.tsx （個別ページ）
import { getPost } from '@/lib/posts'
import LikeButton from '@/components/like-button';
import Link from 'next/link';

export default async function Page({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return <p>記事が見つかりません</p>

  return (
    <>
      <article>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <LikeButton likes={post.likes} /><br />
      </article>
      <Link href="/blog">Back to Blog</Link>
    </>
  )
}