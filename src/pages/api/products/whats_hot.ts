import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Obtain ALL COMPUTER PARTS from carousell
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query
  const jsonDirectory = path.join(process.cwd(), "/json");

  const data = await fs.readFile(
    `${jsonDirectory}/all.json`,
    "utf-8"
  );

  var allProducts = JSON.parse(data);
  allProducts =  allProducts.map((value : any) => ({ value, sort: Math.random() })).sort((a: { sort: number; }, b: { sort: number; }) => a.sort - b.sort).map(({ value } : any) => value)
  allProducts = allProducts.slice(0, 8);
  res.status(200).json(allProducts);
}
