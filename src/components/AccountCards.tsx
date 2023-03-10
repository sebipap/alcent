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
    Entity: { name: entityName, color, logoImageUrl },
    Unit: { name: unitName },
  } = account;

  const { mutate: deleteAccount } = api.financeAccount.delete.useMutation();

  const redHex = color.slice(1, 3);
  const greenHex = color.slice(3, 5);
  const blueHex = color.slice(5, 7);

  const redValue = parseInt(redHex, 16);
  const greenValue = parseInt(greenHex, 16);
  const blueValue = parseInt(blueHex, 16);

  const darkenedRed = Math.floor(redValue * 0.9);
  const darkenedGreen = Math.floor(greenValue * 0.9);
  const darkenedBlue = Math.floor(blueValue * 0.9);

  const darkenedColor = `#${darkenedRed.toString(16)}${darkenedGreen.toString(
    16
  )}${darkenedBlue.toString(16)}`;

  const contrastedColor =
    redValue + greenValue + blueValue > 382 ? "#000000" : "#ffffff";

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <motion.div
          onClick={onClick}
          // add "gloss effect with overlay gradiend"
          className={`mb-[-100px] flex h-[160px] w-[252.8px] flex-col rounded-lg bg-slate-900 p-4 shadow-lg
           ${className || ""}
            
          `}
          layout
          layoutId={`${layoutId}-${id}`}
          style={{
            backgroundColor: color,
            border: `1px solid ${darkenedColor}`,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {logoImageUrl ? (
            <img
              className="max-h-[15%] object-scale-down object-left"
              src={logoImageUrl}
              alt={entityName}
            />
          ) : (
            <h3
              className="text-md font-semibold "
              style={{ color: contrastedColor }}
            >
              {entityName}
            </h3>
          )}

          <div className="mt-auto flex">
            <h3
              className="text-xs font-semibold"
              style={{ color: contrastedColor }}
            >
              {unitName} 32,000.00
            </h3>
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

const AccountCards = ({
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
              // eslint-disable-next-line react/jsx-key
              <AccountCard
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

export default AccountCards;
