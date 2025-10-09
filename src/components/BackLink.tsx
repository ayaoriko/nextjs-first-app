'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// 404ページなどで使う「元のページに戻る」リンクコンポーネント
export default function BackLink() {
    const pathname = usePathname();

    let backLink = '/';
    let backText = 'HOME';
    if (pathname.startsWith('/blog/')) {
        backLink = '/blog/';
        backText = 'Blog';
    } else if (pathname.startsWith('/microcms/')) {
        backLink = '/microcms/';
        backText = 'MicroCMS';
    }

    return <Link href={backLink}> Back to {backText} </Link>;
}