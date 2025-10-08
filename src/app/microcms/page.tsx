// app/page.tsx
import Link from 'next/link';
import { client } from '@/lib/microcms';
import styles from './page.module.css';
import type { Metadata } from 'next';

// ブログ記事の型定義
type Props = {
    id: string;
    title: string;
    category: { name: string,id: string };
};

// microCMSからブログ記事を取得
async function getBlogPosts(): Promise<Props[]> {
    const data = await client.get({
        endpoint: 'blog', // 'blog'はmicroCMSのエンドポイント名
        queries: {
            fields: 'id,title,category',  // idとtitleを取得
            limit: 5,  // 最新の5件を取得
        },
    });
    return data.contents;
}

export default async function Home() {
    const posts = await getBlogPosts();

    return (
        <main>
            <h1>ブログ記事一覧</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link href={`/microcms/category/${post.category.id}`}>
                        {post.category.name} {/* タイトルを表示 */}
                        </Link>
                         <span style={{ margin: '0 0.5em' }}></span>
                        <Link href={`/microcms/${post.id}`}> {/* 記事へのリンクを生成 */}
                            {post.title} {/* タイトルを表示 */}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link href="/">Back to Home</Link>
        </main>
    );
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `MicroCMS記事一覧`,
    description: `MicroCMS記事一覧ページです`,
  };
}