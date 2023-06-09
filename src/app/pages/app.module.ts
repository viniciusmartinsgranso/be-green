import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { POSITION_OPTIONS } from '@ng-web-apis/geolocation';
import { NgxMaskModule } from 'ngx-mask';
import { firebaseConfig } from '../../environments/firebaseconfig';
import { NavbarComponent } from '../components/navbar/navbar.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: POSITION_OPTIONS, useValue: { enableHighAccuracy: true, timeout: 3000, maximumAge: 1000 },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
