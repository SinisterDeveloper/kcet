// @ts-ignore

'use client'

import {TextEffect} from '@/components/anim/TextEffect';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { postClient } from '@/lib/server';

export default function Home() {
	return (
		<Page />
	);
}

// @ts-ignore
function NextStep({ type }) {
	const { user, isLoading } = useUser();
	if (isLoading) return;
	if (user) {
		postClient(user);
	}

	return <Link className="border border-white py-2 px-4 rounded transition duration-200 home-gradient mb-2 mt-2" href={type === 'code' ? 'https://github.com/SinisterDeveloper/kcet' : `/${type.toLowerCase()}`} >
		<TextEffect className='' text={type === 'code' ? 'Source Code' : `${type}-Wise Allotments`} />
	</Link>

}

function Page() {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-950">
			<h1><TextEffect className='text-4xl font-bold mb-10 home-gradient' text='KCET - Round 1'/></h1>
			<h1><TextEffect className='text-lg font-bold mb-10 home-gradient' text='(Source Code will be made public soon)'/></h1>
			<NextStep type="Student"/>
			<NextStep type="Course"/>
			<NextStep type="code"/>
		</div>
	)
}