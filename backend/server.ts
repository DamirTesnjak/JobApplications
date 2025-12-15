import express from 'express';
import multer from "multer";
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { deleteEmailTemplate } from './serverEndpoints/deleteEmailTemplate';
import { createCandidate } from './serverEndpoints/createCandidate';
import { createCompanyEmailConfiguration } from './serverEndpoints/createCompanyEmailConfiguration';
import { createEmailTemplate } from './serverEndpoints/createEmailTemplate';
import { createHrUser } from './serverEndpoints/createHrUser';
import { deleteProfileInfo } from './serverEndpoints/deleteProfileInfo';
import { getCandidateProfile } from './serverEndpoints/getCandidateProfile';
import { getCandidates } from './serverEndpoints/getCandidates';
import { getEmailTemplate } from './serverEndpoints/getEmailTemplate';
import { getEmailTemplates } from './serverEndpoints/getEmailTemplates';
import { getHrUserProfile } from './serverEndpoints/getHrUserProfile';
import { loginHrUser } from './serverEndpoints/loginHrUser';
import { logoutHrUser } from './serverEndpoints/logoutHrUser';
import { mapEmailTemplates } from './serverEndpoints/mapEmailTemplates';
import { updateCandidate } from './serverEndpoints/updateCandidate';
import { updateEmailTemplate } from './serverEndpoints/updateEmailTemplate';
import { updateHrUser } from './serverEndpoints/updateHrUser';
import { verifyEmail } from './serverEndpoints/veritifyEmail';
import { sendEmail } from './serverEndpoints/sendEmail';

const app = express();
const upload = multer();

app.use(cors());
app.options('http://localhost:4200', cors()) // include before other routes

app.use(express.json());
app.use(cookieParser());

// Deletes email template
app.post('/api/email_template/delete', async (req: any, res: any) => {
  deleteEmailTemplate(req, res);
});

app.post('/api/createCandidate', upload.any(), async (req: any, res: any) => {
  createCandidate(req, res);
});

app.post('/api/createCompanyEmailConfiguration', async (req: any, res: any) => {
  createCompanyEmailConfiguration(req, res);
});

app.post('/api/createEmailTemplate', upload.any(), async (req: any, res: any) => {
  createEmailTemplate(req, res);
});

app.post('/api/createHrUser', upload.any(), async (req: any, res: any) => {
  createHrUser(req, res);
});

app.post('/api/deleteProfileInfo', async (req: any, res: any) => {
  deleteProfileInfo(req, res);
});

app.post('/api/getCandidateProfile', async (req: any, res: any) => {
  getCandidateProfile(req, res);
});

app.post('/api/getCandidates', async (req: any, res: any) => {
  getCandidates(req, res);
});

app.post('/api/getEmailTemplate', async (req: any, res: any) => {
  getEmailTemplate(req, res);
});

app.post('/api/getEmailTemplates', async (req: any, res: any) => {
  getEmailTemplates(req, res);
});

app.post('/api/getHrUserProfile', async (req: any, res: any) => {
  getHrUserProfile(req, res);
});

app.post('/api/loginHrUser', async (req: any, res: any) => {
  loginHrUser(req, res);
});

app.post('/api/logoutHrUser', async (req: any, res: any) => {
  logoutHrUser(req, res);
});

app.post('/api/mapEmailTemplates', async (req: any, res: any) => {
  mapEmailTemplates(req, res);
});

app.post('/api/updateCandidate', upload.any(), async (req: any, res: any) => {
  updateCandidate(req, res);
});

app.post('/api/updateEmailTemplate', async (req: any, res: any) => {
  updateEmailTemplate(req, res);
});

app.post('/api/updateHrUser', upload.any(), async (req: any, res: any) => {
  updateHrUser(req, res);
});

app.post('/api/verifyEmail', async (req: any, res: any) => {
  verifyEmail(req, res);
});

app.post('/api/sendEmail', async (req: any, res: any) => {
  sendEmail(req, res);
});

const port = process.env['PORT'] || 5000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
