import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from './tailwind.css'
import { connect } from "mongoose";

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
];

async function run() {
  try {
    await connect('mongodb://127.0.0.1:27017/bcmytdb')
    console.log(`🟢 Connected to Db 🟢`)
  } catch (error) {
    console.error(`🔴 Error In Mongo Connectivity 🔴`) 
    console.log(error)   
  }
}

run()


export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
