// /dashboard 用レイアウト
// ここでは HTML ルート要素は書かない
// <div> や <main> でラップして <header> やコンテンツを置く
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {/* 共通ヘッダー */}
      <header style={{ background: '#eee', padding: '1rem' }}>
        Dashboard Header
      </header>

      {/* ページコンテンツ */}
      <main style={{ padding: '1rem' }}>{children}</main>
    </div>
  )
}