import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

// Import Mqtt utils
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

// Import TranslateConfigService
import { TranslateConfigService } from '@core/translate/translate-config.service';

// Available languages
import Languages from '../assets/data/languages.json';
import { Language } from '@interfaces/language';

// //Mocked Data
// import Data from '../assets/data/mockedData.json';
import { MockedData } from '@interfaces/mockedData';
import { MockedDataService } from './services/mocked-data.service'

// Google Maps
import { } from 'googlemaps';

// Services
import { EnvService } from '@src/app/env.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //Added the ' ? ' to avoid a TS error.
  private subscription?: Subscription;
  topicname: any;
  msg: any;
  isConnected: boolean = false;
  //Added the ' ? ' to avoid a TS error.
  @ViewChild('msglog', { static: true }) msglog: ElementRef | undefined;

  languages: Language[] = Languages;
  alarms?: MockedData[];
  statistics?: MockedData[];

  defaultLanguage: string = 'en';
  currentLanguage: string = 'en';

  @ViewChild('map') mapElement: any;
  //Added the ' ? ' to avoid a TS error.
  map?: google.maps.Map;

  constructor(
    private _mqttService: MqttService,
    private translateService: TranslateConfigService,
    private mockedDataService: MockedDataService,
    public env: EnvService
  ) {
    this.currentLanguage = (!localStorage['language'])
      ? this.defaultLanguage
      : localStorage['language'];
    localStorage['language'] = this.currentLanguage;
    this.translateService.setLanguage(this.currentLanguage);
  }

  ngOnInit(): void {

    this.mockedDataService.getAlarms().subscribe( response => this.alarms = response)
    this.mockedDataService.getStatistics().subscribe( response => this.statistics = response)

  }

  ngOnDestroy(): void {
    //Added the ' ? ' to avoid a TS error.
    this.subscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(41.3557018,2.1293387),
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }

  changeLanguage(event: any) {
    this.currentLanguage = event.detail.value;
    localStorage['language'] = this.currentLanguage;
    this.translateService.setLanguage(this.currentLanguage);
    window.location.href = window.location.href;
  }

  subscribeNewTopic(): void {
    console.log('inside subscribe new topic')
    this.subscription = this._mqttService.observe(this.topicname).subscribe((message: IMqttMessage) => {
      this.msg = message;
      console.log('msg: ', message)
      this.logMsg('Message: ' + message.payload.toString() + ' for topic: ' + message.topic);
    });
    this.logMsg('subscribed to topic: ' + this.topicname);
  }

  sendmsg(): void {
    // use unsafe publish for non-ssl websockets
    this._mqttService.unsafePublish(this.topicname, this.msg, { qos: 1, retain: true });
    this.msg = '';
  }
  
  logMsg(message:any): void {
    //Added this if bc a TS error
    if(this.msglog)this.msglog.nativeElement.innerHTML += '<br><hr>' + message;
  }

  clear(): void {
    //Added this if bc a TS error
    if(this.msglog)this.msglog.nativeElement.innerHTML = '';
  }
}
