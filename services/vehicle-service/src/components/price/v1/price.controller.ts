import * as Axios from "axios";
import { FeedController } from "@components/feed/v1";
import { PriceApiResult, PricePlan } from "./interfaces";
import { NotFoundException } from "@app/exceptions";
import { DataSource } from "typeorm";
import { Database } from "@app/database";
import { Price } from "./entity/price.entity";
import { Get, Route } from "tsoa";

@Route("/v1/price")
export class PriceController {
  private readonly _database: Promise<DataSource>;

  public constructor() {
    this._database = Database.getInstance();
  }

  /**
   * Saves pricing plans to database
   *
   * @returns {Promise<PricePlan[]>}
   */
  public async saveFeed(): Promise<any> {
    const url = (await new FeedController().fetch()).system_pricing_plans;

    const feedData = (
      await Axios.default<PriceApiResult>({
        method: "GET",
        url,
      })
    ).data.data.plans;

    await (await this._database)
      .createQueryBuilder()
      .insert()
      .into(Price)
      .values(feedData)
      .orUpdate([
        "name",
        "currency",
        "price",
        "is_taxable",
        "description",
        "per_min_pricing",
      ])
      .execute();
  }

  /**
   * Returns pricing plans
   *
   * @returns {Promise<PricePlan[]>}
   */
  @Get("/")
  public async fetch(): Promise<PricePlan[]> {
    return await (await this._database).getRepository(Price).find();
  }

  /**
   * Fetches a price by its id
   *
   * @param  {string} id Price Id
   *
   * @returns {Promise<PricePlan | null>}
   */
  public async fetchById(id: string): Promise<PricePlan | null> {
    return await (await this._database).getRepository(Price).findOne({
      where: {
        plan_id: id,
      },
    });
  }

  /**
   * Fetch a price by id Or throws error
   *
   * @param  {string} id Price Id
   *
   * @returns {Promise<PricePlan>}
   * @throws {NotFoundException} If the id is not found an error is thrown
   */
  public async fetchByIdOrFail(id: string): Promise<PricePlan> {
    const plan = await this.fetchById(id);

    if (plan == null) {
      throw new NotFoundException("PRICE_PLAN_NOT_FOUND");
    }

    return plan;
  }
}
