import Link from "next/link";
import { notFound, redirect } from 'next/navigation';
import { getBlogPostListByPage } from "@/controllers/blogController";
import BlogPostList from "@/components/microcms/BlogPostList";
import Pagination from "@/components/microcms/Pagination";
import { BLOG_LIMIT } from "@/lib/microcms";
import type { Metadata } from 'next';

// params を必ずオプション付きで型定義する
export default async function BlogListByPage({
    params,
}: {
    params: Promise<{ page?: string }>;
}) {

    // params とはページやレイアウトの 動的ルート にアクセスしたときに、URL のパラメータを渡してくれるオブジェクト
    // 例えば、URLが /microcms/page/2 なら params は { page: '2' } となる

    const { page } = await params;

    // 現在のページ番号
    const pageNum = page ? parseInt(page, 10) : 1;

    // エラーチェック
    if (isNaN(pageNum) || pageNum < 1) {
        notFound();
    }

    // ページ番号が1ならトップへリダイレクト
    if (pageNum == 1) {
        redirect('/microcms');
    }

    const { posts, totalCount } = await getBlogPostListByPage(pageNum, BLOG_LIMIT);
    const totalPages = Math.ceil(totalCount / BLOG_LIMIT);

    return (
        <main>
            <h1>ブログ記事一覧（ページ {pageNum}）</h1>
            <BlogPostList posts={posts} />
            <Pagination currentPage={pageNum} totalPageCount={totalPages} basePath="/microcms/page" />
            <Link href="/microcms">Back to MicroCMS</Link>
        </main>
    );
}

// ここから動的メタデータ設定
export async function generateMetadata({ params }: {
    params: Promise<{ page?: string }>;
}): Promise<Metadata> {
    const { page } = await params;
    const pageNum = page ? parseInt(page, 10) : 1;

    const { posts, totalCount } = await getBlogPostListByPage(pageNum, BLOG_LIMIT);

    return {
        title: `ブログ記事一覧（ページ ${pageNum}）`,
        description: `ブログ記事一覧ページです。全 ${totalCount} 件中のページ ${pageNum}`,
    };
}