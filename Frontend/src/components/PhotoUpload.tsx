import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useImageUpload } from "@/components/hooks/use-image-upload"
import { ImagePlus, X, Upload, Trash2 } from "lucide-react"
import Image from "next/image"
import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import { Loader } from "@/components/ui/loader";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "@/components/ui/toast-1" 

interface childProps{
  urls: string[];
  setUrls: Dispatch<SetStateAction<string[]>>; 
}

export default function PhotoUpload({ urls, setUrls}:childProps) {
    const { showToast } = useToast()
    const[isUploading,setIsUploading] = useState(false)
  const uploadImage = async (file: File) => {
    setIsUploading(true)
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
    if (!res.ok) {
        showToast("Upload failed ❌", "error", "bottom-right") 
        throw new Error("Upload failed")
        setIsUploading(false)
      }
  const data = await res.json();
  console.log(data)
  console.log(data.secure_url);
  setIsUploading(false)
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
    <>
    <div className={`w-[40%] space-y-6 rounded-xl border border-border bg-card overflow-auto p-6 shadow-sm ${isUploading ? 'opacity-50 pointer-events-none blur-sm' : ''}`}>
      <h3 className="text-xl font-medium">Uploaded Images</h3>

  <div className="w-full space-y-6 bg-card p-6 ">
    {urls.length === 0 && (
      <p className="text-sm text-muted-foreground">No images uploaded yet</p>
    )}

    <div className="flex flex-col gap-2 h-full w-full ">
      {urls.map((url, index) => (
        <div
          key={index}
          className="flex items-center gap-2  p-2 rounded"
        >
          {/* Image preview */}
          <div className="w-full h-60 relative rounded overflow-hidden">
            <Image
              src={url}
              alt={`Uploaded ${index}`}
              fill
              className="object-cover "
            />
          </div>

          {/* Optional URL as text */}
          {/* <span className="truncate">{url}</span> */}

          {/* Delete button */}
          <button
            onClick={() => setUrls(prev => prev.filter(u => u !== url))}
            className="ml-auto rounded-full p-1 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  </div>
</div>

    <div className={`w-[40%]  space-y-6  rounded-xl border border-border bg-card p-6 shadow-sm `}>
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
          {/* {fileName && (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="truncate">{fileName}</span>
              <button
                onClick={handleRemove}
                className="ml-auto rounded-full p-1 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )} */}
        </div>
      )}
    </div>
    {isUploading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80">
         <Loader variant="circular" />
          <p className="mt-4 text-lg font-semibold text-gray-700">Uploading Image...</p>
        </div>
      )}
    </>
  )
}
