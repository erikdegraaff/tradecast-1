import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
    title: 'Soccer Game',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="body">{children}</body>
        </html>
    )
}
