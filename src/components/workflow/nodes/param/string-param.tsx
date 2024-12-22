"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/types/app-node-types";
import { useCallback, useEffect, useId, useState } from "react";

export default function StringParam({
  param,
  inputValue,
  updateNodeParamValue,
  disabled
}: ParamProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(inputValue);

  // Only update internal value when inputValue prop changes
  useEffect(() => {
    setInternalValue(inputValue);
  }, [inputValue]);

  const handleBlur = useCallback(() => {
    updateNodeParamValue(internalValue);
  }, [updateNodeParamValue, internalValue]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInternalValue(e.target.value);
  }, []);

  const Component = param.variant === "textarea" ? Textarea : Input;

  return (
    <div className="w-full space-y-1">
      <Label htmlFor={id} className="text-sm flex">
        {param.name}
        {param.required && <p className="px-1 text-red-400">*</p>}
      </Label>
      <Component
        disabled={disabled}
        value={internalValue}
        id={id}
        onBlur={handleBlur}
        placeholder="Enter input here"
        onChange={handleChange}
      />
      <p className="text-xs px-2 py-1 text-muted-foreground">
        {param.helperText}
      </p>
    </div>
  );
}
