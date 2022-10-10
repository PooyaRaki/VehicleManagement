import { FeedController } from "@components/feed/v1";

export const parseFeed = async (): Promise<void> => {
  const controller = new FeedController();

  await controller.save();

  console.log("Data has been fetched");
};
