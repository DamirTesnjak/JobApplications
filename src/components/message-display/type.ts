import { ICandidateSchema } from "../../utils/dbConfig/models/candidateModel";
import { IEmailTemplateSchema } from "../../utils/dbConfig/models/emailTemplateModel";

export interface ITableData extends ICandidateSchema, IEmailTemplateSchema { }