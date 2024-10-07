'use server'

import type { ResultData } from "@/components/result/columns";

// @ts-ignore
export async function searchResult(query: string, type: 'reg' | 'rank' | 'name'): Promise<ResultData[]> {
	try {
		return await (await fetch(`${process.env['API_SERVER']}/client/student?key=${type}&value=${encodeURIComponent(query.toUpperCase().trim())}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${process.env['SERVER_SECRET']}`
			}
		})).json();
	} catch(e) {
		console.error(e);
		return [];
	}
}

// @ts-ignore
export async function searchCourse(query: string): Promise<ResultData[]> {
	try {
		return await (await fetch(`${process.env['API_SERVER']}/client/course?query=${encodeURIComponent(query.toUpperCase().trim())}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${process.env['SERVER_SECRET']}`
			}
		})).json();
	} catch(e) {
		console.error(e);
		return [];
	}
}