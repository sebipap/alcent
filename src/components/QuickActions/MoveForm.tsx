import { Button } from "../ui/button";
import { Input } from "../ui/input";

const MoveForm = () => {
  return (
    <div className="flex flex-col gap-6">
      <Input />
      <Input />

      <Button>Submit</Button>
    </div>
  );
};

export default MoveForm;
