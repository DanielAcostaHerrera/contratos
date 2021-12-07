import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateFichaCompraResumanInput {
  @Field(() => Int,{nullable: true})
  idFicha?: number;

  @Field(() => Int)
  idProveedor: number;

  @Field(() => Int)
  idMoneda: number;

  @Field(() => Int)
  idIncoterm: number;

  @Field(() => Int)
  idContrato: number;

  @Field(() => Int)
  idNegociacion: number;

  @Field(() => Int)
  idPais: number;

  @Field(() => Int)
  contenedores: number;

  @Field(() => Float)
  pesoBruto: number | null;

  @Field(() => Float)
  pesoNeto: number | null;

  @Field()
  embalaje: string | null;

  @Field(() => Float)
  cantidadEmbalaje: number | null;

  @Field(() => Float)
  cantidad: number | null;

  @Field()
  codigo: string | null;

  @Field()
  descripcion: string | null;

  @Field(() => Float)
  valorContratacion: number;

  @Field(() => Float)
  gastoAlmacenOrigen: number;

  @Field(() => Float)
  gastoTranspOrigen: number;

  @Field(() => Float)
  gastoAduanaOrigen: number;

  @Field(() => Float)
  gastoManipulacionOrigen: number;

  @Field(() => Float)
  otrosGastosOrigen: number;

  @Field(() => Float)
  totalGastoOrigen: number;

  @Field(() => Float)
  recargoContratacion: number;

  @Field(() => Float)
  descuentoContratacion: number;

  @Field(() => Float)
  totalRecDescContrato: number;

  @Field(() => Float)
  totalAdquisicion: number;

  @Field(() => Float)
  indicePpCosto: number;

  @Field(() => Float)
  difCambioMoneda: number;

  @Field(() => Float)
  tasaCambioContratacion: number;

  @Field(() => Float)
  valorMercancia: number;

  @Field(() => Float)
  tarifaFlete: number;

  @Field(() => Float)
  recargoFlete: number;

  @Field(() => Float)
  descuentoFlete: number;

  @Field(() => Float)
  totalFlete: number;

  @Field(() => Float)
  costoFleteUsd: number;

  @Field(() => Float)
  seguroContrato: number;

  @Field(() => Float)
  seguro: number | null;

  @Field(() => Float)
  tasaSeguro: number | null;

  @Field(() => Float)
  costoCifFleteUsd: number | null;

  @Field(() => Float)
  tasaCambioMn: number;

  @Field(() => Float)
  costoFleteSeguroMn: number | null;

  @Field(() => Float)
  factorConversion: number | null;

  @Field(() => Float)
  tasaArancelaria: number;

  @Field(() => Float)
  valorArancel: number | null;

  @Field(() => Float)
  gastoManipulacion: number;

  @Field(() => Float)
  gastoDoc: number;

  @Field(() => Float)
  gastoEmisionBl: number;

  @Field(() => Float)
  gastoMovContenedores: number;

  @Field(() => Float)
  gastoAsistenciaTecn: number;

  @Field(() => Float)
  gastoSeguridadCont: number;

  @Field(() => Float)
  gastoFumigacion: number;

  @Field(() => Float)
  gastoSupervisiones: number;

  @Field(() => Float)
  gastoFitosanitario: number;

  @Field(() => Float)
  oGastosPortuariosAduanales: number;

  @Field(() => Float)
  gastosImportacion: number;

  @Field(() => Float)
  otrosGastos: number;

  @Field(() => Float)
  financiamiento: number;

  @Field(() => Float)
  totalGastos: number;

  @Field(() => Float)
  indicePGasto: number | null;

  @Field(() => Float)
  indGastoAdquisicion: number | null;

  @Field(() => Float)
  tasaMaxRecargo: number;

  @Field(() => Float)
  margenComercial: number | null;

  @Field(() => Float)
  tasaImpuestoVentas: number;

  @Field(() => Float)
  tasaContibucion: number;

  @Field(() => Float)
  tasaImpuestoProducto: number;

  @Field(() => Float)
  totalImpuestoContrib: number;

  @Field(() => Float)
  pVentaImportador: number | null;

  @Field(() => Float)
  tasaCircMayorista: number;

  @Field(() => Float)
  tasaCircMinorista: number;

  @Field(() => Float)
  tasaImpuestoVentasMin: number;

  @Field(() => Float)
  tasaContibucionMin: number;

  @Field(() => Float)
  tasaImpuestoProductoMin: number;

  @Field(() => Float)
  totalImpuestoContribMin: number;

  @Field()
  fecha: Date;

  @Field()
  nota: string | null;

  @Field(() => Int)
  realizadoPor: number | null;

  @Field()
  aprobado: boolean;

  @Field()
  terminado: boolean;

  @Field()
  fechaAprobado: Date | null;

  @Field()
  cancelado: boolean;

  @Field(() => Int)
  canceladoPor: number | null;

  @Field()
  fechaCancelacion: Date | null;

  @Field()
  chkRecepcion: boolean;

  @Field()
  noFicha: string | null;
}
