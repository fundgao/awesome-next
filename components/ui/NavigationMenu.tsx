"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Mexc, DownloadIcon, GlobalOutlined } from "@/components/svg/index";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NavigationMenuMexc() {
  const text_color = "text-[#f2f4f6]";
  const text_color_hover = "text-[#1463ff]";
  const bg_color = "bg-[#16171a]";

  return (
    <NavigationMenu className="sticky top-0 max-w-full bg-[#16171a] h-16 justify-start px-4 z-50">
      <Mexc width="130" height="60" />
      <div
        className={`switch ml-4 flex text-sm bg-[#222429] rounded-3xl ${text_color}`}
      >
        <div className="px-4 py-1 bg-[#33373d] rounded-3xl">交易所</div>
        <div className="px-4 py-1">DEX+</div>
      </div>
      <NavigationMenuList className="">
        <NavigationMenuItem
          className={`${text_color} ${bg_color} hover:${bg_color}`}
        >
          <NavigationMenuTrigger
            className={`${text_color} ${bg_color} hover:${bg_color}`}
          >
            买币
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${text_color} ${bg_color} hover:${bg_color} text-sm hover:${text_color_hover}`}
            >
              市场
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/exchange" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${text_color} ${bg_color} hover:${bg_color} text-sm hover:${text_color_hover} ml-4`}
            >
              现货交易
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`${text_color} ${bg_color} hover:${bg_color}`}
          >
            合约交易
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${text_color} ${bg_color} hover:${bg_color} text-sm hover:${text_color_hover}`}
            >
              Meme+
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <div className="right flex items-center absolute right-4">
        <Button
          variant="ghost"
          className={`${text_color} hover:${bg_color} hover:${text_color_hover}`}
        >
          登录
        </Button>
        <Button
          className={`bg-[#1463ff] ${text_color} hover:bg-[#3379ff] rounded-3xl h-8`}
        >
          注册
        </Button>
        <div className="icons ml-8 flex items-center space-x-4">
          <DownloadIcon />
          <GlobalOutlined />
        </div>
      </div>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
