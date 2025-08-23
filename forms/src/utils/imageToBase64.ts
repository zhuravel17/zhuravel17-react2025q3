export function imageToBase64(file: File | null): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
