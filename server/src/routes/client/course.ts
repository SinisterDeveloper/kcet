import type { Request, Response } from 'express';

export const name = 'course';
import { ranks, ResultData } from '../../modules/cache';

export async function get(req: Request, res: Response) {
	const { query } = req.query;
	if (!query || typeof query !== 'string') return res.sendStatus(400);

	const response: ResultData[] = ranks.filter(
		(rank) => rank.courseCode === query.toUpperCase(),
	);

	return res.json(response);
}
