#include <Arduino.h>
#include <WiFi.h>
#include <LittleFS.h>
#include <ESPAsyncWebServer.h>
#include <AsyncTCP.h>

AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

const char* ssid = "TwojeSSID";
const char* password = "TwojeHASLO";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nPołączono, IP: ");
  Serial.println(WiFi.localIP());

  if(!LittleFS.begin()){
    Serial.println("Błąd montowania LittleFS");
    return;
  }

  server.serveStatic("/", LittleFS, "/").setDefaultFile("index.html");

  server.on("/api/tare", HTTP_POST, [](AsyncWebServerRequest *request){
    request->send(200, "text/plain", "TARE");
  });
  server.on("/api/start", HTTP_POST, [](AsyncWebServerRequest *request){
    request->send(200, "text/plain", "START");
  });
  server.on("/api/stop", HTTP_POST, [](AsyncWebServerRequest *request){
    request->send(200, "text/plain", "STOP");
  });

  ws.onEvent([](AsyncWebSocket * server, AsyncWebSocketClient * client,
                AwsEventType type, void * arg, uint8_t *data, size_t len){
    if(type == WS_EVT_CONNECT){
      Serial.println("WS client connected");
    }
  });
  server.addHandler(&ws);

  server.begin();
}

void loop() {
  static unsigned long last = 0;
  if(millis() - last > 1000){
    last = millis();
    String msg = "{\"time\":" + String(millis()) +
                 ",\"force\":" + String(random(10,50)) + "}";
    ws.textAll(msg);
  }
}
