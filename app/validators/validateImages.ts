import { uploadActionStates } from "app/actions/actionStates";

export function validateImages(imageURLs: string[]) : keyof typeof uploadActionStates  | null {
  if (!imageURLs || imageURLs.length === 0) {
    return "invalidNumberofImages";
  }

  if (imageURLs.length > 5) {
    return "invalidNumberofImages";
  }
  return null;
}
