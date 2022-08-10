import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { supportedLanguages } from '@shared/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  constructor(private translateService: TranslateService) { }

    getDefaultLanguage(){
        let language = this.translateService.getBrowserLang();

        if (!supportedLanguages().includes('en')) {
            language = 'en';
        }

        this.translateService.setDefaultLang('en');
        return language;
    }

    getCurrentLanguage() {
        return this.translateService.currentLang;
    }

    setLanguage(language: string) {
        this.translateService.use(language);
    }
}