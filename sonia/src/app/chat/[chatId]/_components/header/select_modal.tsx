"use client";

import { LLMApi } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ChevronDown, Sparkle } from "lucide-react";
import { useEffect, useState } from "react";

type SelectModalProps = {
  getDefaultApiConfigAction: () => Promise<{ llmApi: LLMApi } | null>;
  setDefaultLlmApiAction: (apiId: string) => Promise<void>;
  apis: LLMApi[];
};

export const SelectModal = ({
  getDefaultApiConfigAction,
  setDefaultLlmApiAction,
  apis,
}: SelectModalProps) => {
  const [config, setConfig] = useState<{ llmApi: LLMApi } | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getDefaultApiConfigAction().then((config) => {
      setConfig(config);
    });
  }, [getDefaultApiConfigAction]);

  const handleSetLlmApi = async (api: LLMApi) => {
    await setDefaultLlmApiAction(api.id);
    setConfig({ llmApi: api });
  };

  return (
    <Popover open={isOpen}>
      <PopoverTrigger
        className="flex w-[200px] rounded-md bg-[#21201C] p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Sparkle />
        <div className="w-2" />
        <p className="w-full text-left truncate">
          {config != null ? config.llmApi.name : "Loading ..."}
        </p>
        <ChevronDown />
      </PopoverTrigger>
      <PopoverContent className="bg-[#21201C] p-4 w-[200px] z-50">
        {apis.map((api) => (
          <div
            key={api.id}
            className="flex p-1 m-1 cursor-pointer"
            onClick={() => {
              handleSetLlmApi(api);
              setIsOpen(false);
            }}
          >
            <Sparkle />
            <div className="w-2" />
            <p>{api.name}</p>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
