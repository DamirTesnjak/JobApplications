import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

app.use(express.json());

// Deletes email template
app.post('api/email_template/delete'), async (req: any, res: any) => {
  deleteEmailTemplate(req, res);
};

app.post('api/createCandidate'), async (req: any, res: any) => {
  createCandidate(req, res);
}

app.post('api/createCompanyEmailConfiguration'), async (req: any, res: any) => {
  createCompanyEmailConfiguration(req, res);
}

app.post('api/createEmailTemplate'), async (req: any, res: any) => {
  createEmailTemplate(req, res);
}

app.post('api/createHrUser'), async (req: any, res: any) => {
  createHrUser(req, res);
}

app.post('api/deleteProfileInfo'), async (req: any, res: any) => {
  deleteProfileInfo(req, res);
}

app.post('api/getCandidateProfile'), async (req: any, res: any) => {
  getCandidateProfile(req, res);
}

app.post('api/getCandidates'), async (req: any, res: any) => {
  getCandidates(req, res);
}

app.post('api/getEmailTemplate'), async (req: any, res: any) => {
  getEmailTemplate(req, res);
}

app.post('api/getEmailTemplates'), async (req: any, res: any) => {
  getEmailTemplates(req, res);
}

app.post('api/getHrUserProfile'), async (req: any, res: any) => {
  getHrUserProfile(req, res);
}

app.post('api/loginHrUser'), async (req: any, res: any) => {
  loginHrUser(req, res);
}

app.post('api/logoutHrUser'), async (req: any, res: any) => {
  logoutHrUser(req, res);
}

app.post('api/mapEmailTemplates'), async (req: any, res: any) => {
  mapEmailTemplates(req, res);
}

app.post('api/updateCandidate'), async (req: any, res: any) => {
  updateCandidate(req, res);
}

app.post('api/updateEmailTemplate'), async (req: any, res: any) => {
  updateEmailTemplate(req, res);
}

app.post('api/updateHrUser'), async (req: any, res: any) => {
  updateHrUser(req, res);
}

app.post('api/verifyEmail'), async (req: any, res: any) => {
  verifyEmail(req, res);
}

app.post('api/sendEmail'), async (req: any, res: any) => {
  sendEmail(req, res);
}

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
