'use server'

export async function postClient(data: any) {
	try {
		const res = await fetch(`${process.env['API_SERVER']}/admin/client`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${process.env['SERVER_SECRET']}`
			},
			body: JSON.stringify(data)
		});
		if (!res.ok) console.error('Unable to save Client Data');
	} catch (error) {
		console.error('POST Error(REGISTER) ', error);
	}
}