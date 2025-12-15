import * as jwt from 'jsonwebtoken';

export function getDataFromToken(req: { cookies: { [x: string]: string; }; }) {
    try {
        const token = req.cookies["token"] || '';

        if (!token) {
            console.log('No token found');
            return null;
        }

        const decodedToken = jwt.verify(token, process.env['TOKEN_SECRET']!) as jwt.JwtPayload;
        return decodedToken;
    } catch (_error: unknown) {
        console.log('Token not found!');
        return;
    }
}