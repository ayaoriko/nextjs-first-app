// layout.tsx で usePathname() を使う場合は、'use client' を先頭に追加しないと動作しません。（デフォルトでは layout.tsx はサーバーコンポーネント扱いだから）
'use client' // ← これも超重要！
// usePathname は Next.jsのクライアントサイドフック（ルーティング情報を取得する関数）
// → next/navigation から import 必須！
import { usePathname } from 'next/navigation'
import React from 'react'

// アプリ全体共通のレイアウト（ヘッダー・フッターなど）
//  <html> / <body> を書けるのは アプリ全体のルートレイアウトだけ
// layout.tsx は 必ず export default function Layout({ children }) の形で書く
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith('/dashboard')
  
  // <html> の直下には <head> と <body> しか置けません
  return (
    <html lang="ja">
      <title>初めてのNextJS</title>
      <body>
          {/* 共通ヘッダー */}
          {!isDashboard && (
        <header style={{ background: '#eee', padding: '1rem' }}>
          共通ヘッダー
        </header>
        )}

        {/* ページごとのコンテンツ */}
        <main>{children}</main>
        
      </body>
    </html>
  )
}