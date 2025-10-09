// lib/createMetadata.ts
import { Metadata } from "next";

export function createMetadata({
    title,
    description,
    path = '',       // ここにページ固有のパスを渡す
    image,
}: {
    title: string;
    description: string;
    path?: string;   // 例: "/microcms/page/2"
    image?: string;
}): Metadata {
    // url が指定されていなければ自動生成
    // generateMetadata はサーバーサイドで実行されるため、ブラウザの window.location.href は使えないことが多い
    const baseUrl = 'https://example.com'; // サイトのベースURL
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${baseUrl}${path}`,
            images: image ? [image] : ["/og-image.png"], // createMetadataとlayout.tsxのmetadataの両方で指定する必要がある。
            type: "website",
        },
    };
}
