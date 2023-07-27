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
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import qs from "qs";

const Sidebar = (props: any) => {
  const form = useForm({
    initialValues: {
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
  const router = useRouter();

  const submitForm = (values: any) => {
    router.push(`?${qs.stringify(form.values)}`);
  };

  React.useEffect(() => {
    form.reset();
  }, [router.route]);

  return (
    <Aside fixed={false} position={{ top: 0, left: 0 }} width={{ base: 200 }}>
      <form onSubmit={form.onSubmit((values) => submitForm(values))}>
        <Stack
          sx={{
            paddingTop: "16px",
            paddingLeft: "10px",
          }}
          spacing={0}
        >
          <p className="font-semibold text-2xl">Website</p>
          <Checkbox
            mt="md"
            label="Facebook"
            {...form.getInputProps("facebook", { type: "checkbox" })}
          />
          <Checkbox
            mt="md"
            label="Shopee"
            {...form.getInputProps("shopee", { type: "checkbox" })}
          />
          <Checkbox
            mt="md"
            label="Datablitz"
            {...form.getInputProps("datablitz", { type: "checkbox" })}
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
    </Aside>
  );
};

export default Sidebar;
