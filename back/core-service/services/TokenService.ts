import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { Token } from "../models/Token";
import { Types } from 'mongoose';

dotenv.config();

export const generateToken = async (userID: string, tokenType: string) => {
    const secret = tokenType === 'access' ? process.env.ACCESS_TOKEN_SECRET : 'default';
    const expiresIn = tokenType === 'access' ? '15m' : '1d';
    
    if (!secret) {
        throw new Error("Token secret not configured");
    }
    if(tokenType === 'access'){
        return jwt.sign(
            { userID },
            secret,
            { expiresIn: expiresIn }
        );
    }
    else{
        const refreshToken = crypto.randomBytes(64).toString("hex");
        return refreshToken;
    }
};

export const verifyToken = async (token: string, tokenType: string) => {  
    if (tokenType === "access") {
        try {
            const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as { userID: string };
            return decoded.userID;
            }
        catch (err) {
            return false;
        }
    }
    if (tokenType === "refresh") {
        const storedToken = await Token.findOne({ token });
        if (!storedToken){
            return false;
        }
        if (new Date(storedToken.expiresAt) < new Date()) {
            await deleteToken(storedToken._id);
            return false;
        }
        return true;
    }
    return false;
};

export const deleteToken = async (tokenID: Types.ObjectId) => {
    try{
        await Token.deleteOne({ _id: tokenID });
    }
    catch(err){
        throw new Error(err instanceof Error ? err.message : "Unknown error");
    }
};

export const deleteUserTokens = async (userID: string, session?: any) => {
    try {
        const filter = { userID: new Types.ObjectId(userID) };
        if (session) {
            await Token.deleteMany(filter, { session });
        } else {
            await Token.deleteMany(filter);
        }
        console.log(`All tokens for user ID ${userID} have been deleted.`);
    } catch (err) {
        throw new Error(err instanceof Error ? err.message : "Failed to delete user tokens");
    }
};

export const refreshAccessToken = async (userID: string, oldRefreshToken: string) => {
    //Validate old refresh token
    if(! await verifyToken(oldRefreshToken, 'refresh')){
        throw new Error("Invalid refresh token");
    }
    
    //Delete old refresh token
    const oldToken = await Token.findOne({ userID, token: oldRefreshToken });
    deleteToken(oldToken!._id);

    //Generate and store new refresh token
    const newRefreshToken = await generateToken(userID, 'refresh');
    const expiresInMs = 24 * 60 * 60 * 1000; //1 day
    await storeRefreshToken(newRefreshToken, userID, expiresInMs);

    //Generate new access token
    const newAccessToken = await generateToken(userID, 'access');
    return {
        message: "New access token generated",
        newAccessToken,
        newRefreshToken
    };
};

export const storeRefreshToken = async (token: string, userID: string, expiresInMs: number) => {
    try {
        const expiresAt = new Date(Date.now() + expiresInMs);

        const stored = await Token.create({
            userID: userID,
            token: token,
            expiresAt: expiresAt
        });
        return { success: true, tokenID: stored._id };
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            console.error(err.stack);
        } else {
            console.error("Unknown error:", err);
        }
        return { success: false, error: err };
    }
};
