import { type NextPage } from "next";
import Head from "next/head";

import Navbar from "@/components/NavBar";
import QuickActions from "@/components/QuickActions";
import { Button } from "@/components/ui/button";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Alcent</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-[100%] flex-col items-center justify-around px-4 py-6">
        <div className="w-[100%] max-w-[1000px]">
          <Navbar />
          <div className="flex gap-2 py-4">
            <Button className="rounded-full">Register </Button>
            <Button className="rounded-full">Review </Button>
          </div>
          <QuickActions />
        </div>
      </div>
    </>
  );
};

export default Home;
