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
import type { FinanceAccount } from "@prisma/client";
import { useState } from "react";
import EntityInput from "./EntityInput";

type CreateAccountValues = Omit<
  FinanceAccount,
  "id" | "createdAt" | "updatedAt" | "userId"
>;

export const CreateAccountModal = () => {
  const [open, setOpen] = useState(false);

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
    target: { name: string; value: string };
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
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label htmlFor="name-2">Account Name</label>
                <Input
                  type="text"
                  id="unitId"
                  name="unitId"
                  value={formValues.unitId}
                  placeholder="Unit ID"
                  onChange={handleInputChange}
                />

                <EntityInput
                  value={formValues.entityId}
                  onChange={handleInputChange}
                />

                <Input
                  type="text"
                  id="type"
                  name="type"
                  value={formValues.type}
                  placeholder="Type"
                  onChange={handleInputChange}
                />

                <p className="text-sm text-slate-500">Account name.</p>

                <Button disabled={isLoading} onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
