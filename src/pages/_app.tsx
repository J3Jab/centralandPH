import { AppProps } from "next/app";
import Head from "next/head";
import { AppShell, MantineProvider } from "@mantine/core";
import WebsiteNavbar from "@/components/WebsiteNavbar";
import "../app/globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import router, { useRouter } from "next/router";
import { useState } from "react";
import { Analytics } from '@vercel/analytics/react';
import { useForm } from "@mantine/form";
import qs from "qs";
import React from "react";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const showSidebar = router.pathname !== "/";

  interface FilterFormValues {
    search: string,
    facebook?: boolean,
    shopee: boolean,
    datablitz?: boolean,
    carousell?: boolean,
    lazada: boolean,
    bNew: boolean,
    lNew: boolean,
    sUsed: boolean,
    wUsed: boolean,
    min: string,
    max: string,
  }

  const form = useForm({
    initialValues: {
      search: "",
      facebook: false,
      shopee: false,
      datablitz: false,
      carousell: false,
      lazada: false,
      bNew: false,
      lNew: false,
      sUsed: false,
      wUsed: false,
      min: "",
      max: "",
    },
  });

  const submitForm = (values: any) => {
    router.push(`?${qs.stringify(form.values)}`);
  };

  

  React.useEffect(() => {
    form.reset();
  }, [router.route]);

  React.useEffect(() => {
    if (!router.isReady)
      return;
    
    // Load filters on load
    const queryFilters : any = {};
    const nonCheckboxes = ["search", "min", "max"];
    const checkboxes = ["facebook", "shopee", "datablitz", "carousell", "lazada", "bNew", "lNew", "sUsed", "wUsed"];
    for (const filter of Object.keys(router.query)) {
      console.log("")
      // If checkbox, convert string to boolean
      if ((checkboxes.includes(filter))) {
        if(router.query[filter] === "true")
          queryFilters[filter] = true;
        else
          queryFilters[filter] = false;
      }
      
      else if (nonCheckboxes.includes(filter))
        queryFilters[filter] = router.query[filter];
    }
    form.setValues(queryFilters);
    console.log(queryFilters)
    console.log(`Page load: ${JSON.stringify(router.query)}`)
  }, [router.query, router.isReady]);

  return (
    <>
      <Head>
        <link rel="icon" href="/cph-logo.png" />
        <title>Home</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <AppShell
          className="relative"
          header={<WebsiteNavbar form={form} submitForm={submitForm}/>}
          navbar={
            showSidebar ? 
              <Sidebar form={form} submitForm={submitForm}/> 
              : <></>}
        >
          <Component {...pageProps} 
          />
        </AppShell>
      </MantineProvider>
      <Analytics />
    </>
  );
}
