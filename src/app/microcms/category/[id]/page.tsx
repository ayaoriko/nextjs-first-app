// src/app/category/[name]/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCategoryPostListByPage } from '@/controllers/blogController';
import { notFound } from 'next/navigation';
import { BLOG_LIMIT } from "@/lib/microcms";
import BlogPostList from '@/components/microcms/BlogPostList';
import Pagination from '@/components/microcms/Pagination';

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // await して解決

  // 現在のページ番号
  const pageNum = 1;

  // 1ページあたりの記事数
  const limit = BLOG_LIMIT;

  // 記事一覧と総記事数を取得
  const { posts, totalCount } = await getCategoryPostListByPage(id, pageNum);

  // 総ページ数
  const totalPages = Math.ceil(totalCount / limit);

  // 記事が存在しない場合は404
  if (!posts || posts.length === 0) {
    notFound();
  }

  // 別解
  // const categoryName = posts[0]?.category.name
  // if (posts[0]) { posts[0].category.name} else { undefined } を省略したもの。
  const categoryName = posts[0] ? posts[0].category.name : '不明なカテゴリー';

  return (
    <main>
      <h1>カテゴリー: {categoryName}</h1>
      <BlogPostList posts={posts} />
      <Pagination currentPage={pageNum} totalPageCount={totalPages} basePath={`/microcms/category/${id}/page`} />
      <Link href="/microcms/category">Back to Category List</Link>
    </main>
  );

}

// ここから動的メタデータ設定
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params; // await して解決
  const { posts, totalCount } = await getCategoryPostListByPage(id, 1);

  const categoryName = posts[0] ? posts[0].category.name : '不明なカテゴリー';

  return {
    title: `カテゴリー：${categoryName} の記事一覧`,
    description: `${categoryName} カテゴリーに属する記事一覧ページです`,
  };
}