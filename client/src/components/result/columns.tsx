"use client"

import {ColumnDef} from "@tanstack/react-table";

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import {Button} from "@/components/ui/button";
import '@/app/globals.css';
import {DataMap} from "./data";

export interface RawResultData {
	reg: string
	name: string
	rank: string
}

export interface ResultData extends RawResultData {
	clg: string,
	cat: string,
	courseName: string,
	courseCode: string,
	fee: number,
	opt: number
}

export const columns: ColumnDef<RawResultData>[] = [
	{
		id: 'reg',
		accessorKey: "reg",
		header: "CET No",
	},
	{
		id: 'name',
		accessorKey: "name",
		header: "Name",
	},
	{
		id: 'rank',
		accessorKey: "rank",
		header: "Rank"

	},
	{
		id: "view",
		cell: ({row}) => {

			const student = row.getValue('reg');
			return (
				<DisplayData student={student}/>
			)
		},
	},
];

// @ts-ignore
function DisplayData({student}) {
	const data = DataMap.get(student);
	if (!data) return null;
	const {clg, cat, opt, courseName, courseCode, fee} = data;

	return (
		<Drawer>
			<DrawerTrigger>View</DrawerTrigger>
			<DrawerContent>

				<DrawerHeader>
					<DrawerTitle className="home-gradient text-2xl">
						<center>Allotment Data for {student.toUpperCase()}</center>
						<br></br>
					</DrawerTitle>
					<DrawerDescription className="text-base md:text-lg">
						<center className="my-4">
							<h1 className="text-purple-300">College: <code
								className="font-mono text-green-200 p-1 rounded">{clg}</code></h1>
							<h1 className="text-purple-300">Course Name: <code
								className="font-mono text-green-200 p-1 rounded">{courseName}</code></h1>
							<h1 className="text-purple-300">Course Code: <code
								className="font-mono text-green-200 p-1 rounded">{courseCode}</code></h1>
							<h1 className="text-purple-300">Category: <code
								className="font-mono text-green-200 p-1 rounded">{cat}</code></h1>
							<h1 className="text-purple-300">Fee: <code
								className="font-mono text-green-200 p-1 rounded">{fee}</code></h1>
							<h1 className="text-purple-300">Option #: <code
								className="font-mono text-green-200 p-1 rounded">{opt}</code></h1>
						</center>
					</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
					<DrawerClose>
						<Button variant="outline" className="text-sky-200">Close</Button>
					</DrawerClose>
				</DrawerFooter>

			</DrawerContent>
		</Drawer>
	)
}