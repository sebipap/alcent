import { ReactNode } from "react";
import { Button } from "./ui/button";

const QuickAction = ({
  children,
  emoji,
}: {
  children: ReactNode;
  emoji: string;
}) => {
  return (
    <Button className="h-16 justify-start bg-gray-900 p-0 hover:scale-[0.99]">
      <div className="mr-5 flex aspect-square h-[100%] items-center justify-center  rounded-md bg-gradient-to-tl from-slate-900 to-blue-900 text-3xl">
        {emoji}
      </div>
      {children}
    </Button>
  );
};

const QuickActions = () => {
  return (
    <div className="grid grid-cols-2 gap-1">
      <QuickAction emoji={"🛍️"}>Purchase</QuickAction>
      <QuickAction emoji={"➡️"}>Movement</QuickAction>
      <QuickAction emoji={"🤑"}>Income</QuickAction>
      <QuickAction emoji={"🫰"}>Lend or Borrow</QuickAction>
      <QuickAction emoji={"💹"}>Invest </QuickAction>
      <QuickAction emoji={"🔎"}>Search</QuickAction>
    </div>
  );
};

export default QuickActions;
