import * as jwt from 'jsonwebtoken';

export async function getDataFromToken(req: Express.Request) {
    try {
        const cookieHeader = req.headers.cookie || '';
        const tokenMatch = cookieHeader
            .split(';')
            .find((c) => c.trim().startsWith('token='));
        const token = tokenMatch ? tokenMatch.split('=')[1] : '';

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