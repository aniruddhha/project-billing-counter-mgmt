import type { LinksFunction } from "@remix-run/node";
import styles from './tailwind.css'

import mongoose from 'mongoose';

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles }
];

const db = async () =>  {
  try {
    const url = 'mongodb://localhost:27017/bcmdb';
    await mongoose.connect(url)
    console.log(`🟢 Connected to Mongo`)
  } catch (err) {
    console.error('🔴 Error connecting to MongoDB:', err);
  }
}

db()

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="w-screen h-screen">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
