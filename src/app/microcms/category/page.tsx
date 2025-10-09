// src/app/microcms/category/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import BlogCategoryList from '@/components/microcms/BlogCategoryList';

export default async function CategoryListPage() {
  return (
    <main>
      <h1>カテゴリ一覧</h1>
      <BlogCategoryList />
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