import { Price } from "@components/price/v1/entity";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("Vehicle")
export class Vehicle {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Index({
    unique: true,
  })
  @Column({
    type: "text",
  })
  public readonly bike_id: string;

  @Column({
    type: "real",
  })
  public readonly lat: number;

  @Column({
    type: "real",
  })
  public readonly lon: number;

  @Index()
  @Column({
    type: "boolean",
  })
  public readonly is_reserved: boolean;

  @Index()
  @Column({
    type: "boolean",
  })
  public readonly is_disabled: boolean;

  @Column({
    type: "text",
  })
  public readonly pricing_plan_id: string;

  @ManyToOne(() => Price, (Price) => Price.vehicle, { nullable: true })
  @JoinColumn([{ name: "pricing_plan_id", referencedColumnName: "plan_id" }])
  public readonly price: Price;

  @Index()
  @Column({
    type: "text",
  })
  public readonly vehicle_type_id: string;

  @Column({
    type: "text",
    transformer: {
      to: (value: string) => JSON.stringify(value),
      from: (value: string) => JSON.parse(value),
    },
  })
  public readonly rental_uris: string;

  @Index()
  @Column({
    type: "integer",
  })
  public readonly current_range_meters: number;
}
