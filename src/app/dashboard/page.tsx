// await getPosts() が使えるようにするには、await を使うときは 必ず関数を async にする 必要がある
// もし async をつけないと、await が使えずエラーになる
export default async function Page() {
  // loading.tsxの確認のため、Loading画面用に1秒待つ
  await new Promise(resolve => setTimeout(resolve, 1000));

  return (
    <>
      <h1>DashBoardコンテンツ</h1>
      <a href="/">Back to Home</a>
    </>
  )
}