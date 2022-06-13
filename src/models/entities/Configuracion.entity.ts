import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DatosEntidad } from "./DatosEntidad.entity";

@ObjectType()
@Index("PK_CTO_Configuracion", ["idConfig"], { unique: true })
@Index("IX_Configuracion", ["idEntidad"], { unique: true })
@Entity("Configuracion", { schema: "CONTRATO.dbo" })
export class Configuracion {
  @PrimaryGeneratedColumn({ type: "int", name: "IdConfig" })
  @Field(() => Int)
  idConfig: number;

  @Column("nvarchar", {
    name: "LugarFirma",
    length: 60,
    default: () => "N'Ciudad de la Habana'",
  })
  @Field()
  lugarFirma: string;

  @Column("int", { name: "IdEntidad", default: () => "(100)" })
  @Field(() => Int)
  idEntidad: number;

  @Column("int", { name: "VigenciaContrato", default: () => "(1095)" })
  @Field(() => Int)
  vigenciaContrato: number;

  @Column("nvarchar", { name: "PathContratosPDF", nullable: true, length: 250 })
  @Field({nullable: true})
  pathContratosPdf: string | null;

  @Column("int", { name: "AlertaVencContratos", default: () => "(90)" })
  @Field(() => Int)
  alertaVencContratos: number;

  @Field(() => DatosEntidad, {nullable: true})
  @OneToOne(() => DatosEntidad, (entidad) => entidad.configuracion)
  @JoinColumn([{ name: "IdEntidad", referencedColumnName: "idEntidad" }])
  entidad: DatosEntidad;
}
