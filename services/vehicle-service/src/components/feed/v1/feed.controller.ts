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
    public async fetch(): Promise<FeedOutput>
    {
        const feedData = await this.fetchFeedData();

        return await this.parseFeedData(feedData);
    }

    /**
     * Sends a request to the endpoint to get feed data
     *
     * @returns {Promise<FeedApiResult>} Raw data from the endpoint
     */
    private async fetchFeedData(): Promise<FeedApiResult>
    {
        return (await Axios.default<FeedApiResult>({
            method: 'GET',
            url: ApiConfig.feed,
        })).data;
    }

    /**
     * Turns raw feed data into a usable format
     *
     * @param  {FeedApiResult} result Raw feed data
     *
     * @returns {Promise<FeedOutput>}
     */
    private async parseFeedData(result: FeedApiResult): Promise<FeedOutput>
    {
        const feeds = result.data.en.feeds;
        const output: Partial<FeedOutput> = {};

        for (let feed of feeds) {
            await this.fetchVehicleTypesUrl(feed, output);
            await this.fetchGbfsVersionsUrl(feed, output);
            await this.fetchStationStatusUrl(feed, output);
            await this.fetchFreeBikeStatusUrl(feed, output);
            await this.fetchGeoFencingZonesUrl(feed, output);
            await this.fetchSystemInformationUrl(feed, output);
            await this.fetchSystemPricingPlansUrl(feed, output);
            await this.fetchStationInformationUrl(feed, output);
        }

        return <FeedOutput> output;
    }

    private async fetchSystemInformationUrl(feed: FeedAddress, output: Partial<FeedOutput>): Promise<void>
    {
        if (feed.name === 'system_information') {
            output.system_information = feed.url;
        }
    }

    private async fetchFreeBikeStatusUrl(feed: FeedAddress, output: Partial<FeedOutput>): Promise<void>
    {
        if (feed.name === 'free_bike_status') {
            output.free_bike_status = feed.url;
        }
    }

    private async fetchVehicleTypesUrl(feed: FeedAddress, output: Partial<FeedOutput>): Promise<void>
    {
        if (feed.name === 'vehicle_types') {
            output.vehicle_types = feed.url;
        }
    }

    private async fetchSystemPricingPlansUrl(feed: FeedAddress, output: Partial<FeedOutput>): Promise<void>
    {
        if (feed.name === 'system_pricing_plans') {
            output.system_pricing_plans = feed.url;
        }
    }

    private async fetchStationInformationUrl(feed: FeedAddress, output: Partial<FeedOutput>): Promise<void>
    {
        if (feed.name === 'station_information') {
            output.station_information = feed.url;
        }
    }

    private async fetchStationStatusUrl(feed: FeedAddress, output: Partial<FeedOutput>): Promise<void>
    {
        if (feed.name === 'station_status') {
            output.station_status = feed.url;
        }
    }

    private async fetchGeoFencingZonesUrl(feed: FeedAddress, output: Partial<FeedOutput>): Promise<void>
    {
        if (feed.name === 'geofencing_zones') {
            output.geofencing_zones = feed.url;
        }
    }

    private async fetchGbfsVersionsUrl(feed: FeedAddress, output: Partial<FeedOutput>): Promise<void>
    {
        if (feed.name === 'gbfs_versions') {
            output.gbfs_versions = feed.url;
        }
    }

    public async savePrice(): Promise<boolean>
    {
        const controller = new PriceController();

        return await controller.saveFeed();
    }

    public async saveVehicle(): Promise<boolean>
    {
        const controller = new VehicleController();

        return await controller.saveFeed();
    }

    @Get('/save')
    public async save(): Promise<boolean>
    {
        await this.savePrice();
        await this.saveVehicle();

        return true;
    }
}