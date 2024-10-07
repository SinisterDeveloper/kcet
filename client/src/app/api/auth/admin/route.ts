import { NextResponse } from 'next/server'

export async function POST(req: Request): Promise<NextResponse<{ status: string }>> {
	const { token } = await req.json();
	if (process.env['SERVER_TOKEN'] === token) return NextResponse.json({ status: 'OK'}, { status: 200 })
	else return NextResponse.json({ status: 'NOT OK' }, { status: 401 })
}