import Image from 'next/image'
// aタグはクリックすると ブラウザがページ全体を再読み込みするため、ページ遷移の速度が遅い。
//  Linkコンポーネントを使うと、ブラウザの再読み込みが発生しないので、ページ遷移が高速化される。ページ遷移時に 必要な部分だけを差し替えるSPAのような動作。
import Link from 'next/link';
export default function Page() {
  return (
    <>
      <h1>Hello, Next.js!</h1>
      <Image src="/next.svg" alt="Profile" width={100} height={100} /><br />
      <Link href="blog">Go to Blog</Link><br />
      <Link href="dashboard">Go to Dashboard</Link>
    </>
  )
}