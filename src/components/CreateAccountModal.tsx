import { Input } from "@/components/ui/input";
import { api } from "../utils/api";
import {
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "src/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Entity, FinanceAccount } from "@prisma/client";
import { useState } from "react";
import EntityInput from "./EntityInput";
import UnitInput from "./UnitInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { AccountCard } from "./AccountCards";

type CreateAccountValues = Omit<
  FinanceAccount,
  "id" | "createdAt" | "updatedAt" | "userId"
>;

export const CreateAccountModal = () => {
  const [open, setOpen] = useState(false);

  const utils = api.useContext();

  const { mutate: createAccount, isLoading } =
    api.financeAccount.post.useMutation({
      onSuccess: () => closeModal(),
    });

  // const randomHexColor = `#${Math.floor(Math.random() * 16777215).toString(
  //   16
  // )}`;

  const [formValues, setFormValues] = useState<CreateAccountValues>({
    unitId: "",
    type: "asset",
    entityId: "",
  });

  const handleInputChange = (e: {
    target: { name: string; value: string | null };
  }) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    createAccount(formValues);
  };

  const x = api.unit.getOne.useQuery({ id: formValues.unitId });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const unit = (x as any).data;

  const y = api.entity.getOne.useQuery({ id: formValues.entityId });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const entity = (y as any).data;

  return (
    <>
      <Dialog open={open} onOpenChange={(x) => setOpen(x)}>
        <DialogTrigger>
          <Button>+</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create an account</DialogTitle>
            <DialogDescription>
              An account can be an asset, liability, equity, income, or expense.
              <div className="flex gap-6">
                <div>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange({
                        target: { name: "type", value },
                      })
                    }
                    value={formValues.type}
                  >
                    <label className="text-sm">Type</label>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"asset"}>Asset</SelectItem>
                      <SelectItem value={"liability"}>Liability</SelectItem>
                      <SelectItem value={"income"}>Income</SelectItem>
                      <SelectItem value={"expense"}>Expense</SelectItem>
                    </SelectContent>
                  </Select>

                  <EntityInput
                    value={formValues.entityId}
                    onChange={handleInputChange}
                  />

                  <UnitInput
                    value={formValues.unitId}
                    onChange={handleInputChange}
                  />
                </div>

                <AccountCard
                  layoutId="account-card"
                  onClick={() => void 0}
                  account={{
                    id: "1",
                    type: formValues.type,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: "1",
                    entityId: "",
                    unitId: "",
                    Entity:
                      entity ||
                      ({
                        id: formValues.entityId,
                        name: "Entity Name",
                        color: "#000000",
                      } as Entity),

                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    Unit: unit || {
                      id: formValues.unitId,
                      name: "X",
                      color: "#000000",
                    },
                  }}
                />
              </div>
              <Button disabled={isLoading} onClick={handleSubmit}>
                Submit
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
