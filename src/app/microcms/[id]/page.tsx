// app/blog/[id]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css'; // 追加
import dayjs from 'dayjs';
import type { Metadata } from 'next';
import { getBlogPost } from '@/controllers/blogController';

// 記事詳細ページの生成
export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // IDを取得
  let post;

  try {
    post = await getBlogPost(id);
  } catch {
    notFound(); // 存在しない場合は 404 ページに遷移
  }

  // dayjsを使ってpublishedAtをYY.MM.DD形式に変換
  const formattedDate = dayjs(post.publishedAt).format('YY.MM.DD');

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{post.title}</h1> {/* タイトルを表示 */}
      <div className={styles.date}>{formattedDate}</div> {/* 日付を表示 */}
      {post.category &&
        <div className={styles.category}>カテゴリー：<Link href={`/microcms/category/${post.category.id}`}>{post.category.name}</Link></div>
      }
      <div className={styles.post} dangerouslySetInnerHTML={{ __html: post.body }} /> {/* 記事本文を表示 */}
      <Link href="/microcms">Back to MicroCMS</Link>
    </main>
  );
}

// ここから動的メタデータ設定
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params; // Next.js 13+ の App Router だと、同期的に params を取得してはいけないため、await して解決
  const post = await getBlogPost(id);

  return {
    title: post.title,
    description: post.body.slice(0, 100),
  };
}