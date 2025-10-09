import BackLink from '@/components/BackLink';

// app/not-found.tsx
export default function NotFound() {
  return (
    <main>
      <h1>404</h1>
      <p>ページが見つかりませんでした</p>
      <BackLink />
    </main>
  );
}