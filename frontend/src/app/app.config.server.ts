import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, mergeApplicationConfig } from "@angular/core";
import { provideServerRendering } from "@angular/platform-server";
import { provideServerRouting } from "@angular/ssr";
import { appConfig } from "./app.config";
import { serverRoutes } from "./app.routes.server";


const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    provideHttpClient(),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
