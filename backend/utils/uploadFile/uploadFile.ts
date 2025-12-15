export const uploadFile = async (
    file: Express.Multer.File | undefined | null,
    type: string,
) => {
    if (!file) return null;

    return {
        file: {
            name: file.originalname,
            data: file.buffer.toString("base64"),
            contentType: file.mimetype,
            size: file.size,
            type,
        },
    };
};
