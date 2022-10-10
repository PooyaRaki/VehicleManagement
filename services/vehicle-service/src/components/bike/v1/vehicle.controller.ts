import * as Axios from "axios";
import { FeedController } from "@components/feed/v1";
import { VehicleApiResult } from "./interface";
import { Get, Route } from "tsoa";
import { NotFoundException } from "@app/exceptions";
import { VehicleListDto } from "./dto/vehicleList.dto";
import { Database } from "@app/database";
import { DataSource, SelectQueryBuilder } from "typeorm";
import { Vehicle } from "./entity";

@Route("/v1/vehicle")
export class VehicleController {
  private readonly _database: Promise<DataSource>;

  public constructor() {
    this._database = Database.getInstance();
  }

  /**
   * Returns Vehicle plans
   *
   * @returns {Promise<PricePlan[]>}
   */
  public async saveFeed(): Promise<boolean> {
    const url = (await new FeedController().fetch()).free_bike_status;

    const feedData = (
      await Axios.default<VehicleApiResult>({
        method: "GET",
        url,
        timeout: 20000,
      })
    ).data.data.bikes;

    await (await this._database)
      .createQueryBuilder()
      .insert()
      .into(Vehicle)
      .values(feedData)
      .orUpdate([
        "lat",
        "lon",
        "is_reserved",
        "is_disabled",
        "pricing_plan_id",
        "current_range_meters",
        "rental_uris",
      ])
      .execute();

    return true;
  }

  /**
   * Returns all Vehicles
   *
   * @returns {Promise<Vehicle[]>} Vehicles object
   */
  @Get("/")
  public async fetch(filters: VehicleListDto): Promise<Vehicle[]> {
    const query = (await this._database)
      .createQueryBuilder()
      .select("vehicle")
      .from(Vehicle, "vehicle");

    await this.fetchFilters(query, filters);

    return await query.getMany();
  }

  /**
   * Adds necessary filters to `FetchVehicle` query
   *
   * @param  {SelectQueryBuilder<Vehicle>} query Query
   * @param  {VehicleListDto} filters Filters
   *
   * @returns {Promise<SelectQueryBuilder<Vehicle>>}
   */
  private async fetchFilters(
    query: SelectQueryBuilder<Vehicle>,
    filters: VehicleListDto
  ): Promise<SelectQueryBuilder<Vehicle>> {
    query = await this.fetchFilterAvailability(query, filters);
    query = await this.fetchFilterDistance(query, filters);

    return query;
  }

  /**
   * Adds availability filter to `FetchVehicle` query
   *
   * @param  {SelectQueryBuilder<Vehicle>} query Query
   * @param  {VehicleListDto} filters Filters
   *
   * @returns {Promise<SelectQueryBuilder<Vehicle>>}
   */
  private async fetchFilterAvailability(
    query: SelectQueryBuilder<Vehicle>,
    filters: VehicleListDto
  ): Promise<SelectQueryBuilder<Vehicle>> {
    if (filters?.available !== undefined) {
      const condition = filters.available ? "AND" : "OR";
      query = query
        .andWhere(
          `is_disabled = :disabled ${condition} is_reserved = :disabled`
        )
        .setParameter("disabled", !filters.available);
    }

    return query;
  }

  /**
   * Adds distance filter to `FetchVehicle` query
   *
   * @param  {SelectQueryBuilder<Vehicle>} query Query
   * @param  {VehicleListDto} filters Filters
   *
   * @returns {Promise<SelectQueryBuilder<Vehicle>>}
   */
  private async fetchFilterDistance(
    query: SelectQueryBuilder<Vehicle>,
    filters: VehicleListDto,
  ): Promise<SelectQueryBuilder<Vehicle>> {
    if (filters?.distance !== undefined) {
      query = query
        .andWhere(`current_range_meters = :distance`)
        .setParameter("distance", filters.distance);
    }

    return query;
  }

  /**
   * Returns a vehicle by its id
   *
   * @param  {string} id Bike id
   *
   * @returns {Promise<Bike | undefined>}
   */
  public async fetchById(id: string): Promise<Vehicle | null> {
    return await (await this._database).getRepository(Vehicle).findOne({
      where: {
        bike_id: id,
      },
      relations: ["price"],
    });
  }

  /**
   * Returns a vehicle by its id
   *
   * @param  {string} id Bike id
   *
   * @returns {Promise<Bike | undefined>}
   * @throws {NotFoundException} If the id does not exists throws a not found error
   */
  @Get("/:id")
  public async fetchByIdOrFail(id: string): Promise<Vehicle> {
    const vehicle = await this.fetchById(id);

    if (vehicle == null) {
      throw new NotFoundException("VEHICLE_NOT_FOUND");
    }

    return vehicle;
  }
}
