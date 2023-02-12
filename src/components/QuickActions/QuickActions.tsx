import type { KeyboardEvent, ReactNode } from "react";
import { useState } from "react";
import { Button } from "../ui/button";

import MoveForm from "./MoveForm";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const QuickAction = ({
  name,
  emoji,
  children,
}: {
  name: string;
  emoji: string;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  // when esc key is pressed, close the modal
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape") {
      return;
    }
    void setOpen(false);
  };

  return (
    <div onKeyDown={handleKeyDown}>
      {open ? (
        <>
          <div
            className="backdrop absolute left-0 top-0 h-[100vh] w-[100vw] bg-black opacity-50"
            onClick={() => setOpen(false)}
          />
          <div
            className={
              "absolute left-0 top-0 flex h-[100vh] w-[100vw] justify-center sm:pt-5 md:pt-10 lg:pt-36"
            }
          >
            <motion.div
              layout
              layoutId={`${name}_container`}
              className="relative w-[600px] rounded-lg bg-gray-900"
            >
              <motion.div className="flex flex-col gap-6 rounded-lg bg-gradient-to-b from-blue-900  via-blue-900 to-transparent p-6 text-lg font-bold">
                <ArrowLeft
                  className="text-white"
                  onClick={() => setOpen(false)}
                />
                <div>
                  <motion.div className="mb-2 flex flex-row items-center ">
                    <div className="text-white">{name}</div>
                  </motion.div>

                  <div className="text-grey-50 text-sm font-normal text-gray-400">
                    Here is a description of what this action does. It is a
                  </div>
                </div>
                <motion.div className="absolute top-24 right-10 text-3xl">
                  {emoji}
                </motion.div>
              </motion.div>
              <div className="mt-5 p-6">{children}</div>
            </motion.div>
          </div>
        </>
      ) : (
        <QuickActionButton
          emoji={emoji}
          name={name}
          onClick={() => setOpen(true)}
        />
      )}
    </div>
  );
};

const QuickActionButton = ({
  name,
  emoji,
  onClick,
}: {
  name: string;
  emoji: string;
  onClick?: () => void;
}) => {
  return (
    <motion.div layout layoutId={`${name}_container`} onClick={onClick}>
      <Button className="h-16 w-[100%] justify-start bg-gray-900 p-0 hover:scale-[0.99] dark:bg-gray-900 dark:text-white">
        <motion.div className="mr-5 flex aspect-square h-[100%] items-center justify-center  rounded-md bg-gradient-to-tl from-slate-900 to-blue-900 text-3xl">
          <motion.div>{emoji}</motion.div>
        </motion.div>
        <motion.div>{name}</motion.div>
      </Button>
    </motion.div>
  );
};

const QuickActions = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <QuickAction emoji={"🛍️"} name={"Purchase"}>
        abc
      </QuickAction>
      <QuickAction emoji="➡️" name="Move">
        <MoveForm />
      </QuickAction>
      <QuickAction emoji={"🤑"} name={"Income"}>
        abc
      </QuickAction>
      <QuickAction emoji={"🫰"} name={"Lend or Borrow"}>
        abc
      </QuickAction>
      <QuickAction emoji={"💹"} name={"Invest "}>
        abc
      </QuickAction>
      <QuickAction emoji={"🔎"} name={"Search"}>
        abc
      </QuickAction>
    </div>
  );
};

export default QuickActions;
