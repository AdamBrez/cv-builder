import React, { ReactElement } from 'react';
import { renderToFile, DocumentProps } from '@react-pdf/renderer';
import { ModernTemplate } from '../templates/ModernTemplate';
import { Persona } from '../types/schema';

export async function generatePdf(persona: Persona, outputPath: string) {
  console.log(`Compiling PDF to ${outputPath}...`);

  const element = React.createElement(ModernTemplate, { persona }) as unknown as ReactElement<DocumentProps>;

  await renderToFile(element, outputPath);
}
