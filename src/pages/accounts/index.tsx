import type { NextPage } from "next";
import { api } from "../../utils/api";
import Head from "next/head";
import type { FinanceAccount } from "@prisma/client";
import { CreateAccountModal } from "../../components/CreateAccountModal";
import { useState } from "react";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/contextMenu";

const AccountCard = ({
  account,
  onClick,
  className,
  width,
}: {
  account: FinanceAccount;
  className?: string;
  onClick: () => void;
  width?: string;
}) => {
  const { color, name, id } = account;

  const { mutate: deleteAccount } = api.financeAccount.delete.useMutation();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <motion.div
          key={id}
          onClick={onClick}
          style={{
            backgroundColor: color,
            width,
          }}
          className={`mb-[-100px] h-[200px] w-[320px]  rounded-lg  bg-white p-4 shadow-lg  ${
            className || ""
          }`}
          layout
          layoutId={id}
        >
          <h3 className="text-xl font-bold text-white">{name}</h3>
        </motion.div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => deleteAccount(id)}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

const Accounts: NextPage = () => {
  const x: any = api.financeAccount.getAll.useQuery();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const financeAccounts = x.data as FinanceAccount[];

  const [activeAccountIndex, setActiveAccountIndex] = useState(0);
  const [selectMode, setSelectMode] = useState(true);

  const activeAccount =
    financeAccounts?.length > 0
      ? financeAccounts[activeAccountIndex]
      : undefined;

  const handleCardStackCardClick = (index: number) => {
    if (selectMode) {
      setActiveAccountIndex(index);
      setSelectMode(false);
      return;
    }

    setSelectMode(true);
  };

  const cardStackClassName = selectMode
    ? "flex flex-row w-[1000px] flex-wrap"
    : "flex flex-col items-center justify-center  ";

  return (
    <>
      <Head>
        <title>Alcent - accounts</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex  min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <CreateAccountModal />

        {selectMode === false && activeAccount && (
          <AccountCard
            account={activeAccount}
            onClick={() => {
              return;
            }}
            className="mb-6 scale-[150]"
          />
        )}

        <div className={cardStackClassName}>
          {financeAccounts?.map((account, index) => {
            if (index === activeAccountIndex && !selectMode) return null;

            return (
              <AccountCard
                key={account.id}
                account={account}
                onClick={() => handleCardStackCardClick(index)}
                className={selectMode ? "mb-[10px] mr-[10px]" : "mb-[-190px]"}
                width={`${(selectMode ? 0 : index * 3) + 320}px`}
              />
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Accounts;
