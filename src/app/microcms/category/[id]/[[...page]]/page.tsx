// app/microcms/category/[id]/[[...page]]/page.tsx
import { fetchCategoryPageData } from "@/lib/fetchCategoryPageData";
import { Metadata } from "next";
import BlogPostList from '@/components/microcms/BlogPostList';
import Pagination from '@/components/microcms/Pagination';
import Link from 'next/link';
import { createMetadata } from "@/lib/createMetadata";
import Breadcrumb from '@/components/microcms/Breadcrumb';

export default async function CategoryPagedPage({ params }: { params: Promise<{ id: string; page?: string[] }> }) {
  const resolvedParams = await params;

  const { id, pageNum, posts, totalPages } = await fetchCategoryPageData(resolvedParams);

  const categoryName = posts[0] ? posts[0].category.name : '不明なカテゴリー';
  const breadcrumbItems = [
    { label: 'ホーム', href: '/' },
    { label: 'ブログ', href: '/microcms' },
    ...(pageNum > 1 ? [{ label: categoryName, href: `/microcms/category/${id}` }] : [{ label: categoryName }]),
    // ... は配列やオブジェクトを展開する
    // pushでもOKだけど、宣言と同時に作れるJSX などで「宣言と同時にマップ処理」したい場合に便利
    ...(pageNum > 1 ? [{ label: `ページ ${pageNum}` }] : []),
  ];

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} />
      <h1>カテゴリー: {categoryName}</h1>
      <BlogPostList posts={posts} />
      <Pagination currentPage={pageNum} totalPageCount={totalPages} basePath={`/microcms/category/${id}/page`} />
      <Link href="/microcms/category">Back to Category List</Link>
    </main>
  );

}

// ここから動的メタデータ設定
export async function generateMetadata({ params }: { params: { page?: string[] } }): Promise<Metadata> {
  const resolvedParams = await params;
  const { id, pageNum, posts, totalPages } = await fetchCategoryPageData(resolvedParams);
  const categoryName = posts[0] ? posts[0].category.name : '不明なカテゴリー';
  let title = `${categoryName}記事一覧`;
  let description = `${categoryName}記事一覧ページです`;

  const path = pageNum && totalPages > 1 ? `/microcms/category/${posts[0].category.id}/page/${pageNum}` : `/microcms/category/${posts[0].category.id}/`;


  if (pageNum !== 1) {
    title = `${pageNum} / ${totalPages}  件表示 ：${categoryName}記事一覧ページ`;
    description = `${categoryName}記事一覧ページです。`;
  }
  return createMetadata({
    title,
    description,
    path,
  });
}