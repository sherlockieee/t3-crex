import React from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

export const SelectDropdown = ({
  value,
  onValueChange,
  valueList,
  placeholder,
  formatter = (value) => value,
}: {
  value: string | undefined;
  onValueChange: (value: string) => void;
  valueList: readonly string[];
  placeholder?: string;
  formatter?: (value: string) => string;
}) => {
  return (
    <Select.Root onValueChange={onValueChange} required value={value}>
      <Select.Trigger
        aria-label="College"
        className="inline-flex h-8 w-fit items-center justify-center gap-1 rounded bg-white px-2 leading-none text-primary shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-gray-100 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-primary"
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className=" rounded-md bg-white">
          <Select.ScrollUpButton className="flex h-4 cursor-default items-center justify-center bg-white text-primary">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport>
            {valueList.map((value, index) => (
              <Select.Item
                key={index}
                value={value}
                className="relative flex h-6 w-full select-none items-center rounded-sm pl-6 pr-8 text-sm leading-none text-primary data-[disabled]:pointer-events-none data-[highlighted]:bg-primary data-[highlighted]:text-secondary data-[highlighted]:outline-none"
              >
                <Select.ItemText>{formatter(value)}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-0 inline-flex w-8 items-center justify-center">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-4 cursor-default items-center justify-center bg-white text-primary">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
