import { BellAlertIcon } from "@heroicons/react/24/solid";
import React from "react";

function MessageAbsen({ text }: { text: string }) {
  return (
    <div className="w-full bg-green-900 text-center py-4 lg:px-4 dark:bg-dark-900 md:mt-0 lg:max-w-3xl xl:p-0">
      <div
        className="w-full p-3 bg-green-800 items-center text-green-100 leading-none lg:rounded-full flex lg:inline-flex"
        role="alert"
      >
        <span className="flex rounded-full bg-green-500 uppercase px-3 py-3 text-sm font-bold mr-3">
          <BellAlertIcon className="h-6 w-6 text-inherit" />
        </span>
        <span className="font-semibold mr-2 text-left flex-auto text-lg">
          {text}
        </span>
      </div>
    </div>
  );
}

export default MessageAbsen;
