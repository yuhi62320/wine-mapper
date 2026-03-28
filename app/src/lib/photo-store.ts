const STORAGE_PREFIX = "wine-photo:";

/**
 * Resize an image data URL using an offscreen canvas.
 * Returns a JPEG data URL with quality 0.7.
 * If the image is already smaller than maxWidth, returns as-is.
 */
export function resizeImage(
  dataUrl: string,
  maxWidth: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      if (img.width <= maxWidth) {
        resolve(dataUrl);
        return;
      }

      const scale = maxWidth / img.width;
      const width = maxWidth;
      const height = Math.round(img.height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = dataUrl;
  });
}

/**
 * Resize a wine photo to max 800px width and store it in localStorage.
 * Returns false if a QuotaExceededError occurs.
 */
export async function saveWinePhoto(
  wineId: string,
  dataUrl: string
): Promise<boolean> {
  try {
    const resized = await resizeImage(dataUrl, 800);
    localStorage.setItem(`${STORAGE_PREFIX}${wineId}`, resized);
    return true;
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === "QuotaExceededError"
    ) {
      return false;
    }
    throw error;
  }
}

/**
 * Retrieve a wine photo from localStorage.
 */
export function getWinePhoto(wineId: string): string | null {
  return localStorage.getItem(`${STORAGE_PREFIX}${wineId}`);
}

/**
 * Remove a wine photo from localStorage.
 */
export function deleteWinePhoto(wineId: string): void {
  localStorage.removeItem(`${STORAGE_PREFIX}${wineId}`);
}
