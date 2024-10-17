import { PDFDocument } from 'pdf-lib';

export async function getPDFFromImages(compressedImages: File[]): Promise<File> {
  const pdfDoc = await PDFDocument.create();

  for (const image of compressedImages.reverse()) {
    const imgBuffer = await image.arrayBuffer();
    
    const img = await pdfDoc.embedJpg(imgBuffer); // You can use embedPng for PNGs
    const page = pdfDoc.addPage([img.width, img.height]);

    page.drawImage(img, {
      x: 0,
      y: 0,
      width: img.width,
      height: img.height,
    });
  }

  const pdfBytes = await pdfDoc.save();

  const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
  const pdfName = 'pdf-' + Date.now() + '.pdf';

  // Create a File object from the Blob
  return new File([pdfBlob], pdfName, { type: 'application/pdf' });
}
