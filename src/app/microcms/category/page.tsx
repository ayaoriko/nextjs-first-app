// src/app/microcms/category/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import BlogCategoryList from '@/components/microcms/BlogCategoryList';
import { createMetadata } from "@/lib/createMetadata";
import Breadcrumb from '@/components/microcms/Breadcrumb';

export default async function CategoryListPage() {
  const breadcrumbItems = [
    { label: 'ホーム', href: '/' },
    { label: 'ブログ', href: '/microcms' },
    { label: 'カテゴリー' },
  ];
  return (
    <main>
      <Breadcrumb items={breadcrumbItems} />
      <h1>カテゴリ一覧</h1>
      <BlogCategoryList />
      <Link href="/microcms">Back to MicroCMS</Link>
    </main>
  );
}

// ここから動的メタデータ設定
export async function generateMetadata(): Promise<Metadata> {
  const path = `/microcms/category`;

  const title = `カテゴリーの記事一覧`;
  const description = `カテゴリー一覧ページです`;

  return createMetadata({
    title,
    description,
    path,
  });
}