import { Metadata } from "next";
import Link from "next/link";
import BlogPostList from "@/components/microcms/BlogPostList";
import Pagination from "@/components/microcms/Pagination";
import { fetchPageData } from "@/lib/fetchPageData";
import { createMetadata } from "@/lib/createMetadata";

// params を必ずオプション付きで型定義する
export default async function BlogListByPage({
    params,
}: {
    // App Router may provide params as a Promise — await before use
    params: Promise<{ page?: string[] }>
}) {
    const resolvedParams = await params;
    const { pageNum, posts, totalPages } = await fetchPageData(resolvedParams);

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
export async function generateMetadata({ params }: { params: { page?: string[] } }): Promise<Metadata> {

    const resolvedParams = params;
    const { pageNum, posts, totalPages } = await fetchPageData(resolvedParams);
    const path = pageNum && totalPages > 1 ? `/microcms/page/${pageNum}` : '/microcms';
    let title = `ブログ記事一覧`
    let description = `ブログ記事一覧ページです`

    if (pageNum !== 1) {
        title = `${pageNum} / ${totalPages}  件表示 ：ブログ記事一覧ページ`
        description = `ブログ記事一覧ページです。`
    }

    return createMetadata({
        title,
        description,
        path,
    });
}