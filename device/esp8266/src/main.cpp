#include <Arduino.h>
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <Hash.h>
#include <SparkFunBME280.h>
#include <WebSocketsClient.h>
#include <Wire.h>

char buffer[128];
const char* ssid = "linksys";
const char* password = "";
const char* host = "192.168.1.100";
BME280 mySensor;
WebSocketsClient webSocket;
StaticJsonDocument<120> jsonObjTemp;

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {

	switch(type) {
		case WStype_DISCONNECTED:
			Serial.printf("[WSc] Disconnected!\n");
			break;
		case WStype_CONNECTED: {
			Serial.printf("[WSc] Connected to url: %s\n", payload);

			// send message to server when Connected
			webSocket.sendTXT("Connected");
		}
			break;
		case WStype_TEXT:
			Serial.printf("[WSc] get text: %s\n", payload);

			// send message to server
			// webSocket.sendTXT("message here");
			break;
		case WStype_BIN:
			Serial.printf("[WSc] get binary length: %u\n", length);
			hexdump(payload, length);

			// send data to server
			// webSocket.sendBIN(payload, length);
			break;
        case WStype_PING:
            // pong will be send automatically
            Serial.printf("[WSc] get ping\n");
            break;
        case WStype_PONG:
            // answer to a ping we send
            Serial.printf("[WSc] get pong\n");
            break;
    }
}

void setup() {
	Serial.begin(115200);
 	Wire.begin(0, 2);
	mySensor.setI2CAddress(0x76);
  	mySensor.beginI2C();
  	mySensor.setFilter(0); //0 to 4 is valid. Filter coefficient. See 3.4.4
  	mySensor.setStandbyTime(5); //0 to 7 valid. Time between readings. See table 27.
  	mySensor.setTempOverSample(1); //0 to 16 are valid. 0 disables temp sensing. See table 24.
  	mySensor.setPressureOverSample(1); //0 to 16 are valid. 0 disables pressure sensing. See table 23.
  	mySensor.setHumidityOverSample(1); //0 to 16 are valid. 0 disables humidity sensing. See table 19.
  	mySensor.setMode(MODE_NORMAL);
	//Serial.setDebugOutput(true);

	WiFi.begin(ssid, password);
	IPAddress ip(192,168,1,101);
	IPAddress gateway(192,168,1,254);
	IPAddress subnet(255,255,255,0);
	WiFi.config(ip, gateway, subnet);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
	Serial.println(WiFi.localIP());
    Serial.println(" connected");

	webSocket.begin("192.168.1.100", 8080, "/");

	webSocket.onEvent(webSocketEvent);

	//webSocket.setAuthorization("user", "Password");

	webSocket.setReconnectInterval(5000);
  
  // start heartbeat (optional)
  // ping server every 15000 ms
  // expect pong from server within 3000 ms
  // consider connection disconnected if pong is not received 2 times
  //webSocket.enableHeartbeat(15000, 3000, 2);

}

String getTempHum(float temp, float humid, float press){
	jsonObjTemp["command"].set("save");
    jsonObjTemp["temperature"].set(trunc(10 * temp) / 10);
    jsonObjTemp["humidity"].set(trunc(10 * humid) / 10);
    jsonObjTemp["pressure"].set(trunc(10 * press) / 10);
    serializeJson(jsonObjTemp, buffer);
    return (String)buffer;
}

void loop() {
	webSocket.loop();
	webSocket.sendTXT(getTempHum(mySensor.readTempC(), mySensor.readFloatHumidity(), mySensor.readFloatPressure()/100).c_str());
    delay(5000);
}