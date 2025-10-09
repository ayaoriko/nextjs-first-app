// components/Pagination.tsx
import Link from 'next/link';

type Props = {
    currentPage: number;
    totalPageCount: number;
    basePath: string; // 例 "/microcms"
};

export default function Pagination({ currentPage, totalPageCount, basePath }: Props) {
    return (
        <nav>
            {currentPage > 1 && (
                <Link href={`${basePath}/${currentPage - 1}`}>前のページ</Link>
            )}
            <span>Page {currentPage} / {totalPageCount}</span>
            {currentPage < totalPageCount && (
                <Link href={`${basePath}/${currentPage + 1}`}>次のページ</Link>
            )}
        </nav>
    );
}