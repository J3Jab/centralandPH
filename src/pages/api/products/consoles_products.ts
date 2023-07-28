import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { PRODUCT_DATA_LENGTH } from "./helpers/constants";
import * as filterHelper from "./helpers/filterHelper";

/**
 * Retrieve consoles products
 * @param req
 * @param res
 */

interface RequestQuery {
  source?: string;
  condition?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jsonDirectory = path.join(process.cwd(), "/json");

  const data = await fs.readFile(`${jsonDirectory}/all.json`, "utf-8");
  const allProducts = JSON.parse(data);

  // Obtain query params, if any
  const query = req.query;
  const pageNumber = parseInt(query.page as string) || 0;

  // Filter by consoles
  var consoleProducts = allProducts.filter(
    (product: any) => product.product_type === "consoles"
  );

  // Filter by query parameters -- if any (search, website, price, condition)
  var filteredProducts = filterHelper.filterProducts(req, consoleProducts);

  // Page
  var pageProducts = filteredProducts.slice(
    pageNumber * PRODUCT_DATA_LENGTH,
    PRODUCT_DATA_LENGTH * pageNumber + PRODUCT_DATA_LENGTH
  );

  const currentIndex = PRODUCT_DATA_LENGTH * pageNumber + PRODUCT_DATA_LENGTH;
  // console.log(`Current Index: ${currentIndex} | filteredProds Length: ${filteredProducts.length}`)
  const result = {
    pageProducts, 
    hasMore: currentIndex <= filteredProducts.length
  };

  res.status(200).json(result);
}
