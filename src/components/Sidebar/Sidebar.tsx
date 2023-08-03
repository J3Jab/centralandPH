// components/layout/Layout.tsx
import React, { PropsWithChildren } from "react";
import {
  Aside,
  Checkbox,
  Stack,
  TextInput,
  Text,
  Space,
  Group,
  Button,
} from "@mantine/core";
import "./sidebar.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import qs from "qs";
import { useForm, UseFormReturnType } from "@mantine/form";
import SmallAd, { SmallAdProps } from "../Ads/SmallAd";
import va from '@vercel/analytics';

const Sidebar = ({ form, submitForm, smallAd }: any) => {
  
  const router = useRouter();
  

  return (
    <Aside fixed={false} position={{ top: 0, left: 0 }} width={{ base: 250 }} className="px-6 py-8 z-0 bg-[#FFF] overflow-auto">
      <form onSubmit={form.onSubmit(() => submitForm())}>
        <Stack
          spacing={0}
        >
          <p className="font-semibold text-2xl">Website</p>
          <Checkbox
            mt="md"
            label="Shopee"
            {...form.getInputProps("shopee", { type: "checkbox" })}
          />
          <Checkbox
            mt="md"
            label="Carousell"
            {...form.getInputProps("carousell", { type: "checkbox" })}
          />
          <Checkbox
            mt="md"
            label="Lazada"
            {...form.getInputProps("lazada", { type: "checkbox" })}
          />

          <Space h="md" />

          <p className="font-semibold text-2xl">Condition</p>
          <Checkbox
            mt="md"
            label="Brand New"
            {...form.getInputProps("bNew", { type: "checkbox" })}
          />
          <Checkbox
            mt="md"
            label="Like New"
            {...form.getInputProps("lNew", { type: "checkbox" })}
          />
          <Checkbox
            mt="md"
            label="Slightly Used"
            {...form.getInputProps("sUsed", { type: "checkbox" })}
          />
          <Checkbox
            mt="md"
            label="Well Used"
            {...form.getInputProps("wUsed", { type: "checkbox" })}
          />

          <Space h="md" />

          <p className="font-semibold text-2xl">Price</p>
          <Group spacing={5}>
            <TextInput placeholder="Min" {...form.getInputProps("min")} />
            to
            <TextInput placeholder="Max" {...form.getInputProps("max")} />
          </Group>

          <Group position="right" mt="md">
            <Button
              type="submit"
              radius="md"
              sx={{
                background: "#9CD9A5 !important",
                color: "black",
                width: "100%",
              }}
            >
              Apply
            </Button>
          </Group>
        </Stack>
      </form>

      <div className="mt-8"
      onClick={() => {
        va.track('Small Ad');
      }}>
        <SmallAd imageSrc={smallAd}/>
      </div>
      
    </Aside>
  );
};

export default Sidebar;
