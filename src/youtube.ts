import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.YOUTUBE_API_KEY;

if (!apiKey) {
  console.error('YouTube API key not found in .env file.');
  process.exit(1);
}


export async function getChannelIdFromHandle(channelHandle: string): Promise<string | null> {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${channelHandle}&type=channel`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.items && data.items.length > 0) {
        return data.items[0].id.channelId;
      }
      return null;
    } catch (error) {
      console.error('Error getting channel ID:', error);
      return null;
    }
  }

  async function getVideoIdsFromChannel(channelId: string): Promise<string[]> {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&type=video&maxResults=50`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.items) {
        return data.items.map((item: any) => item.id.videoId);
      }
      return [];
    } catch (error) {
      console.error('Error getting video IDs:', error);
      return [];
    }
  }