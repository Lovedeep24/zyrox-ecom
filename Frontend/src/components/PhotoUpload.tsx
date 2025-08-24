import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useImageUpload } from "@/components/hooks/use-image-upload"
import { ImagePlus, X, Upload, Trash2 } from "lucide-react"
import Image from "next/image"
import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import  { ProductInfo } from "@/components/AddProduct"

interface childProps{
  product: ProductInfo
}

export default function PhotoUpload({product}:childProps) {
  const [urls,setUrls]=useState<string[]>([]);
  const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "zyrox_product");
  for(const[key,value] of formData.entries())
  {
    console.log(key,value)
  }
  const res = await fetch(`https://api.cloudinary.com/v1_1/dswots3tx/image/upload`, {
    method: "POST",
    body: formData,
  });
  
  const data = await res.json();
  console.log(data)
  console.log(data.secure_url);
  return data.secure_url;
};

const {
  previewUrl,
  fileName,
  fileInputRef,
  handleThumbnailClick,
  handleFileChange,
  handleRemove,
} = useImageUpload({
onUpload: async (file) => {
  try {
    const url = await uploadImage(file);
      setUrls(prevUrl =>[...prevUrl,url]);
    console.log("Uploaded to Cloudinary:", url);
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
  }
 },
});


  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      
       const files = Array.from(e.dataTransfer.files).filter(file =>
    file.type.startsWith("image/")
  )
  if (files.length) handleFileChange(files)
    },
    [handleFileChange],
  )

  return (
    <div className="w-[40%]  space-y-6  rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="space-y-2">
        <h3 className="text-xl font-medium">Image Upload</h3>
        <p className="text-md text-muted-foreground">
          Supported formats: JPG, PNG
        </p>
      </div>

      <Input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
      onChange={(e) => e.target.files && handleFileChange(Array.from(e.target.files))}
      />

      {!previewUrl ? (
        <div
          onClick={handleThumbnailClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex h-64 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted",
            isDragging && "border-primary/50 bg-primary/5",
          )}
        >
          <div className="rounded-full bg-background p-3 shadow-sm">
            <ImagePlus className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-md font-medium">Click to select</p>
            <p className="text-sm text-muted-foreground">
              or drag and drop file here
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="group relative h-64 overflow-hidden rounded-lg border">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleThumbnailClick}
                className="h-9 w-9 p-0"
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleRemove}
                className="h-9 w-9 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {fileName && (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="truncate">{fileName}</span>
              <button
                onClick={handleRemove}
                className="ml-auto rounded-full p-1 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
