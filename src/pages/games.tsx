import Head from "next/head";
import React, { useEffect, useState } from "react";
import TempProductItem from "../components/ProductItem/TempProductItem";
import { Box, SimpleGrid, TextInput } from "@mantine/core";
import SearchIcon from "../components/Icons/SearchIcon";
import ProductItem, {
  ProductProps,
} from "@/components/ProductItem/ProductItem";
import { useRouter } from "next/router";

export default function Games() {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const searchParam = router.query.search ? router.query.search : "";
  const {
    facebook,
    shopee,
    datablitz,
    carousell,
    bNew,
    lNew,
    sUsed,
    wUsed,
    min,
    max,
    lazada,
  } = router.query;

  const website = {
    facebook: facebook || "false",
    shopee: shopee || "false",
    datablitz: datablitz || "false",
    carousell: carousell || "false",
    lazada: lazada || "false",
  };

  const condition = {
    bNew: bNew || "false",
    lNew: lNew || "false",
    sUsed: sUsed || "false",
    wUsed: wUsed || "false",
  };

  const price = {
    min: min || "",
    max: max || "",
  };

  useEffect(() => {
    setLoading(true);
    fetch("/api/products/games_products")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const filteredProducts = React.useMemo(() => {
    const filtered =
      items.filter((product: ProductProps) =>
        product.product_name
          .toLowerCase()
          .includes((searchParam as string).toLowerCase())
      ) ?? [];

    return filtered;
  }, [items, searchParam]);

  const filteredWebsite = React.useMemo(() => {
    if (
      website.facebook == "false" &&
      website.shopee == "false" &&
      website.carousell == "false" &&
      website.datablitz == "false" &&
      website.lazada == "false"
    ) {
      return filteredProducts;
    }

    const filtered = filteredProducts.filter((product: ProductProps) => {
      if (
        website.facebook == "true" &&
        product.source.toLowerCase() === "facebook"
      ) {
        return true;
      }
      if (
        website.shopee == "true" &&
        product.source.toLowerCase() === "shopee"
      ) {
        return true;
      }
      if (
        website.datablitz == "true" &&
        product.source.toLowerCase() === "datablitz"
      ) {
        return true;
      }
      if (
        website.carousell == "true" &&
        product.source.toLowerCase() === "carousell"
      ) {
        return true;
      }
      if (
        website.lazada == "true" &&
        product.source.toLowerCase() === "lazada"
      ) {
        return true;
      }
      return false;
    });
    return filtered;
  }, [website, filteredProducts]);

  const filteredCondition = React.useMemo(() => {
    if (
      condition.bNew == "false" &&
      condition.lNew == "false" &&
      condition.sUsed == "false" &&
      condition.wUsed == "false"
    ) {
      return filteredWebsite;
    }

    const filtered = filteredWebsite.filter((product: ProductProps) => {
      if (
        condition.bNew == "true" &&
        product.product_condition?.toLowerCase() === "brand new"
      ) {
        return true;
      }
      if (
        condition.lNew == "true" &&
        product.product_condition?.toLowerCase() === "like new"
      ) {
        return true;
      }
      if (
        condition.sUsed == "true" &&
        product.product_condition?.toLowerCase() === "slightly used"
      ) {
        return true;
      }
      if (
        condition.wUsed == "true" &&
        product.product_condition?.toLowerCase() === "well used"
      ) {
        return true;
      }
      return false;
    });
    return filtered;
  }, [condition, filteredWebsite]);

  const filteredPrice = React.useMemo(() => {
    if (price.min == "" && price.max == "") {
      return filteredCondition;
    }

    const filtered = filteredCondition.filter((product: ProductProps) => {
      if (
        price.min === "" &&
        price.max !== "" &&
        product.product_price &&
        parseFloat(product.product_price) <= parseFloat(price.max as string)
      ) {
        return true;
      }
      if (
        price.min !== "" &&
        price.max === "" &&
        product.product_price &&
        parseFloat(product.product_price) >= parseFloat(price.min as string)
      ) {
        return true;
      }
      if (
        price.min !== "" &&
        price.max !== "" &&
        product.product_price &&
        parseFloat(product.product_price) >= parseFloat(price.min as string) &&
        parseFloat(product.product_price) <= parseFloat(price.max as string)
      ) {
        return true;
      }
      return false;
    });
    return filtered;
  }, [price, filteredCondition]);

  console.log(filteredPrice);
  console.log(price);

  return (
    <Box
      w="75%"
      sx={{
        left: "220px",
        position: "absolute",
      }}
    >
      <Head>
        <title>Games</title>
      </Head>

      {/* <section className='py-10'>
				<form action='/games'>
					<div className='flex justify-center'>
						<TextInput
							placeholder='Search'
							radius={10}
							value={searchVal}
							className='w-1/2'
							onChange={(event) => {
								setSearchVal(event.currentTarget.value);
							}}
							icon={<SearchIcon size={14} />}
						/>
					</div>
				</form>
			</section> */}

      <div className="pb-8">
        <p className="font-semibold text-2xl">Games</p>
        <p className="text-sm">
          Find new and used games for sale in the Philippines.
        </p>
      </div>

      <SimpleGrid
        cols={5}
        spacing="lg"
        verticalSpacing="xl"
        sx={{
          placeItems: "start",
          alignItems: "start",
        }}
        breakpoints={[
          { maxWidth: "120rem", cols: 4, spacing: "xs" },
          { maxWidth: "100rem", cols: 3, spacing: "xs" },
          { maxWidth: "90rem", cols: 2, spacing: "xs" },
          { maxWidth: "70rem", cols: 1, spacing: "xs" },
        ]}
      >
        {filteredPrice.map((item: ProductProps, index) => (
          <ProductItem key={index} {...item} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
