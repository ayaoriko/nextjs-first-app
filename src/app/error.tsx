'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div>
            <h1>予期せぬエラーが発生しました。</h1>
            <button onClick={() => reset()}>もう一度試す</button>
        </div>
    )
}