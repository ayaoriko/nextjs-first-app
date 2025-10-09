// UIフォルダは再利用可能コンポーネント専用
/* ui/post.tsx （一覧表示用コンポーネント） */

import Link from 'next/link'
import { PostType } from '@/lib/posts'

export function Post({ post }: { post: PostType }) {
  return <li><Link href={`/blog/${post.id}`}>{post.title}</Link></li>
}