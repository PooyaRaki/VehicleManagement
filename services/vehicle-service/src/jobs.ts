import cron from "node-cron";
import { parseFeed } from "@jobs/parseFeed";

// @todo Push to a worker thread
export const CronJobs = async (): Promise<void> => {
  await startCron();

  cron.schedule("* * * * *", async (): Promise<void> => {
    await parseFeed();
  });
};

const startCron = async (): Promise<void> => {
  await parseFeed();
};
