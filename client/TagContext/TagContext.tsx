// TagContext.tsx
"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type TagContextType = {
  tagVal: string;
  setTagVal: (tag: string) => void;
};

const TagContext = createContext<TagContextType | undefined>(undefined);

export const TagProvider = ({ children }: { children: ReactNode }) => {
  const [tagVal, setTagVal] = useState("");

  return (
    <TagContext.Provider value={{ tagVal, setTagVal }}>
      {children}
    </TagContext.Provider>
  );
};

export const useTag = () => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTag must be used within a TagProvider");
  }
  return context;
};
