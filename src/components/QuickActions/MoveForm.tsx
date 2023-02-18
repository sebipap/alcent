import { useState } from "react";
import AccountInput from "../AccountInput";
import { Button } from "../ui/button";

const MoveForm = () => {
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex"></div>
      <div className="flex gap-[20px] ">
        <AccountInput value={fromAccountId} onChange={setFromAccountId} />
        <AccountInput value={toAccountId} onChange={setToAccountId} />
      </div>

      <Button>Submit</Button>
    </div>
  );
};

export default MoveForm;
