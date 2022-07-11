import { CampanaEtapasContratacion } from './../../models/entities/CampanaEtapasContratacion.entity';
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany } from "typeorm";
import { BasesGenerales } from "../../models/entities/BasesGenerales.entity";
import { Contratos } from '../../models/entities/Contratos.entity';
import { PliegoConcurrenciaResumen } from '../../models/entities/PliegoConcurrenciaResumen.entity';
import { FacturaDesglose } from '../../models/entities/FacturaDesglose.entity';
import { TiemposTravesia } from '../../models/entities/TiemposTravesia.entity';
import { Puertos } from '../../models/entities/Puertos.entity';
import { SuplementoResumen } from '../../models/entities/SuplementoResumen.entity';

@ObjectType()
@Index("aaaaaPaises_PK", ["pais"], { unique: true })
@Index("Actualizacion", ["actualizacion"], {})
@Index("NOMB", ["nomb"], { unique: true })
@Entity("Paises", { schema: "Mercurio.dbo" })
export class Paises {
  @Column("int", { primary: true, name: "PAIS" })
  @Field(() => Int)
  pais: number;

  @Column("nvarchar", { name: "NOMB", length: 15 })
  @Field()
  nomb: string;

  @Column("float", { name: "CMON", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  cmon: number | null;

  @Column("nvarchar", { name: "SMON", nullable: true, length: 3 })
  @Field({nullable: true})
  smon: string | null;

  @Column("float", { name: "TASE", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  tase: number | null;

  @Column("float", { name: "T2SE", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  t2Se: number | null;

  @Column("float", { name: "AREA", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  area: number | null;

  @Column("nvarchar", { name: "NMF_", length: 1 })
  @Field()
  nmf: string;

  @Column("nvarchar", {
    name: "ALADI_",
    length: 1,
    default: () => "create default [NMF_S] as 'S'",
  })
  @Field()
  aladi: string;

  @Column("nvarchar", { name: "CODMON", nullable: true, length: 3 })
  @Field({nullable: true})
  codmon: string | null;

  @Column("nvarchar", { name: "CODPAIS", nullable: true, length: 2 })
  @Field({nullable: true})
  codpais: string | null;

  @Column("nvarchar", { name: "ABREVIATUR", nullable: true, length: 7 })
  @Field({nullable: true})
  abreviatur: string | null;

  @Column("datetime", { name: "Actualizacion", default: () => "getdate()" })
  @Field()
  actualizacion: Date;

  @Column("timestamp", { name: "upsize_ts", nullable: true })
  @Field({nullable: true})
  upsizeTs: Date | null;

  @Column("int", { name: "Travesia", default: () => "(0)" })
  @Field(() => Int)
  travesia: number;

  @Column("int", {
    name: "IDCircularAct",
    nullable: true,
    default: () => "[dbo].[AsignaCirc]()",
  })
  @Field(() => Int,{nullable: true})
  idCircularAct: number | null;

  @Field(() => [BasesGenerales], { nullable: true })
  @OneToMany(() => BasesGenerales,(basesGenerales) => basesGenerales.pais)
  basesGenerales: BasesGenerales[];

  @Field(() => [CampanaEtapasContratacion], { nullable: true })
  @OneToMany(() => CampanaEtapasContratacion,(campanaEtapasContratacion) => campanaEtapasContratacion.pais)
  campanaEtapasContratacion: CampanaEtapasContratacion[];

  @Field(() => [Contratos], { nullable: true })
  @OneToMany(() => Contratos,(contratos) => contratos.pais)
  contratos: Contratos[];

  @Field(() => [SuplementoResumen], { nullable: true })
  @OneToMany(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.pais)
  suplementoResumen: SuplementoResumen[];

  @Field(() => [PliegoConcurrenciaResumen], { nullable: true })
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.paisOrigenMercancia)
  pliegoConcurrenciaResumen: PliegoConcurrenciaResumen[];

  @Field(() => [FacturaDesglose], { nullable: true })
  @OneToMany(() => FacturaDesglose,(facturaDesglose) => facturaDesglose.pais)
  facturaDesgloses: FacturaDesglose[];

  @Field(() => [TiemposTravesia], { nullable: true })
  @OneToMany(() => TiemposTravesia,(tiemposTravesia) => tiemposTravesia.pais)
  tiemposTravesias: TiemposTravesia[];

  @Field(() => [Puertos], { nullable: true })
  @OneToMany(() => Puertos,(puerto) => puerto.pais)
  puerto: Puertos[];
}
