// src/lib/fetchCategoryPageData.ts
import { notFound, redirect } from "next/navigation";
import { getBlogPostListByPage } from "@/controllers/blogController";
import { BLOG_LIMIT, ROUTES } from "@/lib/microcms";

export async function fetchPageData(params: { page?: string[] }) {

  // params.page は配列か undefined
  const pageArray = params.page;

  // page 配列の解析
  let pageNum = 1;
  if (pageArray && pageArray.length === 2 && pageArray[0] === "page") {
    pageNum = parseInt(pageArray[1], 10);
  }

  // 記事取得
  const { posts, totalCount } = await getBlogPostListByPage(pageNum, BLOG_LIMIT);

  // 総ページ数
  const totalPages = Math.ceil(totalCount / BLOG_LIMIT);

  // 記事が存在しない場合は404
  if (!posts || posts.length === 0) {
    notFound();
  }

  // 1ページ目ならトップへリダイレクト（page がある場合のみ）
  if (pageNum === 1 && pageArray && pageArray.length > 0) {
    redirect(`${ROUTES.basePath}/`);
  }

  return {
    pageNum,
    posts,
    totalPages,
  };
}