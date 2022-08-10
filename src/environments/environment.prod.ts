export const environment = {
  production: true
};

import { IMqttServiceOptions } from 'ngx-mqtt';
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'localhost',
  port: 9001,
  path: '/mqtt'
}
