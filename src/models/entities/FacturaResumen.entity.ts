import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FacturaContenedor } from "./FacturaContenedor.entity";
import { FacturaDesglose } from "./FacturaDesglose.entity";
import { Contratos } from "./Contratos.entity";
import { Embarques } from "./Embarques.entity";
import { Ejecutivos } from "./Ejecutivos.entity";
import { NegociacionResumen } from "./NegociacionResumen.entity";
import { Puertos } from "./Puertos.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Index("PK_FacturaResumen", ["idFactura"], { unique: true })
@Entity("FacturaResumen", { schema: "CONTRATO.dbo" })
export class FacturaResumen {
  @PrimaryGeneratedColumn({ type: "int", name: "IdFactura" })
  @Field(() => Int)
  idFactura: number;

  @Column("int", { name: "IdContrato", nullable: true })
  @Field(() => Int)
  idContrato: number;

  @Column("int", { name: "IdEmbarque", nullable: true })
  @Field(() => Int)
  idEmbarque: number;

  @Column("int", { name: "IdEjecutivo", nullable: true })
  @Field(() => Int)
  idEjecutivo: number;

  @Column("int", { name: "IdNegociacion", nullable: true })
  @Field(() => Int)
  idNegociacion: number;

  @Column("int", { name: "IdPuertoDestino", nullable: true })
  @Field(() => Int)
  idPuertoDestino: number;

  @Column("int", { name: "RealizadoPor", nullable: true })
  @Field(() => Int)
  realizadoPor: number;

  @Column("smalldatetime", { name: "Fecha", nullable: true })
  @Field({nullable: true})
  fecha: Date | null;

  @Column("smalldatetime", { name: "FechaFactura", default: () => "getdate()" })
  @Field()
  fechaFactura: Date;

  @Column("nvarchar", { name: "NumeroBL", nullable: true, length: 50 })
  @Field({nullable: true})
  numeroBl: string | null;

  @Column("nvarchar", { name: "Numero", nullable: true, length: 50 })
  @Field({nullable: true})
  numero: string | null;

  @Column("smallint", { name: "Nivel", nullable: true, default: () => "(0)" })
  @Field(() => Int,{nullable: true})
  nivel: number | null;

  @Column("tinyint", { name: "PlazoPuerto", nullable: true })
  @Field(() => Int,{nullable: true})
  plazoPuerto: number | null;

  @Column("tinyint", { name: "PlazoAlmacen", nullable: true })
  @Field(() => Int,{nullable: true})
  plazoAlmacen: number | null;

  @Column("tinyint", { name: "PlazoTienda", nullable: true })
  @Field(() => Int,{nullable: true})
  plazoTienda: number | null;

  @Column("smalldatetime", { name: "FechaPartida", nullable: true })
  @Field({nullable: true})
  fechaPartida: Date | null;

  @Column("real", { name: "Descuento", nullable: true, precision: 24 })
  @Field(() => Float,{nullable: true})
  descuento: number | null;

  @Column("ntext", { name: "Nota", nullable: true })
  @Field({nullable: true})
  nota: string | null;

  @Column("bit", { name: "Terminado", default: () => "(0)" })
  @Field()
  terminado: boolean;

  @Column("decimal", {
    name: "TasaMoneda",
    precision: 18,
    scale: 5,
    default: () => "(1)",
  })
  @Field(() => Float)
  tasaMoneda: number;

  @Column("bit", { name: "Cancelado", default: () => "(0)" })
  @Field()
  cancelado: boolean;

  @Column("smalldatetime", {
    name: "FechaTerminada",
    nullable: true,
    default: () => "getdate()",
  })
  @Field({nullable: true})
  fechaTerminada: Date | null;

  @Column("decimal", {
    name: "LaTasaMN",
    precision: 18,
    scale: 5,
    default: () => "(1)",
  })
  @Field(()=> Float)
  laTasaMn: number;
  
  @Field(()=> [FacturaContenedor], {nullable: true})
  @OneToMany(() => FacturaContenedor,(facturaContenedor) => facturaContenedor.facturaResumen)
  facturaContenedores: FacturaContenedor[];

  @Field(()=> [FacturaDesglose], {nullable: true})
  @OneToMany(() => FacturaDesglose,(facturaDesglose) => facturaDesglose.facturaResumen)
  facturaDesgloses: FacturaDesglose[];

  @Field(()=> Contratos, {nullable: true})
  @ManyToOne(() => Contratos, (contratos) => contratos.facturaResumen)
  @JoinColumn([{ name: "IdContrato", referencedColumnName: "idContrato" }])
  contratos: Contratos;

  @Field(()=> Embarques, {nullable: true})
  @ManyToOne(() => Embarques, (embarques) => embarques.facturaResumen)
  @JoinColumn([{ name: "IdEmbarque", referencedColumnName: "idEmbarque" }])
  embarques: Embarques;

  @Field(()=> Ejecutivos, {nullable: true})
  @ManyToOne(() => Ejecutivos, (ejecutivos) => ejecutivos.facturaResumen)
  @JoinColumn([{ name: "IdEjecutivo", referencedColumnName: "idEjecutivo" }])
  ejecutivos: Ejecutivos;

  @Field(()=> NegociacionResumen, {nullable: true})
  @ManyToOne(() => NegociacionResumen,(negociacionResumen) => negociacionResumen.facturaResumen)
  @JoinColumn([{ name: "IdNegociacion", referencedColumnName: "idNegociacion" }])
  negociacionResumen: NegociacionResumen;

  @Field(()=> Puertos, {nullable: true})
  @ManyToOne(() => Puertos, (puertos) => puertos.facturaResumen)
  @JoinColumn([{ name: "IdPuertoDestino", referencedColumnName: "idPuerto" }])
  puertoDestino: Puertos;

  @Field(()=> Ejecutivos, {nullable: true})
  @ManyToOne(() => Ejecutivos, (ejecutivos) => ejecutivos.facturaResumenRealiza)
  @JoinColumn([{ name: "RealizadoPor", referencedColumnName: "idEjecutivo" }])
  ejecutivoRealiza: Ejecutivos;
}
