import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

@Component({
  selector: 'app-keyapp',
  template: `
    <div *ngFor="let item of {'b': 1, 'a': 1} | keyvalue">
      {{ item.key }} - {{ item.value }}
    </div>
  `,
})
export class KeyApp {
    
}

