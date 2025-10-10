// components/Breadcrumb.tsx
'use client';

import Link from 'next/link';
import React from 'react';

type BreadcrumbItem = {
    label: string;
    href?: string; // 最後のページはリンクなし
};

type Props = {
    items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: Props) {
    return (
        <nav aria-label="breadcrumb" className="text-sm text-gray-600">
            <ol className="flex list-none p-0">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={index} className="flex items-center">
                            {item.href && !isLast ? (
                                <>
                                    <Link href={item.href} className="hover:underline">
                                        {item.label}
                                    </Link>
                                    <span className="mx-2">/</span>
                                </>
                            ) : (
                                <span aria-current={isLast ? "page" : undefined} className={isLast ? "font-semibold" : ""}>
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
