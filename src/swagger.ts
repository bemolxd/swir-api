import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('System Wypożyczeń i Rezerwacji - Katedra Systemów Multimedialnych')
  .setDescription(
    `Usługa API dla Systemu Wypożyczeń i Rezerwacji opracowanego w ramach pracy dyplomowej pt. "Opracowanie serwisu do rezerwacji i wypożyczeń sprzętu w Katedrze Systemów Multimedialnych".\n\nAutor: Bartosz Bem [(bemolx)](https://github.com/bemolxd)\n\n${new Date().getFullYear()} &copy; [Multimed](https://multimed.org)`,
  )
  .setVersion('0.1.1-rc2')
  .build();

export const customOptions: SwaggerCustomOptions = {
  customSiteTitle: 'SWiR API Docs',
  swaggerOptions: {
    supportedSubmitMethods: [],
  },
};
