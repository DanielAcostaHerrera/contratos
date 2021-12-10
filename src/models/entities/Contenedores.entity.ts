import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FacturaContenedor } from "./FacturaContenedor.entity";

@ObjectType()
@Index("PK_Contenedores", ["idContenedor"], { unique: true })
@Entity("Contenedores", { schema: "dbo" })
export class Contenedores {
  @PrimaryGeneratedColumn({ type: "int", name: "IdContenedor" })
  @Field(() => Int)
  idContenedor: number;

  @Column("nvarchar", { name: "NoContenedor", length: 20 })
  @Field()
  noContenedor: string;

  @Field(() => [FacturaContenedor])
  @OneToMany(() => FacturaContenedor,(facturaContenedor) => facturaContenedor.idContenedor)
  facturaContenedores: FacturaContenedor[];
}
