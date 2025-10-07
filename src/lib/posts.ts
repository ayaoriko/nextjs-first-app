// libフォルダはデータ設定用

// Node.js の ファイル操作用モジュール を読み込む
//fs は File System の略
// 'fs/promises' を使うと Promise ベースの非同期 API が使える
import fs from 'fs/promises'
// ファイルやディレクトリの パスを扱うモジュール
// OS によるパス区切りの違い（/ vs \）を吸収してくれる
import path from 'path'
// PostType は 投稿オブジェクトの型（形）を定義 している
// この型を使うことで、関数の返り値や変数が 期待通りの構造かコンパイル時にチェック できる
// 小規模な場合は 同じファイルに書いてOK
// 別ファイルにするときは「import { PostType } from './posts-types'」を指定する
export type PostType = {
  id: string
  title: string
  content: string
}

// async function は 非同期関数（await が使える）
// 非同期関数は 必ず Promise を返す という特徴があります
// Promise とは？→未来に必ず値が返ってくる約束
// ただし 非同期なので、すぐには値が返らないことがある
// API 呼び出しやファイル読み込みなど、実際の非同期処理をイメージするとわかりやすい
export async function getPosts(): Promise<PostType[]> {
  //「プロジェクトルート + src/lib/posts.json」の 絶対パス を作っている
  // cwd は current working directory（カレント作業ディレクトリ） の略
  // Node.js を起動した プロジェクトのルートフォルダ のパスを返す
  // path.join(...)は複数のパスを OS に合わせて正しく結合 してくれる関数
  // Mac/Linux では /、Windows では \ を自動で使う
  const filePath = path.join(process.cwd(), 'src/lib/posts.json')
  // fs.readFile(filePath, 'utf-8')
  // filePath で指定した JSON ファイルを 非同期で読み込む
  // 'utf-8' を指定することで 文字列として読み込む
  // await をつけているので、読み込みが完了するまで待って、その文字列を json に代入
  const json = await fs.readFile(filePath, 'utf-8')
  // 読み込んだ文字列を JavaScript のオブジェクト（配列）に変換
  const posts: PostType[] = JSON.parse(json)
  return posts
}

/// 返り値 Promise<PostType | undefined>
/// 投稿が見つかれば PostType
// 見つからなければ undefined
export async function getPost(id: string): Promise<PostType | undefined> {
  // await getPosts() にすることで Promise が解決した後の配列 を受け取れる。
  // もし await をつけないと、posts はまだ Promise なので .find は使えずエラーになります
  const posts = await getPosts()
  // posts.find((p) => p.id === id) で ID が一致する投稿を探す
  return posts.find((p) => p.id === id)
}