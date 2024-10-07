import { Request, Response, NextFunction } from 'express';
import { MapByRank, MapByReg, ResultData, names, regs, ranks } from './cache';
import { orderBy } from 'natural-orderby';

export const Authenticate = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.get('Authorization');
	if (!token || token !== process.env['SERVER_SECRET'])
		return res.sendStatus(401);
	next();
};

export function Categorise(results: any): void {
	const sortedByRank: ResultData[] = orderBy(results, [(e) => e.rank]);
	let i = 0;
	for (const rank of sortedByRank) {
		ranks.push(rank);
		MapByRank.set(rank.rank, i);
		i++;
	}

	i = 0;
	const sortedByReg: ResultData[] = orderBy(results, [(e) => e.reg]);

	for (const reg of sortedByReg) {
		regs.push(reg);
		MapByReg.set(reg.reg, i);
		i++;
	}

	i = 0;

	const sortedByName: ResultData[] = orderBy(results, [(e) => e.name]);
	sortedByName.sort((a, b) => {
		const alphanum = (str: string) =>
			//@ts-ignore
			str.match(/\d+|\D+/g).map((v) => (isNaN(v) ? v : parseInt(v, 10)));

		const aParts = alphanum(a.rank);
		const bParts = alphanum(b.rank);

		for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
			const aPart = aParts[i] || '';
			const bPart = bParts[i] || '';

			if (aPart > bPart) return 1;
			if (aPart < bPart) return -1;
		}
		return 0;
	});
	for (const name of sortedByName) {
		names.push(name);
		i++;
	}

	results = null;
}
