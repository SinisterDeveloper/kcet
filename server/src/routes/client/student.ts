/**
 * To enhance the performance of the search functionality and provide faster response times,
 * additional memory space has been utilized in the form of multiple arrays and maps.
 * This trade-off allows us to quickly access and filter data, reducing the latency
 * that might otherwise impact the user experience.
 *
 * SinisterDeveloper
 */

export const name = 'student';
import type { Request, Response } from 'express';
import {
	MapByRank,
	MapByReg,
	names,
	ranks,
	regs,
	ResultData,
} from '../../modules/cache';

interface SearchParams {
	key: 'reg' | 'rank' | 'name';
	value: string;
}

export async function get(req: Request, res: Response) {
	// @ts-ignore
	let { key, value } = <SearchParams>req.query;
	value = value.toUpperCase().trim();

	if (!key || !value) return res.sendStatus(400);
	let response: ResultData[] = [];
	let ResultSize = parseInt(<string>process.env['RESULT_SIZE']) || 100;

	if (key === 'reg') {
		let startingEle = MapByReg.get(value as string);

		if (!startingEle)
			startingEle = getClosest({ key: key, value: value }) as
				| number
				| undefined;
		if (startingEle === undefined) return res.json([]);

		for (let i = 0; i < ResultSize; i++) {
			const currentIndex = startingEle + i;

			response.push(regs[currentIndex]);

			if (currentIndex >= regs.length) break;
		}
	} else if (key === 'name') {
		const regex = new RegExp(`\\b${value}`, 'i');

		response = names.filter((user) => regex.test(user.name));
		if (response.length > 100) response.length = 100;
	} else if (key === 'rank') {
		let startingEle = MapByRank.get(value as string);

		if (!startingEle)
			startingEle = getClosest({ key: key, value: value }) as
				| number
				| undefined;
		if (startingEle === undefined) return res.json([]);

		for (let i = 0; i < ResultSize; i++) {
			const currentIndex = startingEle + i;

			response.push(ranks[currentIndex]);

			if (currentIndex >= ranks.length) break;
		}
	} else return res.json([]);

	return res.json(response);
}

function getClosest(search: SearchParams) {
	if (search.key === 'reg') {
		if (search.value.length !== 5) return MapByReg.get(regs[0].reg);

		const intPart = parseInt(search.value.slice(0, 2));
		let i = intPart;
		let j = intPart;

		if (i < parseInt(regs[0].reg)) return MapByReg.get(regs[0].reg);
		if (i > parseInt(regs[regs.length - 1].reg))
			return MapByReg.get(regs[regs.length - 1].reg);

		while (
			i <= parseInt(regs[regs.length - 1].reg) ||
			j >= parseInt(regs[0].reg)
		) {
			if (MapByReg.has(`${i}`)) return MapByReg.get(`${i}`);
			if (MapByReg.has(`${j}`)) return MapByReg.get(`${j}`);
			i++;
			j--;
		}
	} else {
		const numericValue = search.value.replace(/[^0-9]/g, '');
		let i = parseInt(numericValue);
		let j = i;

		if (i < parseInt(ranks[0].rank)) return MapByRank.get(ranks[0].rank);
		if (i > parseInt(ranks[ranks.length - 1].rank))
			return MapByRank.get(ranks[ranks.length - 1].rank);

		while (
			i <= parseInt(ranks[ranks.length - 1].rank) ||
			j >= parseInt(ranks[0].rank)
		) {
			if (MapByRank.has(`${i}`)) return MapByRank.get(`${i}`);
			if (MapByRank.has(`${j}`)) return MapByRank.get(`${j}`);
			i++;
			j--;
		}
	}

	return undefined;
}
