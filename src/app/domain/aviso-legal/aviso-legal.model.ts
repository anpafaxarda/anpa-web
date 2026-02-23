export interface AvisoLegalData {
  title: string;
  datosIdentificativos: {
    name: string;
    nif: string;
    domicilio: string;
    email: string;
  };
  contenido: any[];
}
