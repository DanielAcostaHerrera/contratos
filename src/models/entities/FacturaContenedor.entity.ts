import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FacturaResumen } from "./FacturaResumen.entity";
import { Contenedores } from "./Contenedores.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Index("PK_FacturaContenedor", ["idFacturaContenedor"], { unique: true })
@Entity("FacturaContenedor", { schema: "dbo" })
export class FacturaContenedor {
  @PrimaryGeneratedColumn({ type: "int", name: "IdFacturaContenedor" })
  @Field(() => Int)
  idFacturaContenedor: number;

  @Column("int", { name: "IdFactura" })
  @Field(() => Int)
  idFactura: number;

  @Column("int", { name: "IdContenedor" })
  @Field(() => Int)
  idContenedor: number;

  @Field(() => FacturaResumen)
  @ManyToOne(() => FacturaResumen,(facturaResumen) => facturaResumen.facturaContenedores)
  @JoinColumn([{ name: "IdFactura", referencedColumnName: "idFactura" }])
  facturaResumen: FacturaResumen;

  @Field(() => Contenedores)
  @ManyToOne(() => Contenedores,(contenedores) => contenedores.facturaContenedores)
  @JoinColumn([{ name: "IdContenedor", referencedColumnName: "idContenedor" }])
  contenedores: Contenedores;
}
