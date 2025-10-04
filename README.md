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
https://nextjs.org/docs/app/getting-started/project-structure



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
