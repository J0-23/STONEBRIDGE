"use client";

import { NewAccountSheet } from "@/features/accounts/components/new-accout-sheet";
import { EditAccountSheet } from "@/features/accounts/components/edit-accout-sheet";

export const SheetProvider = () => {
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  );
};
