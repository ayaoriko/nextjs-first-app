# 初めてのNEXT.js

## 設定した内容
```
% npx create-next-app
✔ What is your project named? … first-nextjs-app
意訳：プロジェクト名は何にするか？
✔ Would you like to use TypeScript? … Yes
意訳：タイプスクリプトを使うか？→Yes
理由：Next.js公式はTypeScriptを前提に設計されているため。
補足：あとから js → ts に変えることもできる
✔ Which linter would you like to use? › ESLint 
理由：BiomeよりもESLint の方が標準的で実績のあるツールであるため。
✔ Would you like to use Tailwind CSS? … Yes
意訳：Tailwind CSSを使うか？… Yes
理由：Next.jsとの相性も良く、CSSと並行して利用することも可能
✔ Would you like your code inside a `src/` directory? …Yes
意訳：src/フォルダを作るか？→Yes
理由：ルートディレクトリがスッキリするし、Next.js公式も推奨に寄っているため。
✔ Would you like to use App Router? (recommended) … Yes
意訳：App Routerにするか？→Yes
理由：pages/ ルーターは旧式。今後の公式チュートリアルやドキュメントは App Router 前提 で書かれているため。
✔ Would you like to use Turbopack? (recommended) … No 
意訳：意訳：Turbopack（開発元が作った新しい超高速ビルドシステム）を使うか？
理由：Noの場合、Webpackが利用される。公式の学習コンテンツやStack Overflow回答の多くがWebpackを前提にしてる。Turbopackはβ版なので、新機能を試したい・高速重視の人におすすめ。
✔ Would you like to customize the import alias (`@/*` by default)? … No
意訳：デフォルトの @/*（相対パス）を自分好みに変更するか？… No 
理由：デフォルトの @/* は ほとんどのチュートリアルや公式ドキュメントと同じ なので、
初学者〜中級者は そのままで全く問題ないため
補足：Next.jsでは、相対パスを `@/components/...` のように書ける。`@` は `tsconfig.json` で設定されている。
```

## プロジェクト制作後について
### Git
npx create-next-app した段階で生成されるプロジェクトフォルダには、ローカルにだけ Git リポジトリ が作られる。
GitHub に反映させるには、ローカルに リモートリポジトリを追加 する必要がある。
```
git remote add origin <リポジトリURL>
```

### ブラウザについて
Reactのように、自動で開く仕様はない。
package.jsonのdevのところを編集するだけで、同じ仕様になる。
package.json```
"scripts": {
  "dev": "next dev & open http://localhost:3000"
}
```
※Windowsではstart http://localhost:3000 を使う

## src/appフォルダ
ユーザーがアプリケーションのルートにアクセスすると、
layout.tsxとpage.tsxの両方がレンダリングされる。

### layout.tsx
ルートレイアウト。必須。 
<html>と<body>タグを含める必要があります。

### app/page.ts
いくつかの初期コンテンツを含むホームページを作成する。

## publicフォルダ
画像やフォントなどの静的アセットを保存できる。
ルートパス（/）を使って参照します。
```
export default function Page() {
  return <Image src="/profile.png" alt="Profile" width={100} height={100} />
}


## TypeScriptをセットアップ
## VS Code でのTypeScript の補完や型チェック機能の設定
Next.js にはカスタム TypeScript プラグインと型チェッカーが含まれており、VSCode やその他のコード エディターで高度な型チェックと自動補完に使用できます。

VS Codeで「TypeScript: ワークスペースバージョンを使用する」を選ぶと、プロジェクトごとの TypeScript バージョンで補完され、Next.js プロジェクト特有の型チェックや警告が正しく表示されます。

1. コマンドパレットを開く ( Ctrl/⌘+ Shift+ P)
2.「TypeScript: TypeScript バージョンを選択」を検索
3. 「ワークスペースバージョンを使用する」を選択する


## 保存時に ESLint を自動でチェックしたい場合：ESLintのセットアップ
ESLintとは、JavaScriptやTypeScriptなどのソースコードを静的に解析し、構文エラーやコーディング規約違反、品質の低い箇所などを検出・警告するツール。

### package.jsonの設定
下記内容に書き換える。
```
{
  "scripts": {
    "lint": "next lint"
  }
}
```

npm run lint を実行すると、エラーや警告が出た箇所がコンソールに表示される。
```
npm run lint
```

### eslint.config.mjsについて。
・最新版の Next.js（特に TypeScript や Tailwind 選択時）はeslint.config.mjs が自動生成される。
・eslint.config.mjs 内の rules に追記することでルールをカスタマイズ可能。
（.eslintrc.json / .eslintrc.js は古い形式で、最近はほとんど生成されない）
・TypeScript / Tailwind を選ぶと自動で eslint.config.mjs が生成されるため、質問はスキップされる。
・もし選ばなかったら、質問画面で「Strict/Base」の選択肢が表示される。（初心者はStrict推奨）


## baseUrlとパスの設定。
tsconfig.json または jsconfig.jsonのbaseUrlとpathsを変更することで、@/* を src/ 以下にマッピングできる。
```
{
  "compilerOptions": {
    （...中略）
    "baseUrl": "src/",
    "paths": {
      "@/*": ["*"],
    }
  },
}
```
これで、@/ を src/ 以下にマッピングされる。
（例：@/components/Button が src/components/Button として認識。）
上記の@/の書き方なら、チュートリアルの@/components/* や @/styles/*の指定は不要。
設定後、VS Code で認識させるには TypeScript サーバーの再起動 または ワークスペースバージョンの再選択 が必要


## フォルダ構成
参考サイト：https://nextjs.org/docs/app/getting-started/project-structure

### importのURLについて
tsconfig.json で baseUrl を src/ にしておけば、簡単にインポートできます。
```
import SideNav from '@/components/dashboard/sideNav';
```

### フォルダ構成
- src/components 配下→ 再利用可能コンポーネント専用。ページやレイアウトから自由にインポートできる。
- src/lib 配下→ データ取得や API 呼び出し用のモジュール を置く場所
- src/app 配下→ ページ・ルート・レイアウト専用。Next.js が自動でルーティングを管理する。
- src/app/[〜] 配下 → 記事詳細ページなどの動的ルート。URL の id に対応する記事を表示。ページコンポーネントの引数 params から params.〜 を取得して記事を取得するため、[id] や [name] など名称はサイトによって異なる。
- src/app/[[~]]配下 → 1 階層以上の URL にマッチ。例: /microcms/page/2 はOK、/microcms/ はNG
- src/app/[[...~]]配下 →URL の末尾が存在しなくてもマッチ。例: /microcms/ と /microcms/page/2 の両方に対応可能
- src/app/(〜) 配下→ルートグループ用フォルダ。ページ構造を整理するためのフォルダで、URL には反映されない。src/app/(dashboard)/page.tsx → /page としてアクセスされる

### ルーティングファイル
- layout.jsx：ページの大枠
- page.jsx：各ページ
- loading.jsx：読み込み中ページ
- not-found.jsx：404専用ページ。存在しないページにアクセスした場合に表示される。
- error.jsx：その他のエラーページ。サーバーエラーや予期せぬ例外時に表示される。

### CSSの名称について
- globals.css → サイト全体に適用されるスタイル。ボディのフォントやリンク色など、全ページ共通の見た目を整える。src/app/layout.tsx 内で import './globals.css' として読み込む必要がある。
- XXX.module.css → コンポーネント単位のローカルスタイル。他のコンポーネントに影響しないスコープ付きCSSで、className={styles.XXX} のように指定して使う。※ ページ単位（例：page.module.css）や UI パーツ単位（例：Button.module.css）で管理するのが一般的。

```
import styles from './Button.module.css';

export default function Button({ children }: { children: React.ReactNode }) {
  return <button className={styles.button}>{children}</button>;
}
```

## ページがうまく開かない時
- package.json に下記内容を追記することで、npm run clean で一括対応可能。
（ビルドキャッシュ削除＋ポート開放をまとめて実行）
```
"scripts": {
    "clean":"rm -rf '.next' && kill -9 $(lsof -ti:3000)"
}
```
※Mac専用コマンド。Windowsの場合は rmdir /s /q .next などに置き換える。

### node.jsのサーバーを止めたい時
基本は 3000 ポートを使うが、バックグラウンドでサーバーが残っているとポート競合が発生し、Next.js が自動で別ポート（3001など）を割り当てることがある。
その場合、開発サーバーを明示的に停止してリセットする。

開発中の Node.js プロセスをまとめて停止する場合：
```
pkill -f node
```
3000番ポートだけ止めたい場合：
```
kill -9 $(lsof -ti:3000)
```

### ビルドがうまくいかない時
Next.js のキャッシュやビルドが壊れた場合、.nextを削除する。
.next を削除すると routes-manifest.json や page.js などの生成ファイルが再作成 される
```
rm -rf ".next"    # ビルドキャッシュ削除
npm run dev       # 開発サーバー再起動
```
- MacとWindowsでコマンドが若干違う。例：Macでは rm -rf、Windowsでは rmdir /s /q や del /s /q を使う。
- フォルダ名に空白がある場合は、エラーの原因になることもあるので注意

## 日付の操作について
日付操作ライブラリdayjsをインストールしておくと楽。
```
npm install dayjs
```
下記のようにすることで、日付を簡単にフォーマットできる。
```
import dayjs from 'dayjs';
const formattedDate = dayjs(post.publishedAt).format('YY.MM.DD');
```

## metaタグの設定方法
generateMetadata を使うと 動的にタイトルや説明文を生成 できる
https://nextjs.org/docs/app/getting-started/metadata-and-og-images

```
import type { Metadata } from 'next';
（...中略...）
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `MicroCMS記事一覧`,
    description: `MicroCMS記事一覧ページです`,
  };
}
```

# microCMSについて
下記ページを参考にして構築。
https://blog.microcms.io/microcms-next15-jamstack-blog/


MicroCMSを利用する場合は、公式で配布されているmicrocms-js-sdkをインストールする必要がある
https://github.com/microcmsio/microcms-js-sdk
```
npm install microcms-js-sdk
```

.env ファイルに microCMS のドメイン・APIキーを設定します：
```
MICROCMS_SERVICE_DOMAIN=あなたのサービスドメイン
MICROCMS_API_KEY=あなたのAPIキー
```

その後、src/lib/microcms.ts（※libs でも OK） に以下を定義します。
```
// libs/microcms.ts
import { createClient } from 'microcms-js-sdk';

// 環境変数にMICROCMS_SERVICE_DOMAINが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

// 環境変数にMICROCMS_API_KEYが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

// Client SDKの初期化を行う
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});
```

---

# Next.jsの導入説明文

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
