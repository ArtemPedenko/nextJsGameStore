import { NextResponse } from 'next/server';

export async function GET(
	request: any,
	{ params }: { params: { locale: string; search: string } }
) {
	console.log(params);
	async function getData(url: string) {
		const response = await fetch(url);
		const responseData = await response.json();
		return responseData;
	}

	const search = `https://store.epicgames.com/graphql?operationName=primarySearchAutocomplete&variables=%7B%22allowCountries%22:%22RU%22,%22category%22:%22games%2Fedition%2Fbase%7Cbundles%2Fgames%7Ceditors%7Csoftware%2Fedition%2Fbase%7Caddons%2Flaunchable%22,%22count%22:4,%22country%22:%22RU%22,%22keywords%22:%22${params.search}%22,%22locale%22:%22${params.locale}%22,%22sortBy%22:null,%22sortDir%22:%22DESC%22%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%22531ca97218358754b2a3dade40dbbfc62e280d0173dcaf53305b3b3f3c393580%22%7D%7D`;
	const serchData = await getData(search);

	//return NextResponse.json({ message: 'hello its work' });

	return new NextResponse(JSON.stringify(serchData));
}
