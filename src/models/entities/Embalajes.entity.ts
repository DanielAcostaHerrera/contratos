import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FichaCostoResumen } from "./FichaCostoResumen.entity";
import { PliegoConcurrenciaDetalle } from "./PliegoConcurrenciaDetalle.entity";

@ObjectType()
@Index("PK_CTO_Embalajes", ["idEmbalaje"], { unique: true })
@Entity("Embalajes", { schema: "dbo" })
export class Embalajes {
  @PrimaryGeneratedColumn({ type: "int", name: "IdEmbalaje" })
  @Field(() => Int)
  idEmbalaje: number;

  @Column("nvarchar", { name: "Descripcion", nullable: true, length: 35 })
  @Field()
  descripcion: string | null;

  @Column("nvarchar", { name: "Abreviatura", nullable: true, length: 7 })
  @Field()
  abreviatura: string | null;

  @Field(() => [FichaCostoResumen])
  @OneToMany(() => FichaCostoResumen,(fichaCostoResumen) => fichaCostoResumen.embalaje)
  fichaCostoResumen: FichaCostoResumen[];

  @Field(() => [PliegoConcurrenciaDetalle])
  @OneToMany(() => PliegoConcurrenciaDetalle,(pliegoConcurrenciaDetalle) => pliegoConcurrenciaDetalle.embalaje)
  pliegoConcurrenciaDetalles: PliegoConcurrenciaDetalle[];
}
