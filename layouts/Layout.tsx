import Provider from "@/app/Provider";
import Header from "@/components/Header/Header";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Provider>
                <Header />
                <main>{children}</main>
                <h1>Footer</h1>
            </Provider>
        </>
    )
}