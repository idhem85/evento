import React, { useCallback, useState } from "react";
import { Camera, Upload, X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoUploadProps {
  value: string | null;
  onChange: (value: string | null) => void;
  label: string;
  hint?: string;
  variant?: "circle" | "rectangle";
  aspectRatio?: string;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  value,
  onChange,
  label,
  hint,
  variant = "circle",
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onloadend = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium flex items-center gap-1.5 text-foreground">
        <Camera className="h-3.5 w-3.5 text-muted-foreground" />
        {label}
      </p>

      {value ? (
        <div className="relative group">
          <div className={cn(
            "overflow-hidden border-2 border-primary/20",
            variant === "circle" ? "w-28 h-28 rounded-full mx-auto" : "w-full h-40 rounded-lg"
          )}>
            <img src={value} alt="Upload" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">              <button
                type="button"
                onClick={(e) => { e.preventDefault(); onChange(null); }}
                className="bg-destructive/90 text-destructive-foreground rounded-full p-1.5 shadow-lg hover:bg-destructive transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
          </div>
          {variant === "circle" && (
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 shadow">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center gap-2 p-6 border-2 border-dashed rounded-xl transition-all cursor-pointer",
            "hover:border-primary/50 hover:bg-muted/30",
            dragOver ? "border-primary bg-primary/5 scale-[1.02]" : "border-muted-foreground/20"
          )}
        >
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <Upload className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {hint || "Cliquez ou glissez une photo"}
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};
