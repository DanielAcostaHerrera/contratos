import { Contratos } from './../../models/entities/Contratos.entity';
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany } from "typeorm";
import { SuplementoResumen } from '../../models/entities/SuplementoResumen.entity';

@ObjectType()
@Index("PK_AgenciasAseguradoras", ["idAgenciaS"], { unique: true })
@Entity("AgenciasAseguradoras", { schema: "Nomgen.dbo" })
export class AgenciasAseguradoras {
  @Column("int", {primary: true, name: "IdAgenciaS" })
  @Field(() => Int)
  idAgenciaS: number;

  @Column("nvarchar", { name: "Nombre", nullable: true, length: 150 })
  @Field({nullable: true})
  nombre: string | null;

  @Column("nvarchar", { name: "Direccion", nullable: true, length: 200 })
  @Field({nullable: true})
  direccion: string | null;

  @Column("nvarchar", { name: "Telefono", nullable: true, length: 50 })
  @Field({nullable: true})
  telefono: string | null;

  @Column("nvarchar", { name: "Contacto", nullable: true, length: 50 })
  @Field({nullable: true})
  contacto: string | null;

  @Column("float", { name: "Valor", precision: 53 })
  @Field(() => Float,{nullable: true})
  valor: number;
}
