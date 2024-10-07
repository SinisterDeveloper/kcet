'use client'

import { useState, useEffect, SetStateAction} from "react";
import {searchCourse} from "@/lib/results";
import { useUser } from '@auth0/nextjs-auth0/client';
import { redirect } from "next/navigation";
import {ResultData, RawResultData, columns} from "@/components/result/columns";
import {DataTable} from "./table";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {DataMap} from "@/components/result/data";
// @ts-ignore
function InputWithButton({onSearch}) {
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
		setInputValue(e.target.value);
	};

	const handleButtonClick = () => {
		onSearch(inputValue);
	};

	return (
		<div className="flex w-full max-w-sm items-center space-x-2">
			<Input
				type="text"
				placeholder='Course Code (ex: "E005CS")'
				className="placeholder:text-slate-500 mb-10"
				value={inputValue}
				onChange={handleInputChange}
			/>
			<Button
				type="submit"
				className="border border-white py-2 px-4 rounded transition duration-200 home-gradient mb-10"
				onClick={handleButtonClick}
			>
				Search
			</Button>
		</div>
	);
}

export default function Page() {
	const { user, isLoading } = useUser();
	if (isLoading) return;
	if (!user) redirect('/api/auth/login');

	const [searchQuery, setSearchQuery] = useState("");
	const [rawResults, setRawResults] = useState<RawResultData[]>([]);

	function handleSearch(query: string) {
		setSearchQuery(query);
	}

	useEffect(() => {
		async function fetchDetails() {
			if (!searchQuery) return;

			const results: ResultData[] = await searchCourse(searchQuery);
			let rawResults = [];
			DataMap.clear();
			for (const result of results) {
				if (!result) continue;
				rawResults.push({
					reg: result["reg"],
					rank: result["rank"],
					name: result["name"]
				});
				if (!DataMap.has(result["reg"])) DataMap.set(result["reg"], result);
			}
			results.length = 0;
			setRawResults(rawResults);
		}

		fetchDetails();
	}, [searchQuery]);

	return (
		<div className="bg-gray-950 min-h-screen flex flex-col items-center justify-center">
			<div className="w-full max-w-md flex items-center justify-between p-4">
				{searchQuery ? (
					<div>
						<InputWithButton onSearch={handleSearch} />
						<DataTable columns={columns} data={rawResults} />
					</div>
				) : (
					<>
						<InputWithButton onSearch={handleSearch} />

					</>
				)}
			</div>
		</div>
	);
}
