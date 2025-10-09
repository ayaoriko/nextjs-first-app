import { client } from '@/lib/microcms';
import type { Post } from '@/types/microcms';
import type { Category } from '@/types/microcms';
import { ROUTES, BLOG_LIMIT } from "@/lib/microcms";

// microCMSからブログ記事一覧を取得
// 引数：page（必須）、limitで記事の件数指定
// 戻り値：Post[]とtotalCount
export async function getBlogPostListByPage(
  page: number,
  limit: number = BLOG_LIMIT
): Promise<{ posts: Post[]; totalCount: number }> {
  const offset = (page - 1) * limit;
  const data = await client.get({
    endpoint: ROUTES.blog,
    queries: {
      limit,
      offset,
      fields: 'id,title,category',
    },
  });
  // microCMS SDK の戻り値に totalCount を含められるか確認
  const totalCount = data.totalCount || 0;
  return { posts: data.contents, totalCount };
}

// microCMSからブログ記事単体を取得する
// 引数：ID（必須）
// 戻り値：Post
export async function getBlogPost(id: string): Promise<Post> {
  if (!id) {
    throw new Error('getBlogPost: 引数 id は必須です');
  }
  const data = await client.get({
    endpoint: `${ROUTES.blog}/${id}`, // 特定記事
  });
  return data || [];
}

// microCMSからカテゴリー項目一覧を取得する
// 引数：limitで記事の件数指定
// 戻り値：Category[]
export async function getCategoryList(
  limit: number = BLOG_LIMIT,
): Promise<Category[]> {
  const data = await client.get({
    endpoint: ROUTES.category,
    queries: {
      limit,  // 最新の件数を取得
    },
  });
  // API が contents を返さない場合は空配列を返して呼び出し元での例外を防ぐ
  return data.contents || [];
}

// microCMSから指定したカテゴリーの記事一覧を取得する
// 引数：カテゴリーID(必須)、limitで記事の件数指定
// 戻り値：Post[]
export async function getCategoryPostListByPage(
  categoryID: string,
  page: number,
  limit: number = BLOG_LIMIT,
): Promise<{ posts: Post[]; totalCount: number }> {
  if (!categoryID) {
    throw new Error('getCategoryPostList: 引数 categoryID は必須です');
  }
  const offset = (page - 1) * limit;
  const data = await client.get({
    endpoint: ROUTES.blog,
    queries: {
      filters: `category[equals]${categoryID}`,
      limit,
      offset,
    },
  });
  const totalCount = data.totalCount || 0;
  return { posts: data.contents, totalCount };
}