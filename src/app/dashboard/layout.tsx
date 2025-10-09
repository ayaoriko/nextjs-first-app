import SideNav from '@/components/dashboard/sideNav';

// /dashboard 用レイアウト
// DashboardLayout という名前は変更してもOK
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
      <SideNav />
      {/* ページコンテンツ */}
      <main style={{ padding: '1rem' }}>{children}</main>
    </div>
  )
}