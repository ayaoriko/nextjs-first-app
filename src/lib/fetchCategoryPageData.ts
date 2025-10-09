// src/lib/fetchCategoryPageData.ts
import { notFound, redirect } from "next/navigation";
import { getCategoryPostListByPage } from "@/controllers/blogController";
import { BLOG_LIMIT, ROUTES } from "@/lib/microcms";

export async function fetchCategoryPageData(params: { id: string; page?: string[] }) {

  const { id, page } = params;

  // page 配列の解析
  // ["page","2"] の場合は pageNum = 2
  let pageNum = 1;
  if (page && page.length === 2 && page[0] === "page") {
    pageNum = parseInt(page[1], 10);
  }

  // 記事取得
  const { posts, totalCount } = await getCategoryPostListByPage(id, pageNum);

  // 総ページ数
  const totalPages = Math.ceil(totalCount / BLOG_LIMIT);

  // 記事が存在しない場合は404
  if (!posts || posts.length === 0) {
    notFound();
  }

  // ページ番号が1ならトップへリダイレクト（page がある場合のみ）
  if (pageNum === 1 && page && page.length > 0) {
    redirect(`${ROUTES.categoryPath}/${id}`);
  }

  return {
    id,
    pageNum,
    posts,
    totalPages,
  };
}