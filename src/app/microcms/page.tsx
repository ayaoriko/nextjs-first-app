// ブログ記事一覧ページ（ページネーション対応）
import Link from "next/link";
import type { Metadata } from 'next';
import BlogPostList from '@/components/microcms/BlogPostList';
import Pagination from '@/components/microcms/Pagination';
import { getBlogPostListByPage } from '@/controllers/blogController';
import { notFound } from 'next/navigation';
import { BLOG_LIMIT } from "@/lib/microcms";

export default async function Page() {
    // 現在のページ番号
    const pageNum = 1;

    // 1ページあたりの記事数
    const limit = BLOG_LIMIT;

    // 記事一覧と総記事数を取得
    const { posts, totalCount } = await getBlogPostListByPage(pageNum, limit);

    // 記事が存在しない場合は404
    if (!posts || posts.length === 0) {
        notFound();
    }

    // 総ページ数
    const totalPages = Math.ceil(totalCount / limit);

    return (
        <main>
            <h1>ブログ記事一覧</h1>
            <BlogPostList posts={posts} />
            <Pagination currentPage={pageNum} totalPageCount={totalPages} basePath="/microcms/page" />
            <Link href="/">Back to Top</Link>
        </main>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `MicroCMS記事一覧`,
        description: `MicroCMS記事一覧ページです`,
    };
}