import type { NextPage } from "next";
import { api } from "../utils/api";
import type { Entity, FinanceAccount, Unit } from "@prisma/client";
import { CreateAccountModal } from "./CreateAccountModal";
import { useState } from "react";

import { motion } from "framer-motion";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/contextMenu";

type FullFinanceAccount = FinanceAccount & {
  Unit: Unit;
  Entity: Entity;
};

export const AccountCard = ({
  account,
  onClick,
  className,
  layoutId,
}: {
  account: FullFinanceAccount;
  className?: string;
  onClick: () => void;
  layoutId: string;
}) => {
  const {
    id,
    Entity: { name: entityName, color },
    Unit: { name: unitName },
  } = account;

  const { mutate: deleteAccount } = api.financeAccount.delete.useMutation();

  const redHex = color.slice(1, 3);
  const greenHex = color.slice(3, 5);
  const blueHex = color.slice(5, 7);

  const redValue = parseInt(redHex, 16);
  const greenValue = parseInt(greenHex, 16);
  const blueValue = parseInt(blueHex, 16);

  const darkenedRed = Math.floor(redValue * 0.6);
  const darkenedGreen = Math.floor(greenValue * 0.6);
  const darkenedBlue = Math.floor(blueValue * 0.6);

  const darkenedColor = `#${darkenedRed.toString(16)}${darkenedGreen.toString(
    16
  )}${darkenedBlue.toString(16)}`;

  const contrastedColor =
    redValue + greenValue + blueValue > 382 ? "#000000" : "#ffffff";

  const label = `${entityName} ${unitName}`;
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <motion.div
          onClick={onClick}
          className={`mb-[-100px] flex h-[160px] w-[252.8px] flex-col rounded-lg bg-slate-900 p-4 shadow-lg ${
            className || ""
          }`}
          layout
          layoutId={`${layoutId}-${id}`}
          style={{
            backgroundColor: color,
            border: `1px solid ${darkenedColor}`,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <h3
            className="text-md font-semibold "
            style={{ color: contrastedColor }}
          >
            {label}
          </h3>
          <div className="mt-auto flex">
            <h3
              className="text-xs font-semibold"
              style={{ color: contrastedColor }}
            >
              ···· 9482
            </h3>
            <img
              className="ml-auto w-16"
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/2880px-Visa_2021.svg.png"
              }
            ></img>
          </div>
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

const AccountInput = ({
  value,
  onChange,
  layoutId,
}: {
  value: FinanceAccount["id"];
  onChange: (value: FinanceAccount["id"]) => void;
  layoutId: string;
}) => {
  const x: any = api.financeAccount.getAll.useQuery();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log(x.data);
  const financeAccounts = x.data as FullFinanceAccount[];

  const [selectMode, setSelectMode] = useState(true);

  const activeAccount =
    financeAccounts?.length > 0
      ? financeAccounts.find((account) => account.id === value)
      : undefined;

  const handleCardStackCardClick = (accountId: FinanceAccount["id"]) => {
    if (selectMode) {
      onChange(accountId);
      setSelectMode(false);
      return;
    }

    setSelectMode(true);
  };

  const cardStackClassName = selectMode
    ? "flex flex-col"
    : "flex flex-col items-center justify-center";

  return (
    <div className="flex h-[100px] flex-col items-center justify-center">
      <div className="absolute right-0 top-0">
        <CreateAccountModal />
      </div>

      {selectMode === false ? (
        activeAccount && (
          <AccountCard
            layoutId={`${layoutId}${activeAccount.id}`}
            account={activeAccount}
            onClick={() => {
              setSelectMode(true);
            }}
            className="mb-20 scale-[150]"
          />
        )
      ) : (
        <div className={cardStackClassName}>
          {financeAccounts?.map((account) => {
            if (account.id === value && !selectMode) return null;

            return (
              <AccountCard
                key={account.id}
                layoutId={`${layoutId}${account.id}`}
                account={account}
                onClick={() => handleCardStackCardClick(account.id)}
                className={selectMode ? " mb-[-10px] " : "mb-[-60px]"}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AccountInput;
