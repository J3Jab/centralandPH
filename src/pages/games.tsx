import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ProductItem, {
  ProductProps,
} from "../components/ProductItem/ProductItem";
import { Box, SimpleGrid, TextInput } from "@mantine/core";
import InfiniteScroll from "react-infinite-scroll-component";
import qs from "qs";

export default function GamesPage(props: any) {
  const [items, setItems] = useState<ProductProps[]>([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  // Used for infinite scrolling
  const fetchDataScroll = () => {
    const nextPage = page + 1;
    // Stringify filters from router query
    const queryString = qs.stringify(router.query);
    fetch(
      `/api/products/games_products?page=${nextPage}&${queryString}`
    )
      .then((res) => res.json())
      .then((data) => {
        setHasMore(data.hasMore);
        setItems((prevItems) => [...prevItems, ...data.pageProducts]);
        setPage(nextPage);
      });
  };

  // Filter changes, reset data
  useEffect(() => {
    if (!router.isReady) return;
    setLoading(true);
    setItems([]);
    setPage(0);
    const queryString = qs.stringify(router.query);
    fetch(
      `/api/products/games_products?${queryString}`
    )
      .then((res) => res.json())
      .then((data) => {
        setHasMore(data.hasMore);
        setItems(data.pageProducts);
        setLoading(false);
      });
  }, [router.query, router.isReady]);

  const endMessage = (
    <h2 className="flex justify-center text-center text-lg">{items.length > 0 ? 
      "No more products to show" : 
      (<>No products found. {<br/>} Try removing filters or search for different keywords.</>)}
    </h2>
  )
  
  return (
    <Box
      w="75%"
      sx={{
        left: "220px",
        position: "absolute",
      }}
      className="mx-20 py-8"
      id="scroll-container"
    >
      <Head>
        <title>Games</title>
      </Head>

      <div className="pb-8">
        <p className="font-semibold text-2xl">Consoles</p>
        <p className="text-sm">
          Find new and used games for sale in the Philippines.
        </p>
      </div>
      <InfiniteScroll
        dataLength={items.length}
        hasMore={hasMore}
        next={fetchDataScroll}
        loader={<h4 className="flex justify-center">Loading More . . .</h4>}
        endMessage={endMessage}
        className="pb-2"
      >
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
          className="pb-8"
        >
          {items.map((item: ProductProps, index) => (
            <ProductItem key={index} {...item} />
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </Box>
  );
}
