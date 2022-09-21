import { Referencias } from './../../modelsMercurio/entities/Referencias.entity';
import { CodigosParaLaVenta } from './../../modelsMercurio/entities/CodigosParaLaVenta.entity';
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Embarques } from "./Embarques.entity";
import { Embalajes } from './Embalajes.entity';

@ObjectType()
@Index("PK_ContratoDesglose", ["idContratoDesglose"], { unique: true })
@Entity("ContratoDesglose", { schema: "CONTRATO.dbo" })
export class ContratoDesglose {
  @PrimaryGeneratedColumn({ type: "int", name: "IdContratoDesglose" })
  @Field(() => Int)
  idContratoDesglose: number;

  @Column("int", { name: "IdEmbarque", nullable: true })
  @Field(() => Int,{nullable: true})
  idEmbarque: number | null;
  
  @Column("int", { name: "Referencia", nullable: true })
  @Field(() => Int,{nullable: true})
  idReferencia: number | null;

  @Column("int", { name: "Codigo" })
  @Field(() => Int)
  idCodigo: number;

  @Column("nvarchar", { name: "DescripcionAx", nullable: true, length: 200 })
  @Field({nullable: true})
  descripcionAx: string | null;

  @Column("int", { name: "UnidadMedidaCarton" })
  @Field(() => Int)
  idUnidadMedida: number;

  @Column("decimal", { name: "CantidadPorCarton", precision: 18, scale: 4 })
  @Field(() => Float)
  cantidadPorCarton: number;

  @Column("smallint", { name: "Paquete" })
  @Field(() => Int)
  paquete: number;

  @Column("int", { name: "CantidadCartones" })
  @Field(() => Int)
  cantidadCartones: number;

  @Column("decimal", {
    name: "Volumen",
    precision: 10,
    scale: 3,
    default: () => "(1)",
  })
  @Field(() => Float)
  volumen: number;

  @Column("float", { name: "Precio", precision: 53 })
  @Field(() => Float)
  precio: number;

  @Column("float", { name: "PrecioPaquete", precision: 53 })
  @Field(() => Float)
  precioPaquete: number;

  @Column("float", { name: "Packing", precision: 53, default: () => "(1)" })
  @Field(() => Float)
  packing: number;

  @Column("int", { name: "Cajas", default: () => "(1)" })
  @Field(() => Int)
  cajas: number;

  @Field(() => Embarques, {nullable: true})
  @ManyToOne(() => Embarques, (embarques) => embarques.contratoDesgloses)
  @JoinColumn([{ name: "IdEmbarque", referencedColumnName: "idEmbarque" }])
  embarques: Embarques;

  @Field(() => Referencias, {nullable: true})
  @ManyToOne(() => Referencias, (referencias) => referencias.contratoDesgloses)
  @JoinColumn([{ name: "Referencia", referencedColumnName: "referenciaId" }])
  referencia: Referencias;

  @Field(() => CodigosParaLaVenta, {nullable: true})
  @ManyToOne(() => CodigosParaLaVenta, (codigosParaLaVenta) => codigosParaLaVenta.contratoDesgloses)
  @JoinColumn([{ name: "Codigo", referencedColumnName: "idCodigo" }])
  codigo: CodigosParaLaVenta;

  @Field(() => Embalajes, {nullable: true})
  @ManyToOne(() => Embalajes, (embalaje) => embalaje.contratoDesgloses)
  @JoinColumn([{ name: "UnidadMedidaCarton", referencedColumnName: "idEmbalaje" }])
  embalaje: Embalajes;
}
