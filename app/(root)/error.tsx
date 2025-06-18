'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="flex flex-col items-center justify-center min-h-[75vh] text-center px-4 animate-fade-in select-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 mb-8 text-red-600 dark:text-red-400 animate-pulse"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        role="img"
        aria-label="Error icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <h1 className="text-4xl font-extrabold text-dark100_light900 mb-4">
        ¡Uy! Algo salió mal
      </h1>

      <p className="text-lg text-dark400_light500 max-w-xl mb-6">
        No pudimos cargar esta sección. Puede ser por un error temporal. Tranquilo, podés intentarlo nuevamente.
      </p>

      <button
        onClick={reset}
        className="rounded-xl bg-primary-500 px-6 py-3 text-white font-semibold hover:bg-primary-dark transition-colors focus:outline-none focus:ring-4 focus:ring-primary/50"
        aria-label="Intentar de nuevo"
      >
        Intentar de nuevo
      </button>
    </section>
  )
}
