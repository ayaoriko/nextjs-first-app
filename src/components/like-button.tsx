// app/components/like-button.tsx
'use client';

import { useState } from 'react';

export default function LikeButton({ likes }: { likes: number }) {
    const [likeCount, setLikeCount] = useState(likes);
    return (
        <button onClick={() => setLikeCount(likeCount + 1)}>
            Like ({likeCount})
        </button>
    );
}