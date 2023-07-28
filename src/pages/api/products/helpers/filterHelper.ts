import { ProductProps } from "../../../../components/ProductItem/ProductItem";
import { NextApiRequest } from "next";
import { WEBSITES, CONDITIONS } from "./constants";

/**
 * Filters products based on (search, website, condition, price) -- if any
 * @param req NextApiRequest - contains the query parameters
 * @param products ProductProps[] - list of products
 */
export function filterProducts(req: NextApiRequest, products: ProductProps[]) {
    const query = req.query;

    // Filter by search
    const searchStr = req.query.search as string;
    var filteredProducts = filterProdsBySearch(searchStr, products);

    // Filter by website
    const websiteQueryFilters = Object.keys(WEBSITES).filter(website => query[website] === "true");
    // console.log(`Query:`);
    // console.log(query);
    // console.log(`Website Query Filters: ${websiteQueryFilters}`);
    const websiteFilterList = websiteQueryFilters.map(website => WEBSITES[website]);
    filteredProducts = filterProdsByWebsite(websiteFilterList, filteredProducts);

    // Filter by condition
    const conditionQueryFilters = Object.keys(CONDITIONS).filter(condition => query[condition] === "true");
    const conditionFilterList = conditionQueryFilters.map(condition => CONDITIONS[condition]);
    // TODO: filter by condition

    // Filter by price
    const maxPrice = parseInt(query.max as string) || 0;
    const minPrice = parseInt(query.min as string) || 0;
    filteredProducts = filterProdsByPrice(minPrice, maxPrice, filteredProducts);

    return filteredProducts;
} 

function filterProdsBySearch(searchStr: string | null, products: ProductProps[]) {
    return products.filter((product: any) => {
        if (searchStr && !(product.product_name.toLowerCase().includes((searchStr).toLowerCase())))
          return false;
          
        return true;
    });
}

/**
 * Filters products by websites. If no website filters are given, returns all products.
 * @param websites string[] - list of websites, values found in constants.ts (values, not keys). Must be equivalent to values in json file.
 * @param products ProductProps[] - list of products to filter
 * @returns filtered products
 */
function filterProdsByWebsite(websites: string[], products: ProductProps[]) {
    // console.log(`Websites to search: ${websites}`);
    if (websites.length > 0) {
      products = products.filter((product: any) => websites.includes(product.source));
    }
    return products;
}

// Filter by condition type (if atleast one condition filter type is selected)
function filterProdsByCondition(conditions: string[], products: ProductProps[]) {
    if (conditions.length > 0) {
        products = products.filter((product: any) => conditions.includes(product.product_condition));
    }
    return products;
}

function filterProdsByPrice(minPrice: number, maxPrice: number, products: ProductProps[]) {
    if (maxPrice != 0 || minPrice != 0) {
        products = products.filter((product: any) => {
            // Exclude if not in range
            if (minPrice && product.product_price < minPrice) {
                return false;
            }
                
            if (maxPrice && product.product_price > maxPrice) {
                return false;
            }
            return true;
        })
    }
    return products;
}

