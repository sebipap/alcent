import { api } from "../utils/api";
import type { Entity, FinanceAccount, Unit } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type FullFinanceAccount = FinanceAccount & {
  Unit: Unit;
  Entity: Entity;
};

const AccountInput = ({
  value,
  onChange,
}: {
  value: FinanceAccount["id"];
  onChange: (value: FinanceAccount["id"]) => void;
}) => {
  const x: any = api.financeAccount.getAll.useQuery();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log(x.data);
  const financeAccounts = x.data as FullFinanceAccount[];

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="flex-1">
        <SelectValue placeholder="Unit" />
      </SelectTrigger>
      <SelectContent>
        {financeAccounts?.map((account) => (
          <SelectItem layoutId={account.id} value={account.id}>
            {account.Entity.name} {account.Unit.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AccountInput;
