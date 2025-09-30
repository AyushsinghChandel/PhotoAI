"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Backend_URL, CLOUDFARE_URL } from "@/app/config";
import JSZip from "jszip";

export default function Component({onUploadDone}: {
  onUploadDone: (zipUrl: string) => void;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center  border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg p-10 space-y-6">
        <CloudUploadIcon className="w-16 h-10 text-zinc-500 dark:text-zinc-400" />
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.multiple = true;
            input.onchange = async () => {
              const zip = new JSZip();
              if (input.files) {
                for (const file of input.files) {
                  const content = await file.arrayBuffer();
                  zip.file(file.name, content);
                }
                const blob = await zip.generateAsync({ type: 'blob' });
                const resp = await axios.post(`${Backend_URL}/upload-proxy?filename=models.zip`, blob, {
                  headers: { 'Content-Type': 'application/zip' }
                });
                console.log('proxy upload response', resp.data);
                onUploadDone(`${CLOUDFARE_URL}/${resp.data.key}`);
              }
            };
            input.click();
          }}
        >
          Select Files
        </Button>
      </CardContent>
    </Card>
  );
}

function CloudUploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}
