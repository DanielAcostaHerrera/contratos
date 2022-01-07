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

  @Field({nullable: true})
  bl: string | null;

  @Field(() => Int)
  cantAnexos: number;

  @Field(() => Int,{nullable: true})
  viaTransporte: string | null;

  @Field(() => Int)
  idPais: number;

  @Field({nullable: true})
  destino: string | null;

  @Field({nullable: true})
  contenedores: string | null;

  @Field(() => Float,{nullable: true})
  pesoBruto: number | null;

  @Field(() => Float,{nullable: true})
  pesoNeto: number | null;

  @Field(() => Float,{nullable: true})
  cantidadEmbalaje: number | null;

  @Field(() => Float,{nullable: true})
  cantidad: number | null;

  @Field({nullable: true})
  idCodigo: number | null;

  @Field({nullable: true})
  descripcion: string | null;

  @Field(() => Float,{nullable: true})
  valorContratacion: number | null;

  @Field(() => Float,{nullable: true})
  gastoAlmacenOrigen: number | null;

  @Field(() => Float,{nullable: true})
  gastoTranspOrigen: number | null;

  @Field(() => Float,{nullable: true})
  gastoAduanaOrigen: number | null;

  @Field(() => Float,{nullable: true})
  gastoManipulacionOrigen: number | null;

  @Field(() => Float,{nullable: true})
  otrosGastosOrigen: number | null;

  @Field(() => Float,{nullable: true})
  recargoContratacion: number | null;

  @Field(() => Float,{nullable: true})
  descuentoContratacion: number | null;

  @Field(() => Float,{nullable: true})
  difCambioMoneda: number | null;

  @Field(() => Float,{nullable: true})
  tasaCambioContratacion: number | null;

  @Field(() => Float,{nullable: true})
  tarifaFlete: number | null;

  @Field(() => Float,{nullable: true})
  recargoFlete: number | null;

  @Field(() => Float,{nullable: true})
  descuentoFlete: number | null;

  @Field(() => Float,{nullable: true})
  seguro: number | null;

  @Field(() => Float,{nullable: true})
  tasaCambioMn: number | null;

  @Field(() => Float,{nullable: true})
  tasaArancelaria: number | null;

  @Field(() => Float,{nullable: true})
  gastoManipulacion: number | null;

  @Field(() => Float,{nullable: true})
  gastoDoc: number | null;

  @Field(() => Float,{nullable: true})
  gastoEmisionBl: number | null;

  @Field(() => Float,{nullable: true})
  gastoMovContenedores: number | null;

  @Field(() => Float,{nullable: true})
  gastoAsistenciaTecn: number | null;

  @Field(() => Float,{nullable: true})
  gastoSeguridadCont: number | null;

  @Field(() => Float,{nullable: true})
  gastoFumigacion: number | null;

  @Field(() => Float,{nullable: true})
  gastoSupervisiones: number | null;

  @Field(() => Float,{nullable: true})
  gastoFitosanitario: number | null;

  @Field(() => Float,{nullable: true})
  oGastosPortuariosAduanales: number | null;

  @Field(() => Float,{nullable: true})
  otrosGastos: number | null;

  @Field(() => Float,{nullable: true})
  tasaMaxRecargo: number | null;

  @Field(() => Float,{nullable: true})
  tasaImpuestoVentas: number | null;

  @Field(() => Float,{nullable: true})
  tasaContibucion: number | null;

  @Field(() => Float,{nullable: true})
  tasaImpuetoProducto: number | null;

  @Field({nullable: true})
  fecha: Date | null;

  @Field({nullable: true})
  nota: string | null;

  @Field(() => Int,{nullable: true})
  elaborado: number | null;

  @Field(() => Int,{nullable: true})
  aprobado: number | null;
}
