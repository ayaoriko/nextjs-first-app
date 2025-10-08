// src/app/microcms/category/page.tsx
import { client } from '@/lib/microcms';
import Link from 'next/link';
import type { Metadata } from 'next';

export default async function CategoryListPage() {
  const data = await client.get({ endpoint: 'categories' }); // microCMSのカテゴリ取得
  const categories = data.contents;

  return (
    <main>
      <h1>カテゴリ一覧</h1>
      <ul>
        {categories.map((cat: { id: string; name: string }) => (
          <li key={cat.id}>
            <Link href={`/microcms/category/${cat.id}`}>{cat.name}</Link>
          </li>
        ))}
      </ul>
      <Link href="/microcms">Back to MicroCMS</Link>
    </main>
  );
}

// ここから動的メタデータ設定
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `カテゴリーの記事一覧`,
    description: `カテゴリー一覧ページです`,
  };
}