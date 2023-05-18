import { MantineProvider, ColorScheme } from "@mantine/core";
import { useState } from "react";
import NextApp, { AppProps, AppContext } from "next/app";
import { getColorScheme } from "@/utils";

export default function App({
  Component,
  pageProps,
  defaultTheme,
}: AppProps & { defaultTheme: ColorScheme }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(defaultTheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getColorScheme(localStorage.getItem("color-scheme")),
  };
};
