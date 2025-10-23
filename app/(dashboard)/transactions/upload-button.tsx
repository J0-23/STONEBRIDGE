import { UploadIcon } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";

interface CSVUploadResult {
  data: string[][];
  errors: unknown[];
  meta: {
    delimiter: string;
    linebreak: string;
    fields?: string[];
  };
}

interface CSVReaderRenderProps {
  getRootProps: () => React.HTMLAttributes<HTMLDivElement>;
  acceptedFile?: File | null;
}

type Props = {
  onUpload: (results: CSVUploadResult) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader
      config={{
        skipEmptyLines: true,
        delimiter: ",",
        quoteChar: '"',
        transformHeader: (h: string) => h.trim(),
        transform: (v: string) => v.trim(),
        dynamicTyping: false,
      }}
      onUploadAccepted={onUpload}
    >
      {({ getRootProps }: CSVReaderRenderProps) => (
        <div {...getRootProps()}>
          <Button size="sm" className="w-full lg:w-auto" type="button">
            <UploadIcon className="size-4 mr-2" />
            Import
          </Button>
        </div>
      )}
    </CSVReader>
  );
};
