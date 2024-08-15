import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { NbThemeModule, NbButtonModule, NbSidebarModule, NbDialogModule, NbDialogRef } from '@nebular/theme';



appConfig.providers = [...appConfig.providers,

...NbSidebarModule.forRoot().providers ?? [],

...NbThemeModule.forRoot({ name: 'default' }).providers ?? [],

...NbDialogModule.forRoot().providers ?? [],



]


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
