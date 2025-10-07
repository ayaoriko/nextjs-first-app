// app/blog/page.tsx （一覧ページ）
import { getPosts } from '@/lib/posts'
import { Post } from '@/ui/post'
import Link from 'next/link';
export default async function Page() {
  const posts = await getPosts()

  return (
    <>
      <ul>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
      <Link href="/">Back to Home</Link>
    </>
  )
}