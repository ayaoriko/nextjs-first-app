import Link from 'next/link';
import { getCategoryList } from '@/controllers/blogController';
import type { Category } from '@/types/microcms';

export default async function BlogCategoryList() {
    const categories = await getCategoryList(99);
    if (!categories || categories.length === 0) {
        return <p>カテゴリーが見つかりません。</p>;
    }
    return (
        <ul>
            {categories.map((cat: Category) => (
                <li key={cat.id}>
                    <Link href={`/microcms/category/${cat.id}`}>{cat.name}</Link>
                </li>
            ))}
        </ul>
    );
}
