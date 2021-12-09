import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PliegoConcurrenciaResumen } from "./PliegoConcurrenciaResumen.entity";
import { Embalajes } from "./Embalajes.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Index(
  "IX_PliegoConcurrenciaDetalleEspecifico",
  ["idEspecifico", "idPliegoResumen"],
  { unique: true }
)
@Index("PK_PliegoConcurrenciaDetalle", ["idPliegoDetalle"], { unique: true })
@Entity("PliegoConcurrenciaDetalle", { schema: "dbo" })
export class PliegoConcurrenciaDetalle {
  @PrimaryGeneratedColumn({ type: "int", name: "IdPliegoDetalle" })
  @Field(() => Int)
  idPliegoDetalle: number;

  @Column("int", { name: "IdPliegoResumen" })
  @Field(() => Int)
  idPliegoResumen: number;

  @Column("int", { name: "IdEspecifico" })
  @Field(() => Int)
  idEspecifico: number;

  @Column("int", { name: "IdEmbalaje" })
  @Field(() => Int)
  idEmbalaje: number;

  @Column("float", { name: "Cantidad", precision: 53 })
  @Field(() => Float)
  cantidad: number;

  @Column("int", { name: "IdUnidadMedida" })
  @Field(() => Int)
  idUnidadMedida: number;

  @Column("float", { name: "PesoBruto", precision: 53 })
  @Field(() => Float)
  pesoBruto: number;

  @Column("float", { name: "PrecioI", precision: 53 })
  @Field(() => Float)
  precioI: number;

  @Column("float", { name: "PrecioII", precision: 53 })
  @Field(() => Float)
  precioIi: number;

  @Column("float", { name: "PrecioIII", precision: 53 })
  @Field(() => Float)
  precioIii: number;

  @Field(() => PliegoConcurrenciaResumen)
  @ManyToOne(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.pliegoConcurrenciaDetalles)
  @JoinColumn([{ name: "IdPliegoResumen", referencedColumnName: "idPliegoResumen" },])
  pliegoResumen: PliegoConcurrenciaResumen;

  @Field(() => Embalajes)
  @ManyToOne(() => Embalajes,(embalajes) => embalajes.pliegoConcurrenciaDetalles)
  @JoinColumn([{ name: "IdEmbalaje", referencedColumnName: "idEmbalaje" }])
  embalaje: Embalajes;
}
