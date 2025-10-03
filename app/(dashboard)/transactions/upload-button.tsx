import { Upload, UploadIcon } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";

type Props = {
  onUpload: (results: any) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();

  // TODO: Add a paywall

  return (
    <CSVReader
      config={{
        skipEmptyLines: true,
        delimiter: ",", // still comma-separated
        quoteChar: '"', // handle quoted fields
        transformHeader: (h: string) => h.trim(),
        transform: (v: string) => v.trim(),
        dynamicTyping: false, // keep all as string; numeric parsing is tricky with commas
      }}
      onUploadAccepted={onUpload}
    >
      {({ getRootProps }: any) => (
        <Button size="sm" className="w-full lg:w-auto" {...getRootProps()}>
          <UploadIcon className="size-4 mr-2" />
          Import
        </Button>
      )}
    </CSVReader>
  );
};
