import Link from 'next/link';
import type { Post } from '@/types/microcms';
import { ROUTES } from "@/lib/microcms";

export default function BlogPostList({ posts }: { posts: Post[] }) {
    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <Link href={`${ROUTES.categoryPath}/${post.category.id}`}>
                        {post.category.name}
                    </Link>
                    <span style={{ margin: '0 0.5em' }}></span>
                    <Link href={`${ROUTES.basePath}/${post.id}`}>{post.title}</Link>
                </li>
            ))}
        </ul>
    );
}
