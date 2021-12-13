import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Embarques } from "./Embarques.entity";

@ObjectType()
@Index("PK_ContratoDesglose", ["idContratoDesglose"], { unique: true })
@Entity("ContratoDesglose", { schema: "CONTRATO.dbo" })
export class ContratoDesglose {
  @PrimaryGeneratedColumn({ type: "int", name: "IdContratoDesglose" })
  @Field(() => Int)
  idContratoDesglose: number;

  @Column("int", { name: "IdEmbarque", nullable: true })
  @Field(() => Int)
  idEmbarque: number | null;
  
  @Column("int", { name: "Referencia", nullable: true })
  @Field(() => Int)
  referencia: number | null;

  @Column("int", { name: "Codigo" })
  @Field(() => Int)
  codigo: number;

  @Column("nvarchar", { name: "DescripcionAx", nullable: true, length: 200 })
  @Field()
  descripcionAx: string | null;

  @Column("int", { name: "UnidadMedidaCarton" })
  @Field(() => Int)
  unidadMedidaCarton: number;

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
}
