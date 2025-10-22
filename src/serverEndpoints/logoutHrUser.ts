export async function logoutHrUser(req: any, res: any) {
    res.setHeader('Set-Cookie', 'token=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly');

    return res.status(200).json({
        success: true,
    });
}
