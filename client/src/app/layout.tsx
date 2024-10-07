'use client'

import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';
import type { ReactNode } from "react";
import { UserProvider } from '@auth0/nextjs-auth0/client';

const mono = localFont({
	src: './mono.woff2',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'KCET Analyzer',
	description: 'A KCET Allotment Analyzer Tool'
};

export default function RootLayout({ children }: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={mono.className}>
				<UserProvider>
					{children}
				</UserProvider>
			</body>
		</html>
	);
}
