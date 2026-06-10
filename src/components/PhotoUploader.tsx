import { useRef } from 'react';
import { Upload, ImagePlus } from 'lucide-react';

const MAX_PHOTOS = 8;

interface PhotoUploaderProps {
  photos: (string | null)[];
  onPhotosChange: (photos: (string | null)[]) => void;
  compact?: boolean;
}

export function PhotoUploader({ photos, onPhotosChange, compact = false }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const current = [...photos];
    const emptySlots = current.map((p, i) => (p === null ? i : -1)).filter((i) => i >= 0);
    let slotIndex = 0;

    Array.from(files).forEach((file) => {
      if (slotIndex >= emptySlots.length) return;
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      const slot = emptySlots[slotIndex++];
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        current[slot] = dataUrl;
        onPhotosChange([...current]);
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadedCount = photos.filter(Boolean).length;

  if (compact) {
    return (
      <>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploadedCount >= MAX_PHOTOS}
          className="flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-black/50 transition-all disabled:opacity-40"
        >
          <ImagePlus size={16} />
          사진 추가 ({uploadedCount}/{MAX_PHOTOS})
        </button>
      </>
    );
  }

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploadedCount >= MAX_PHOTOS}
        className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gold/40 rounded-xl py-6 text-muted-foreground hover:border-gold hover:text-gold transition-all disabled:opacity-40 group"
      >
        <Upload size={24} className="group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium">사진 업로드 ({uploadedCount}/{MAX_PHOTOS})</span>
        <span className="text-xs opacity-60">최대 8장 · JPG, PNG, WEBP</span>
      </button>

      {uploadedCount > 0 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {photos.map((photo, i) =>
            photo ? (
              <div key={i} className="relative aspect-[3/4] rounded-lg overflow-hidden group">
                <img src={photo} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => {
                    const next = [...photos];
                    next[i] = null;
                    onPhotosChange(next);
                  }}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs"
                >
                  삭제
                </button>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
