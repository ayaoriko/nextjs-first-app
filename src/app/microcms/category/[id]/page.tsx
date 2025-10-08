// src/app/category/[name]/page.tsx
import { client } from '@/lib/microcms';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = {
  id: string;
  title: string;
  category: { name: string };
};

async function getPostsByCategoryById(id: string): Promise<Props[]> {
  const data = await client.get({
    endpoint: 'blog',
    queries: { filters: `category[equals]${id}` },
  });
  return data.contents;
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const { id } = await params; // await して解決
  const posts = await getPostsByCategoryById(id); 

  return (
    <main>
      <h1>カテゴリー: {posts[0]?.category.name || name}</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/microcms/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <Link href="/microcms/category">Back to Category List</Link>
    </main>
  );
}

// ここから動的メタデータ設定
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params; // await して解決
  const posts = await getPostsByCategoryById(id); 
  
  const categoryName = posts[0]?.category.name || name;

  return {
    title: `カテゴリー：${categoryName} の記事一覧`,
    description: `${categoryName} カテゴリーに属する記事一覧ページです`,
  };
}