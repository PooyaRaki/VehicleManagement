import cron from 'node-cron';
import { parseFeed } from '@jobs/parseFeed';


// @todo Push to a worker thread
export const CronJobs = async () => {
    await startCron();

    cron.schedule('* * * * *', async () => {
        await parseFeed();
    });
}

const startCron = async () => {
    await parseFeed();
}