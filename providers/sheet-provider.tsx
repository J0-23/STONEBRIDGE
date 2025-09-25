"use client";

import { NewAccountSheet } from "@/features/accounts/components/new-accout-sheet";
import { EditAccountSheet } from "@/features/accounts/components/edit-accout-sheet";

import { NewCategorySheet } from "@/features/categories/components/new-category-sheet";
import { EditCategorySheet } from "@/features/categories/components/edit-category-sheet";

export const SheetProvider = () => {
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />

      <NewCategorySheet />
      <EditCategorySheet />
    </>
  );
};
