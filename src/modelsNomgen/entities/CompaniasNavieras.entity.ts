import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany } from "typeorm";
import { Contratos } from "../../models/entities/Contratos.entity";
import { Embarques } from "../../models/entities/Embarques.entity";
import { PliegoConcurrenciaResumen } from "../../models/entities/PliegoConcurrenciaResumen.entity";
import { SuplementoEmbarques } from "../../models/entities/SuplementoEmbarques.entity";
import { SuplementoResumen } from "../../models/entities/SuplementoResumen.entity";

@ObjectType()
@Index("PK_CompañiasNavieras", ["id"], { unique: true })
@Entity("CompañiasNavieras", { schema: "Nomgen.dbo" })
export class CompaniasNavieras {
  @Column("int", {primary: true, name: "Id" })
  @Field(() => Int)
  id: number;

  @Column("nvarchar", { name: "Nombre", nullable: true, length: 50 })
  @Field({nullable: true})
  nombre: string | null;

  @Column("int", { name: "diasdegracia", nullable: true })
  @Field(() => Int,{nullable: true})
  diasdegracia: number | null;

  @Field(() => [Contratos], { nullable: true })
  @OneToMany(() => Contratos,(contratos) => contratos.companiaNaviera)
  contratos: Contratos[];

  @Field(() => [Embarques], { nullable: true })
  @OneToMany(() => Embarques,(embarques) => embarques.companiaNaviera)
  embarques: Embarques[];

  @Field(() => [SuplementoResumen], { nullable: true })
  @OneToMany(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.empresaNaviera)
  suplementoResumen: SuplementoResumen[];

  @Field(() => [PliegoConcurrenciaResumen], { nullable: true })
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.naviera)
  pliegoConcurrenciaResumen: PliegoConcurrenciaResumen[];

  @Field(() => [SuplementoEmbarques], { nullable: true })
  @OneToMany(() => SuplementoEmbarques,(suplementoEmbarques) => suplementoEmbarques.companiaNaviera)
  suplementoEmbarques: SuplementoEmbarques[];
}
