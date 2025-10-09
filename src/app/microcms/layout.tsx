// metaタグの初期値
export const metadata = {
    title: "My MicroCMSブログ",
    description: "MicroCMSを使ったブログです",
    openGraph: {
        title: "My MicroCMSブログ",       // og:title
        description: "MicroCMSを使ったブログです", // og:description
        url: "https://example.com/microcms",
        images: ["/og-image.png"],
        type: "website",
    }
};

export default function MicrocmsLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ja">
            <body>{children}</body>
        </html>
    );
}