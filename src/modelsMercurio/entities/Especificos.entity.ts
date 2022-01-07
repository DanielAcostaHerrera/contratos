import { Field, Int, ObjectType } from "@nestjs/graphql";
import {Column,Entity,Index,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn} from "typeorm";
import { BasesCMarcoEspecificos } from "../../models/entities/BasesCMarcoEspecificos.entity";
import { PliegoConcurrenciaDetalle } from "../../models/entities/PliegoConcurrenciaDetalle.entity";


@ObjectType()
@Index("aaaaaEspecificos_PK",["id",],{ unique:true })
@Index("Actualizacion",["actualizacion",],{  })
@Index("Especifico",["especifico",],{  })
@Index("Generico",["generico",],{  })
@Index("GenericosEspecificos",["generico",],{  })
@Index("Seccion",["seccion",],{  })
@Index("SeccionesEspecificos",["seccion",],{  })
@Index("Subgenerico",["subgenerico",],{  })
@Index("SubgenericosEspecificos",["subgenerico",],{  })
@Entity("Especificos" ,{schema:"Mercurio.dbo" } )
export  class Especificos {

@PrimaryGeneratedColumn({ type:"int", name:"Id" })
@Field(() => Int)
id:number;

@Column("int",{ name:"Seccion" })
@Field(() => Int)
seccion:number;

@Column("int",{ name:"Generico" })
@Field(() => Int)
generico:number;

@Column("int",{ name:"Subgenerico" })
@Field(() => Int)
subgenerico:number;

@Column("nvarchar",{ name:"Especifico",length:255 })
@Field()
especifico:string;

@Column("bit",{ name:"+Arancel",default: () => "(0)", })
@Field()
arancel:boolean;

@Column("datetime",{ name:"Actualizacion",default: () => "getdate()", })
@Field()
actualizacion:Date;

@Column("timestamp",{ name:"upsize_ts",nullable:true })
@Field({nullable: true})
upsizeTs:Date | null;

@Column("nvarchar",{ name:"CodLinea",nullable:true,length:6 })
@Field({nullable: true})
codLinea:string | null;

@Column("bit",{ name:"FijarMedNeta",nullable:true,default: () => "(0)", })
@Field({nullable: true})
fijarMedNeta:boolean | null;

@Column("bit",{ name:"Activo",default: () => "(1)", })
@Field()
activo:boolean;

@Column("int",{ name:"IDCircularAct",nullable:true,default: () => "[dbo].[AsignaCirc]()", })
@Field(() => Int,{nullable: true})
idCircularAct:number | null;

@Field(() => [BasesCMarcoEspecificos], { nullable: true })
@OneToMany(() => BasesCMarcoEspecificos,(basesCMarcoEspecificos) => basesCMarcoEspecificos.especifico)
basesCMarcoEspecificos: BasesCMarcoEspecificos[];

@Field(() => [PliegoConcurrenciaDetalle], { nullable: true })
@OneToMany(() => PliegoConcurrenciaDetalle,(pliegoConcurrenciaDetalles) => pliegoConcurrenciaDetalles.especifico)
pliegoConcurrenciaDetalles: PliegoConcurrenciaDetalle[];
}
