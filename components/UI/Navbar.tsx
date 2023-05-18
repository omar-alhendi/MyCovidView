import { Navbar, Flex, ScrollArea, createStyles, rem } from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  TablerIconsProps,
} from "@tabler/icons-react";
import { LinksGroup } from "./LinksGroup";
import ToggleTheme from "./ToggleTheme";

interface NavLink {
  label: string;
  icon: (props: TablerIconsProps) => JSX.Element;
  initiallyOpened?: boolean;
  links?: NestedNavLink[];
}
type NestedNavLink = {
  label: string;
  link: string;
};

const mockdata: NavLink[] = [
  { label: "Overview", icon: IconGauge },
  {
    label: "Analytics",
    icon: IconPresentationAnalytics,
    initiallyOpened: true,
    links: [
      { label: "Bar Charts", link: "/charts" },
      { label: "Pie Charts", link: "/charts" },
      { label: "Line Charts", link: "/charts" },
    ],
  },
  { label: "Settings", icon: IconAdjustments },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const Nav = () => {
  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <Navbar
      height="100vh"
      width={{ sm: 300 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section className={classes.header}>
        <Flex align="center" justify="space-between">
          <div>MyCovidView</div>
          <ToggleTheme />
        </Flex>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
    </Navbar>
  );
};

export default Nav;
