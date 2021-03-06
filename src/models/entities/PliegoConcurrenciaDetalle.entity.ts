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
import { Especificos } from "../../modelsMercurio/entities/Especificos.entity";
import { UnidadMedida } from "../../modelsMercurio/entities/UnidadMedida.entity";

@ObjectType()
@Index(
  "IX_PliegoConcurrenciaDetalleEspecifico",
  ["idEspecifico", "idPliegoResumen"],
  { unique: true }
)
@Index("PK_PliegoConcurrenciaDetalle", ["idPliegoDetalle"], { unique: true })
@Entity("PliegoConcurrenciaDetalle", { schema: "CONTRATO.dbo" })
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

  @Field(() => PliegoConcurrenciaResumen, {nullable: true})
  @ManyToOne(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.pliegoConcurrenciaDetalles)
  @JoinColumn([{ name: "IdPliegoResumen", referencedColumnName: "idPliegoResumen" },])
  pliegoResumen: PliegoConcurrenciaResumen;

  @Field(() => Embalajes, {nullable: true})
  @ManyToOne(() => Embalajes,(embalajes) => embalajes.pliegoConcurrenciaDetalles)
  @JoinColumn([{ name: "IdEmbalaje", referencedColumnName: "idEmbalaje" }])
  embalaje: Embalajes;

  @Field(() => Especificos, {nullable: true})
  @ManyToOne(() => Especificos,(especifico) => especifico.pliegoConcurrenciaDetalles)
  @JoinColumn([{ name: "IdEspecifico", referencedColumnName: "id" }])
  especifico: Especificos;

  @Field(() => UnidadMedida, {nullable: true})
  @ManyToOne(() => UnidadMedida,(unidadMedida) => unidadMedida.pliegoConcurrenciaDetalles)
  @JoinColumn([{ name: "IdUnidadMedida", referencedColumnName: "id" }])
  unidadMedida: UnidadMedida;
}
