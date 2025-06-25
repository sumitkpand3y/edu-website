import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export interface CertificateData {
  studentName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
}

export const generateCertificate = async (data: CertificateData): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  const { width, height } = page.getSize();
  
  // Certificate border
  page.drawRectangle({
    x: 50,
    y: 50,
    width: width - 100,
    height: height - 100,
    borderColor: rgb(0.2, 0.4, 0.8),
    borderWidth: 3,
  });
  
  // Certificate title
  page.drawText('CERTIFICATE OF COMPLETION', {
    x: width / 2 - 150,
    y: height - 150,
    size: 24,
    font: boldFont,
    color: rgb(0.2, 0.4, 0.8),
  });
  
  // Student name
  page.drawText(`This is to certify that`, {
    x: width / 2 - 80,
    y: height - 250,
    size: 14,
    font: font,
  });
  
  page.drawText(data.studentName, {
    x: width / 2 - (data.studentName.length * 6),
    y: height - 300,
    size: 20,
    font: boldFont,
    color: rgb(0.2, 0.4, 0.8),
  });
  
  // Course completion text
  page.drawText(`has successfully completed the course`, {
    x: width / 2 - 120,
    y: height - 350,
    size: 14,
    font: font,
  });
  
  page.drawText(data.courseName, {
    x: width / 2 - (data.courseName.length * 5),
    y: height - 400,
    size: 18,
    font: boldFont,
  });
  
  // Date and certificate ID
  page.drawText(`Date: ${data.completionDate}`, {
    x: 100,
    y: 150,
    size: 12,
    font: font,
  });
  
  page.drawText(`Certificate ID: ${data.certificateId}`, {
    x: width - 250,
    y: 150,
    size: 12,
    font: font,
  });
  
  return pdfDoc.save();
};