import React, { ReactNode } from "react";
import Nav from "../UI/Navbar";
import { AppShell } from "@mantine/core";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <AppShell
      padding="md"
      navbar={<Nav />}
      styles={(theme) => ({
        main: {
          paddingTop: 0,
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default Container;
