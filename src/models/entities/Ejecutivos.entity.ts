import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cargos } from "./Cargos.entity";
import { Contratos } from "./Contratos.entity";
import { Embarques } from "./Embarques.entity";
import { FacturaResumen } from "./FacturaResumen.entity";
import { GruposDeCompras } from "./GruposDeCompras.entity";
import { SuplementoResumen } from "./SuplementoResumen.entity";
import { Usuarios } from "./Usuarios.entity";

@ObjectType()
@Index("IX_CTO_Ejecutivos_Grupo", ["idGrupo"], {})
@Index("PK_CTO_Ejecutivos", ["idEjecutivo"], { unique: true })
@Entity("Ejecutivos", { schema: "CONTRATO.dbo" })
export class Ejecutivos {
  @PrimaryGeneratedColumn({ type: "int", name: "IdEjecutivo" })
  @Field(() => Int)
  idEjecutivo: number;

  @Column("int", { name: "IdGrupo"})
  @Field(() => Int)
  idGrupo: number;

  @Column("nvarchar", { name: "Nombre", length: 50 })
  @Field()
  nombre: string;

  @Column("int", { name: "Cargo" })
  @Field(() => Int)
  idCargo: number;

  @Column("nvarchar", { name: "Correo", nullable: true, length: 50 })
  @Field({nullable: true})
  correo: string | null;

  @Column("bit", { name: "Activo" })
  @Field()
  activo: boolean;

  @Field(() => Cargos, {nullable: true})
  @ManyToOne(() => Cargos, (cargos) => cargos.ejecutivos)
  @JoinColumn([{ name: "Cargo", referencedColumnName: "idCargo" }])
  cargo: Cargos;

  @Field(() => GruposDeCompras, {nullable: true})
  @ManyToOne(() => GruposDeCompras, (grupos) => grupos.ejecutivos)
  @JoinColumn([{ name: "IdGrupo", referencedColumnName: "idGrupo" }])
  grupo: GruposDeCompras;

  @Field(() => [Contratos], {nullable: true})
  @OneToMany(() => Contratos, (contratos) => contratos.ejecutivo)
  contratos: Contratos[];
  
  @Field(() => [Contratos], {nullable: true})
  @OneToMany(() => Contratos, (contratos) => contratos.ejecutivoRealiza)
  contratosRealiza: Contratos[];

  @Field(() => [Contratos], {nullable: true})
  @OneToMany(() => Contratos, (contratos) => contratos.ejecutivoFirma)
  contratosFirma: Contratos[];

  @Field(() => [Contratos], {nullable: true})
  @OneToMany(() => Contratos, (contratos) => contratos.ejecutivoModifica)
  contratosModifica: Contratos[];

  @Field(() => [FacturaResumen], {nullable: true})
  @OneToMany(() => FacturaResumen,(facturaResumen) => facturaResumen.ejecutivos)
  facturaResumen: FacturaResumen[];

  @Field(() => [FacturaResumen], {nullable: true})
  @OneToMany(() => FacturaResumen,(facturaResumen) => facturaResumen.ejecutivoRealiza)
  facturaResumenRealiza: FacturaResumen[];

  @Field(() => [SuplementoResumen], {nullable: true})
  @OneToMany(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.ejecutivoSuplementa)
  suplementoResumenSuplementa: SuplementoResumen[];

  @Field(() => [SuplementoResumen], {nullable: true})
  @OneToMany(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.ejecutivo)
  suplementoResumen: SuplementoResumen[];

  @Field(() => [SuplementoResumen], {nullable: true})
  @OneToMany(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.ejecutivoFirma)
  suplementoResumenFirma: SuplementoResumen[];

  @Field(() => Usuarios, {nullable: true})
  @OneToOne(() => Usuarios, (usuarios) => usuarios.ejecutivo)
  usuarios: Usuarios;

}
