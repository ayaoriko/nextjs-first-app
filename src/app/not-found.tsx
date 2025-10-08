'use client'; // usePathnameを使う場合は必須
import { usePathname } from 'next/navigation';
import Link from 'next/link';
// app/not-found.tsx
export default function NotFound() {
const pathname = usePathname(); // 現在の URL を取得

let backLink = '/';
let backText = 'HOME';
if (pathname.startsWith('/blog')){
    backLink = '/blog/';
    backText = 'Blog';
}
else if (pathname.startsWith('/microcms')){
    backLink = '/microcms/';
    backText = 'MicroCMS';
}

  return (
    <main>
      <h1>404</h1>
      <p>ページが見つかりませんでした</p>
       <Link href={backLink}>Back to {backText}</Link> 
    </main>
  );
}