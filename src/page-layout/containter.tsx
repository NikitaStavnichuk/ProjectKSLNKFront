import React from 'react'

export const PageLayout = ({ children }: { children: any }) => {
  return (
    <main className="flex flex-col items-center justify-center p-24 bg-pink-50 min-h-[calc(100vh-264px)]">
      { children }
    </main>
  )
}
