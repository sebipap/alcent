import type { NextPage } from "next";
import { api } from "../utils/api";
import type { FinanceAccount } from "@prisma/client";
import { CreateAccountModal } from "./CreateAccountModal";
import { useState } from "react";

import { motion } from "framer-motion";
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
}: {
  account: FinanceAccount;
  className?: string;
  onClick: () => void;
}) => {
  const { color, name, id } = account;

  const { mutate: deleteAccount } = api.financeAccount.delete.useMutation();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <motion.div
          key={id}
          onClick={onClick}
          className={`mb-[-100px] h-[200px] w-[316px]  rounded-lg  border bg-white p-4 shadow-lg ${
            className || ""
          }`}
          layout
          layoutId={id}
          style={{ borderColor: color }}
        >
          <h3 className="text-xl font-bold text-slate-700">{name}</h3>
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

const AccountCards: NextPage = () => {
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
    <div className="flex flex-col items-center justify-center ">
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default AccountCards;
