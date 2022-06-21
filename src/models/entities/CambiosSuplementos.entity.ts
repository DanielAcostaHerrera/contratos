import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SuplementoChange } from "./SuplementoChange.entity";

@ObjectType()
@Index("PK_CambiosSuplementos", ["idCambio"], { unique: true })
@Entity("CambiosSuplementos", { schema: "CONTRATO.dbo" })
export class CambiosSuplementos {
  @PrimaryGeneratedColumn({ type: "int", name: "IdCambio" })
  @Field(() => Int)
  idCambio: number;

  @Column("nvarchar", { name: "Descripción", length: 150 })
  @Field()
  descripciN: string;

  @Field(() => [SuplementoChange], { nullable: true })
  @OneToMany(() => SuplementoChange,(suplementoChange) => suplementoChange.cambiosSuplementos)
  suplementoChanges: SuplementoChange[];
}
