import type { Entity } from "@prisma/client";

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

const EntityInput = ({
  value,
  onChange,
}: {
  value: Entity["id"];
  onChange: (e: { target: { value: string | null; name: string } }) => void;
}) => {
  const x: any = api.entity.getAll.useQuery();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const entities = x.data as Entity[] | undefined;

  const [createMode, setCreateMode] = useState(false);
  const [newEntityName, setNewEntityName] = useState("");
  const [newEntityColor, setNewEntityColor] = useState("");
  const [newEntityLogoImageUrl, setNewEntityLogoImageUrl] = useState("");

  const utils = api.useContext();

  const { mutate: createEntity } = api.entity.post.useMutation({
    onSuccess(newEntity) {
      handleChange(newEntity.id);
      setCreateMode(false);
    },
    async onMutate(newEntity) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.entity.getAll.cancel();

      // Get the data from the queryCache
      const prevData = utils.entity.getAll.getData();

      // Optimistically update the data with our new post
      utils.entity.getAll.setData(undefined, (old) =>
        old
          ? [
              ...old,
              {
                ...newEntity,
                id: "temp",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ]
          : [
              {
                ...newEntity,
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
      utils.entity.getAll.setData(undefined, ctx?.prevData);
    },
    async onSettled() {
      // Sync with server once mutation has settled
      await utils.entity.getAll.invalidate();
    },
  });

  const handleChange = (value: string | null) => {
    if (value === "new") {
      setCreateMode(true);
    }

    onChange({
      target: {
        value,
        name: "entityId",
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
          <h1 className="text-base">Create Entity</h1>
        </div>
        <div className="flex gap-3">
          <Input
            value={newEntityName}
            onChange={(e) => setNewEntityName(e.target.value)}
            placeholder="Entity name"
          />
          <Input
            value={newEntityColor}
            onChange={(e) => setNewEntityColor(e.target.value)}
            placeholder="Entity color"
            type="color"
          />

          <Input
            value={newEntityLogoImageUrl}
            onChange={(e) => setNewEntityLogoImageUrl(e.target.value)}
            placeholder="logo"
            type="text"
          />

          <Button
            onClick={() => {
              createEntity({
                name: newEntityName,
                color: newEntityColor,
                logoImageUrl: newEntityLogoImageUrl,
              });
            }}
          >
            <PlusIcon />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Select onValueChange={handleChange} value={value}>
      <label className="text-sm">Entity</label>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Entity" />
      </SelectTrigger>
      <SelectContent>
        {entities?.map((entity) => (
          <SelectItem layoutId={entity.id} value={entity.id}>
            {entity.name}
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

export default EntityInput;
