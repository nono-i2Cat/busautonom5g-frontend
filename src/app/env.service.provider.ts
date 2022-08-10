import { EnvService } from './env.service';

export const EnvServiceFactory = () => {
  // Create env
  const env:any = new EnvService();

  // Read environment variables from browser window
  const browserWindow:any = window || {};
  console.log(browserWindow);
  const browserWindowEnv:any = browserWindow['__env'] || {};
  console.log(browserWindowEnv);

  // Assign environment variables from browser window to env
  // In the current implementation, properties from env.js overwrite defaults from the EnvService.
  // If needed, a deep merge can be performed here to merge properties instead of overwriting them.
  for (const key in browserWindowEnv) {
    if (browserWindowEnv.hasOwnProperty(key)) {
      env[key] = window['__env'][key];
    }
  }
  console.log(env);
  return env;
};

export const EnvServiceProvider = {
  provide: EnvService,
  useFactory: EnvServiceFactory,
  deps: [],
};
