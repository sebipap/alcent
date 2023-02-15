import type { Unit } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { api } from "../utils/api";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";

const UnitInput = ({
  value,
  onChange,
}: {
  value: Unit["id"];
  onChange: (e: { target: { value: string | null; name: string } }) => void;
}) => {
  const x: any = api.unit.getAll.useQuery();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const units = x.data as Unit[] | undefined;

  const [createMode, setCreateMode] = useState(false);
  const [newUnitName, setNewUnitName] = useState("");

  const utils = api.useContext();

  const { mutate: createUnit, isLoading } = api.unit.post.useMutation({
    onSuccess(newUnit) {
      handleChange(newUnit.id);
      setCreateMode(false);
    },
    async onMutate(newUnit) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.unit.getAll.cancel();

      // Get the data from the queryCache
      const prevData = utils.unit.getAll.getData();

      // Optimistically update the data with our new post
      utils.unit.getAll.setData(undefined, (old) =>
        old
          ? [
              ...old,
              {
                ...newUnit,
                id: "temp",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ]
          : [
              {
                ...newUnit,
                id: "temp",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ]
      );

      // Return the previous data so we can revert if something goes wrong
      return { prevData };
    },
    onError(err, newPost, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.unit.getAll.setData(undefined, ctx?.prevData);
    },
    async onSettled() {
      // Sync with server once mutation has settled
      await utils.unit.getAll.invalidate();
    },
  });

  const handleChange = (value: string | null) => {
    if (value === "new") {
      setCreateMode(true);
    }

    onChange({
      target: {
        value,
        name: "unitId",
      },
    });
  };

  if (createMode) {
    return (
      <div className="rounded-md border p-4">
        <div className={"mb-5 flex items-center gap-4"}>
          <ArrowLeftIcon
            onClick={() => {
              setCreateMode(false);
              handleChange(null);
            }}
          />
          <h1 className="text-base">Create Unit</h1>
        </div>
        <div className="flex gap-3">
          <Input
            value={newUnitName}
            onChange={(e) => setNewUnitName(e.target.value)}
            placeholder="Unit name"
          />
          <Button
            onClick={() => {
              createUnit({
                name: newUnitName,
              });
            }}
            disabled={isLoading}
          >
            <PlusIcon />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Select onValueChange={handleChange} value={value}>
      <label className="text-sm">Unit</label>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Unit" />
      </SelectTrigger>
      <SelectContent>
        {units?.map((unit) => (
          <SelectItem layoutId={unit.id} value={unit.id}>
            {unit.name}
          </SelectItem>
        ))}
        <SelectSeparator />

        <SelectItem layoutId={"new"} value={"new"}>
          <PlusIcon />
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UnitInput;
