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

  @Field({nullable: true})
  idEmbalaje: string | null;

  @Field(() => Float,{nullable: true})
  pesoBruto: number | null;

  @Field(() => Float,{nullable: true})
  pesoNeto: number | null;

  @Field(() => Float,{nullable: true})
  cantidadEmbalaje: number | null;

  @Field(() => Float,{nullable: true})
  cantidad: number | null;

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
  tasaCambioContratacion: number;

  @Field(() => Float)
  tarifaFlete: number;

  @Field(() => Float)
  recargoFlete: number;

  @Field(() => Float)
  descuentoFlete: number;

  @Field(() => Float)
  seguroContrato: number;

  @Field(() => Float,{nullable: true})
  tasaSeguro: number | null;

  @Field(() => Float)
  tasaCambioMn: number;

  @Field(() => Float)
  tasaArancelaria: number;

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
  otrosGastos: number;

  @Field(() => Float)
  financiamiento: number;

  @Field(() => Float)
  tasaMaxRecargo: number;

  @Field(() => Float)
  tasaImpuestoVentas: number;

  @Field(() => Float)
  tasaContibucion: number;

  @Field(() => Float)
  tasaImpuestoProducto: number;

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

  @Field({nullable: true})
  nota: string | null;

  @Field(() => Int,{nullable: true})
  realizadoPor: number | null;

  @Field()
  aprobado: boolean;

  @Field()
  terminado: boolean;

  @Field({nullable: true})
  fechaAprobado: Date | null;

  @Field()
  cancelado: boolean;

  @Field(() => Int,{nullable: true})
  canceladoPor: number | null;

  @Field({nullable: true})
  fechaCancelacion: Date | null;

  @Field()
  chkRecepcion: boolean;
}
