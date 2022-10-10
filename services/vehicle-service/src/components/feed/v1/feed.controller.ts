import * as Axios from "axios";
import { ApiConfig } from "@utils/config";
import { FeedOutput, FeedApiResult, FeedAddress } from "./intefaces";
import { VehicleController } from "@components/bike/v1";
import { PriceController } from "@components/price/v1/price.controller";
import { Get } from "tsoa";

export class FeedController {
  /**
   * Returns feed data in an easily consumable format
   *
   * @returns {Promise<FeedOutput>}
   */
  public async fetch(): Promise<FeedOutput> {
    const feedData = await this.fetchFeedData();

    return await this.parseFeedData(feedData);
  }

  /**
   * Sends a request to the endpoint to get feed data
   *
   * @returns {Promise<FeedApiResult>} Raw data from the endpoint
   */
  private async fetchFeedData(): Promise<FeedApiResult> {
    return (
      await Axios.default<FeedApiResult>({
        method: "GET",
        url: ApiConfig.feed,
      })
    ).data;
  }

  /**
   * Turns raw feed data into a usable format
   *
   * @param  {FeedApiResult} result Raw feed data
   *
   * @returns {Promise<FeedOutput>}
   */
  private async parseFeedData(result: FeedApiResult): Promise<FeedOutput> {
    const feeds = result.data.en.feeds;
    const output: Partial<FeedOutput> = {};

    for (const feed of feeds) {
      await this.fetchVehicleTypesUrl(feed, output);
      await this.fetchGbfsVersionsUrl(feed, output);
      await this.fetchStationStatusUrl(feed, output);
      await this.fetchFreeBikeStatusUrl(feed, output);
      await this.fetchGeoFencingZonesUrl(feed, output);
      await this.fetchSystemInformationUrl(feed, output);
      await this.fetchSystemPricingPlansUrl(feed, output);
      await this.fetchStationInformationUrl(feed, output);
    }

    return <FeedOutput>output;
  }

  /**
   * Returns system information url fetched from the main feed
   *
   * @param  {FeedAddress} feed Main feed object
   * @param  {Partial<FeedOutput>} output output object
   *
   * @returns {Promise<void>}
   */
  private async fetchSystemInformationUrl(
    feed: FeedAddress,
    output: Partial<FeedOutput>
  ): Promise<void> {
    if (feed.name === "system_information") {
      output.system_information = feed.url;
    }
  }

  /**
   * Returns free bike information url fetched from the main feed
   *
   * @param  {FeedAddress} feed Main feed object
   * @param  {Partial<FeedOutput>} output output object
   *
   * @returns {Promise<void>}
   */
  private async fetchFreeBikeStatusUrl(
    feed: FeedAddress,
    output: Partial<FeedOutput>
  ): Promise<void> {
    if (feed.name === "free_bike_status") {
      output.free_bike_status = feed.url;
    }
  }

  /**
   * Returns vehicle type information url fetched from the main feed
   *
   * @param  {FeedAddress} feed Main feed object
   * @param  {Partial<FeedOutput>} output output object
   *
   * @returns {Promise<void>}
   */
  private async fetchVehicleTypesUrl(
    feed: FeedAddress,
    output: Partial<FeedOutput>
  ): Promise<void> {
    if (feed.name === "vehicle_types") {
      output.vehicle_types = feed.url;
    }
  }

  /**
   * Returns pricing information url fetched from the main feed
   *
   * @param  {FeedAddress} feed Main feed object
   * @param  {Partial<FeedOutput>} output output object
   *
   * @returns {Promise<void>}
   */
  private async fetchSystemPricingPlansUrl(
    feed: FeedAddress,
    output: Partial<FeedOutput>
  ): Promise<void> {
    if (feed.name === "system_pricing_plans") {
      output.system_pricing_plans = feed.url;
    }
  }

  /**
   * Returns station information url fetched from the main feed
   *
   * @param  {FeedAddress} feed Main feed object
   * @param  {Partial<FeedOutput>} output output object
   *
   * @returns {Promise<void>}
   */
  private async fetchStationInformationUrl(
    feed: FeedAddress,
    output: Partial<FeedOutput>
  ): Promise<void> {
    if (feed.name === "station_information") {
      output.station_information = feed.url;
    }
  }

  /**
   * Returns station status information url fetched from the main feed
   *
   * @param  {FeedAddress} feed Main feed object
   * @param  {Partial<FeedOutput>} output output object
   *
   * @returns {Promise<void>}
   */
  private async fetchStationStatusUrl(
    feed: FeedAddress,
    output: Partial<FeedOutput>
  ): Promise<void> {
    if (feed.name === "station_status") {
      output.station_status = feed.url;
    }
  }

  /**
   * Returns geo fencing zones information url fetched from the main feed
   *
   * @param  {FeedAddress} feed Main feed object
   * @param  {Partial<FeedOutput>} output output object
   *
   * @returns {Promise<void>}
   */
  private async fetchGeoFencingZonesUrl(
    feed: FeedAddress,
    output: Partial<FeedOutput>
  ): Promise<void> {
    if (feed.name === "geofencing_zones") {
      output.geofencing_zones = feed.url;
    }
  }

  /**
   * Returns GBFS version information url fetched from the main feed
   *
   * @param  {FeedAddress} feed Main feed object
   * @param  {Partial<FeedOutput>} output output object
   *
   * @returns {Promise<void>}
   */
  private async fetchGbfsVersionsUrl(
    feed: FeedAddress,
    output: Partial<FeedOutput>
  ): Promise<void> {
    if (feed.name === "gbfs_versions") {
      output.gbfs_versions = feed.url;
    }
  }

  /**
   * Saves pricing data to database
   *
   * @returns {Promise<boolean>}
   */
  public async savePrice(): Promise<boolean> {
    const controller = new PriceController();

    return await controller.saveFeed();
  }

  /**
   * Saves vehicle data to database
   *
   * @returns {Promise<boolean>}
   */
  public async saveVehicle(): Promise<boolean> {
    const controller = new VehicleController();

    return await controller.saveFeed();
  }

  /**
   * Saves necessary feed data to database
   *
   * @returns {Promise<boolean>}
   */
  @Get("/save")
  public async save(): Promise<boolean> {
    await this.savePrice();
    await this.saveVehicle();

    return true;
  }
}
