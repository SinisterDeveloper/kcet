export interface ResultData {
	reg: string;
	rank: string;
	name: string;
	clg: string;
	cat: string;
	courseName: string;
	courseCode: string;
	opt: number;
}

export interface ClientData {
	_id?: any;
	id: string;
	name: string;
	email?: string;
	timestamp: string;
	picture?: string;
}

const Clients = new Map<string, ClientData>();

const MapByRank = new Map<string, number>();
const MapByReg = new Map<string, number>();

let ranks: ResultData[] = [];
const names: ResultData[] = [];
const regs: ResultData[] = [];

export { Clients, MapByReg, regs, names, ranks, MapByRank };
