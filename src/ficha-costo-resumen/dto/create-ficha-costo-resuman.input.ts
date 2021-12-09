import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateFichaCostoResumenInput {
  @Field(() => Int,{nullable: true})
  idFicha?: number;

  @Field(() => Int)
  idCCosto: number;

  @Field(() => Int)
  idBaseCMarco: number;

  @Field(() => Int)
  idMoneda: number;

  @Field(() => Int)
  idFormaPago: number;

  @Field(() => Int)
  idIncoterm: number;

  @Field(() => Int)
  idPuerto: number;

  @Field(() => Int)
  idEmbalaje: number;

  @Field(() => Int)
  idProveedor: number;

  @Field()
  bl: string | null;

  @Field(() => Int)
  cantAnexos: number;

  @Field(() => Int)
  viaTransporte: string | null;

  @Field(() => Int)
  idPais: number;

  @Field()
  destino: string | null;

  @Field()
  contenedores: string | null;

  @Field(() => Float)
  pesoBruto: number | null;

  @Field(() => Float)
  pesoNeto: number | null;

  @Field(() => Float)
  cantidadEmbalaje: number | null;

  @Field(() => Float)
  cantidad: number | null;

  @Field()
  codigo: string | null;

  @Field()
  descripcion: string | null;

  @Field(() => Float)
  valorContratacion: number | null;

  @Field(() => Float)
  gastoAlmacenOrigen: number | null;

  @Field(() => Float)
  gastoTranspOrigen: number | null;

  @Field(() => Float)
  gastoAduanaOrigen: number | null;

  @Field(() => Float)
  gastoManipulacionOrigen: number | null;

  @Field(() => Float)
  otrosGastosOrigen: number | null;

  @Field(() => Float)
  totalGastoOrigen: number | null;

  @Field(() => Float)
  recargoContratacion: number | null;

  @Field(() => Float)
  descuentoContratacion: number | null;

  @Field(() => Float)
  totalRecDescContrato: number | null;

  @Field(() => Float)
  totalAdquisicion: number | null;

  @Field(() => Float)
  difCambioMoneda: number | null;

  @Field(() => Float)
  tasaCambioContratacion: number | null;

  @Field(() => Float)
  valorMercancia: number | null;

  @Field(() => Float)
  tarifaFlete: number | null;

  @Field(() => Float)
  recargoFlete: number | null;

  @Field(() => Float)
  descuentoFlete: number | null;

  @Field(() => Float)
  totalFlete: number | null;

  @Field(() => Float)
  costoFleteUsd: number | null;

  @Field(() => Float)
  seguro: number | null;

  @Field(() => Float)
  tasaSeguro: number | null;

  @Field(() => Float)
  costoCifFleteUsd: number | null;

  @Field(() => Float)
  tasaCambioMn: number | null;

  @Field(() => Float)
  costoFleteSeguroMn: number | null;

  @Field(() => Float)
  factorConversion: number | null;

  @Field(() => Float)
  tasaArancelaria: number | null;

  @Field(() => Float)
  valorArancel: number | null;

  @Field(() => Float)
  gastoManipulacion: number | null;

  @Field(() => Float)
  gastoDoc: number | null;

  @Field(() => Float)
  gastoEmisionBl: number | null;

  @Field(() => Float)
  gastoMovContenedores: number | null;

  @Field(() => Float)
  gastoAsistenciaTecn: number | null;

  @Field(() => Float)
  gastoSeguridadCont: number | null;

  @Field(() => Float)
  gastoFumigacion: number | null;

  @Field(() => Float)
  gastoSupervisiones: number | null;

  @Field(() => Float)
  gastoFitosanitario: number | null;

  @Field(() => Float)
  oGastosPortuariosAduanales: number | null;

  @Field(() => Float)
  gastosImportacion: number | null;

  @Field(() => Float)
  otrosGastos: number | null;

  @Field(() => Float)
  totalGastos: number | null;

  @Field(() => Float)
  indicePGasto: number | null;

  @Field(() => Float)
  tasaMaxRecargo: number | null;

  @Field(() => Float)
  margenComercial: number | null;

  @Field(() => Float)
  tasaImpuestoVentas: number | null;

  @Field(() => Float)
  tasaContibucion: number | null;

  @Field(() => Float)
  tasaImpuetoProducto: number | null;

  @Field(() => Float)
  totalImpuestoContrib: number | null;

  @Field(() => Float)
  pVentaImportador: number | null;

  @Field()
  fecha: Date | null;

  @Field()
  nota: string | null;

  @Field(() => Int)
  elaborado: number | null;

  @Field(() => Int)
  aprobado: number | null;
}
