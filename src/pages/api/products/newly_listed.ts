import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Obtain ALL COMPUTER PARTS from carousell
 * @param req
 * @param res
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const query = req.query;
	const jsonDirectory = path.join(process.cwd(), '/json');

	const data = await fs.readFile(`${jsonDirectory}/all.json`, 'utf-8');

	let products = JSON.parse(data);
	products = products
		.map((value: any) => ({ value, sort: Math.random() }))
		.sort((a: { sort: number }, b: { sort: number }) => a.sort - b.sort)
		.map(({ value }: any) => value);
	products = products.filter((product: any) => product.source !== 'Facebook');
	if (Object.keys(query).length !== 0) {
		products = products.filter(
			(product: any) => product.product_type === `${query.filter}`
		);
	}
	products = products.slice(0, 16);
	res.status(200).json(products);
}
