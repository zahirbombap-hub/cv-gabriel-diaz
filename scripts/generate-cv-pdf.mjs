import { writeFileSync, readFileSync } from 'fs';
import puppeteer from 'puppeteer';

async function main() {
  const htmlPath = 'public/cv-gabriel-diaz-es.html';
  const pdfPath = 'public/cv-gabriel-diaz-es.pdf';

  const html = readFileSync(htmlPath, 'utf-8');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    printBackground: true,
  });

  await browser.close();
  console.log('PDF generado:', pdfPath);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
