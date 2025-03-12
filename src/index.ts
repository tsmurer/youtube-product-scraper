import { getChannelIdFromHandle } from "./youtube";

const channelHandles = ['@TechDweeb', '@MINDTHEHEADPHONE', '@crin']

async function main(channelHandles: string[]) {
    for (const handle of channelHandles) {
      const channelId = await getChannelIdFromHandle(handle);
      if (channelId) {
        console.log(`Channel ID for ${handle}: ${channelId}`);
      } else {
        console.log(`Could not find channel ID for ${handle}`);
      }
    }
  }

main(channelHandles);