import {StreamChat} from 'stream-chat';
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.log("Stream API key or secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

//Get the user data and save it in stream application (Video call application)
export const upsertStreamUser = async (userData) => {
    try {
       await streamClient.upsertUsers([userData]) 
       return userData
    } catch (error) {
        console.log("Error in upserting StreamUser", error);
    }
};


// todo :do it later
export const generateStreamToken = (userId) => {

try {
    // ensure userId is a string
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
} catch (error) {
    console.error("Error generating Stream token:", error);
}

};
