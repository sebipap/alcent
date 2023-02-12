import { Entity } from "@prisma/client";

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
  onChange: (e: { target: { value: string; name: string } }) => void;
}) => {
  const x: any = api.entity.getAll.useQuery();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const entities = x.data as Entity[] | undefined;

  const [createMode, setCreateMode] = useState(false);
  const [newEntityName, setNewEntityName] = useState("");

  const { mutate: createEntity } = api.entity.post.useMutation();

  const handleChange = (value: string) => {
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
      <div className="flex gap-3">
        <Button
          onClick={() => {
            setCreateMode(false);
          }}
        >
          <ArrowLeftIcon />
        </Button>
        <Input
          value={newEntityName}
          onChange={(e) => setNewEntityName(e.target.value)}
        />
        <Button
          onClick={() => {
            createEntity({
              name: newEntityName,
            });
            setCreateMode(false);
          }}
        >
          <PlusIcon />
        </Button>
      </div>
    );
  }

  return (
    <Select onValueChange={handleChange} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {entities?.map((entity) => (
          <SelectItem key={entity.id} value={entity.id}>
            {entity.name}
          </SelectItem>
        ))}
        <SelectSeparator />

        <SelectItem key={"new"} value={"new"}>
          <PlusIcon />
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default EntityInput;
