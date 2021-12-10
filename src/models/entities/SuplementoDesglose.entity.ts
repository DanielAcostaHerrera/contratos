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

@ObjectType()
@Index("PK_SuplementoDesglose", ["idSuplementoDesglose"], { unique: true })
@Entity("SuplementoDesglose", { schema: "dbo" })
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
  @Field(() => Int)
  referencia: number | null;

  @Column("int", { name: "Codigo" })
  @Field(() => Int)
  codigo: number;

  @Column("nvarchar", { name: "DescripcionSP", nullable: true, length: 200 })
  @Field()
  descripcionSp: string | null;

  @Column("int", { name: "UnidadMedidaCarton" })
  @Field(() => Int)
  unidadMedidaCarton: number;

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

  @Column("real", { name: "Precio", precision: 24 })
  @Field(() => Float)
  precio: number;

  @Column("real", { name: "PrecioPaquete", precision: 24 })
  @Field(() => Float)
  precioPaquete: number;

  @Column("float", { name: "Packing", precision: 53, default: () => "(1)" })
  @Field(() => Float)
  packing: number;

  @Field(() => SuplementoResumen)
  @ManyToOne(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.suplementoDesgloses)
  @JoinColumn([{name: "IdSuplementoResumen",referencedColumnName: "idSuplementoResumen"}])
  suplementoResumen: SuplementoResumen;

  @Field(() => Embarques)
  @ManyToOne(() => Embarques, (embarques) => embarques.suplementoDesgloses)
  @JoinColumn([{ name: "IdEmbarque", referencedColumnName: "idEmbarque" }])
  embarques: Embarques;
}
