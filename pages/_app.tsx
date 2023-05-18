import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";
import { useState } from "react";
import NextApp, { AppProps, AppContext } from "next/app";
import { getColorScheme } from "@/utils";
import Container from "@/components/layout/Container";

export default function App({
  Component,
  pageProps,
  defaultTheme,
}: AppProps & { defaultTheme: ColorScheme }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(defaultTheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    typeof window !== "undefined" &&
      window.localStorage?.setItem("color-scheme", nextColorScheme);
    setColorScheme(nextColorScheme);
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        <Container>
          <Component {...pageProps} />
        </Container>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  const colorScheme = getColorScheme(
    typeof window !== "undefined"
      ? window.localStorage?.getItem("color-scheme")
      : null
  );
  return {
    ...appProps,
    colorScheme,
  };
};
