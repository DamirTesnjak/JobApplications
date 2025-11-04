const mongooseImport = import('mongoose');
const mongoose = await mongooseImport;

export type Model<T = any> = typeof mongoose.Model<T>;

export type Types = typeof mongoose.Types;
const createConnection = mongoose.createConnection;
export { createConnection };