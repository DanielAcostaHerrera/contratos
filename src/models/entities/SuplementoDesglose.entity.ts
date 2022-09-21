import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SuplementoResumen } from "./SuplementoResumen.entity";
import { Embarques } from "./Embarques.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { CodigosParaLaVenta } from "../../modelsMercurio/entities/CodigosParaLaVenta.entity";
import { Referencias } from "../../modelsMercurio/entities/Referencias.entity";
import { Embalajes } from "./Embalajes.entity";

@ObjectType()
@Index("PK_SuplementoDesglose", ["idSuplementoDesglose"], { unique: true })
@Entity("SuplementoDesglose", { schema: "CONTRATO.dbo" })
export class SuplementoDesglose {
  @PrimaryGeneratedColumn({ type: "int", name: "IdSuplementoDesglose" })
  @Field(() => Int)
  idSuplementoDesglose: number;

  @Column("int", { name: "IdSuplementoResumen" })
  @Field(() => Int)
  idSuplementoResumen: number;

  @Column("int", { name: "IdEmbarque" })
  @Field(() => Int)
  idEmbarque: number;

  @Column("int", { name: "Referencia", nullable: true })
  @Field(() => Int,{nullable: true})
  idReferencia: number | null;

  @Column("int", { name: "Codigo" })
  @Field(() => Int)
  idCodigo: number;

  @Column("nvarchar", { name: "DescripcionSP", nullable: true, length: 200 })
  @Field({nullable: true})
  descripcionSp: string | null;

  @Column("int", { name: "UnidadMedidaCarton" })
  @Field(() => Int)
  idUnidadMedida: number;

  @Column("real", { name: "CantidadPorCarton", precision: 24 })
  @Field(() => Float)
  cantidadPorCarton: number;

  @Column("smallint", { name: "Paquete" })
  @Field(() => Int)
  paquete: number;

  @Column("int", { name: "CantidadCartones" })
  @Field(() => Int)
  cantidadCartones: number;

  @Column("decimal", { name: "Volumen", precision: 10, scale: 3 })
  @Field(() => Float)
  volumen: number;

  @Column("float", { name: "Precio", precision: 24 })
  @Field(() => Float)
  precio: number;

  @Column("float", { name: "PrecioPaquete", precision: 24 })
  @Field(() => Float)
  precioPaquete: number;

  @Column("float", { name: "Packing", precision: 53, default: () => "(1)" })
  @Field(() => Float)
  packing: number;

  @Column("int", { name: "Cajas" })
  @Field(() => Float)
  cajas: number;

  @Field(() => SuplementoResumen, {nullable: true})
  @ManyToOne(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.suplementoDesgloses)
  @JoinColumn([{name: "IdSuplementoResumen",referencedColumnName: "idSuplementoResumen"}])
  suplementoResumen: SuplementoResumen;

  @Field(() => Embarques, {nullable: true})
  @ManyToOne(() => Embarques, (embarques) => embarques.suplementoDesgloses)
  @JoinColumn([{ name: "IdEmbarque", referencedColumnName: "idEmbarque" }])
  embarques: Embarques;

  @Field(() => Embalajes, {nullable: true})
  @ManyToOne(() => Embalajes, (embalaje) => embalaje.contratoDesgloses)
  @JoinColumn([{ name: "UnidadMedidaCarton", referencedColumnName: "idEmbalaje" }])
  embalaje: Embalajes;

  @Field(() => CodigosParaLaVenta, {nullable: true})
  @ManyToOne(() => CodigosParaLaVenta, (codigo) => codigo.suplementoDesgloses)
  @JoinColumn([{ name: "Codigo", referencedColumnName: "idCodigo" }])
  codigo: CodigosParaLaVenta;

  @Field(() => Referencias, {nullable: true})
  @ManyToOne(() => Referencias, (referencia) => referencia.suplementoDesgloses)
  @JoinColumn([{ name: "Referencia", referencedColumnName: "referenciaId" }])
  referencia: Referencias;

}
