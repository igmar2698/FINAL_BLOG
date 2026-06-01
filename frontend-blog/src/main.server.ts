import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { config } from './app/app.config.server';

// İŞTE YENİ NESİL KURAL: 'context' (kimlik) zorunluluğu
const bootstrap = (context: BootstrapContext) => bootstrapApplication(AppComponent, config, context);

export default bootstrap;