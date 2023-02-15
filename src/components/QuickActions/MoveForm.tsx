import { useState } from "react";
import AccountInput from "../AccountInput";
import { Button } from "../ui/button";

const MoveForm = () => {
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex">
        <AccountInput
          onChange={setFromAccountId}
          value={fromAccountId}
          layoutId={"1"}
        />
        <AccountInput
          onChange={setToAccountId}
          value={toAccountId}
          layoutId={"2"}
        />
      </div>

      <Button>Submit</Button>
    </div>
  );
};

export default MoveForm;
