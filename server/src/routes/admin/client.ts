export const name = 'client';

import type { Request, Response } from 'express';
import { Clients } from '../../modules/cache';
import type { ClientData } from '../../modules/cache';
import Client from '../../models/Client';

interface RawClientData {
	given_name?: string;
	family_name?: string;
	nickname: string;
	name: string;
	picture?: string;
	updated_at?: string;
	email?: string;
	email_verified: boolean;
	sub: string;
	sid: string;
}

export async function post(req: Request, res: Response) {
	const { sub, name, email, picture } = <RawClientData>req.body;
	if (Clients.has(sub)) return res.sendStatus(200);
	if (!sub) return res.sendStatus(400);

	const ClientBody: ClientData = {
		id: sub,
		timestamp: `${Date.now()}`,
		email: email || '',
		name: name,
		picture: picture || '',
	};

	try {
		Clients.set(sub, ClientBody);
		await Client.updateOne({ id: sub }, ClientBody, { upsert: true });
		res.sendStatus(200);
	} catch (e) {
		console.error('Error in saving new client: ', e);
	}
}
