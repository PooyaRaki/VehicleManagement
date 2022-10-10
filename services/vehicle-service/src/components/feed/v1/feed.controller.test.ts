import { FeedController } from "./feed.controller";

describe("Fetching feed data", () => {
  jest.setTimeout(20000);
  test("Should return available feed urls", async () => {
    const result = await new FeedController().fetch();

    expect(result && typeof result === "object").toBe(true);
    expect(result).toHaveProperty("gbfs_versions");
    expect(result.gbfs_versions).not.toBeFalsy();
    expect(result.system_information).not.toBeFalsy();
    expect(result.free_bike_status).not.toBeFalsy();
  });
});
