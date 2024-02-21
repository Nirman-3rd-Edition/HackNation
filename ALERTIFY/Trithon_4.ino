#include <MPU6050_tockn.h>
#include <Wire.h>
#include <DHT.h>
#include <WiFi.h>
#include <Adafruit_BusIO_Register.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <pgmspace.h>

 

#define THINGNAME "nirman"
#define LED 23
#define DHTPIN 14
#define DHTTYPE DHT11 // change this
const char *ssid  = "HiFi";      // change this
const char *password = "pallu1600";  // change this
const char AWS_IOT_ENDPOINT[] = "amk1ncteagdfh-ats.iot.ap-south-1.amazonaws.com"; // change this

// Amazon Root CA 1
static const char AWS_CERT_CA[] PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6
b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv
b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj
ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM
9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw
IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6
VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L
93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm
jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC
AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA
A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI
U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs
N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv
o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU
5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy
rqXRfboQnoZsG4q5WTP468SQvvG5
-----END CERTIFICATE-----

)EOF";

// Device Certificate //change this
static const char AWS_CERT_CRT[] PROGMEM = R"KEY(
-----BEGIN CERTIFICATE-----
MIIDWTCCAkGgAwIBAgIUU42HNV5Z9QEpTjx5jR1nDnUIGH8wDQYJKoZIhvcNAQEL
BQAwTTFLMEkGA1UECwxCQW1hem9uIFdlYiBTZXJ2aWNlcyBPPUFtYXpvbi5jb20g
SW5jLiBMPVNlYXR0bGUgU1Q9V2FzaGluZ3RvbiBDPVVTMB4XDTI0MDIyMDE5Mzcz
N1oXDTQ5MTIzMTIzNTk1OVowHjEcMBoGA1UEAwwTQVdTIElvVCBDZXJ0aWZpY2F0
ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANAOKavvhhUgSfXP8Vdy
lNLYttmIlDmQVbEefZm8JWZEvyXy2+dJi0jN9bA0wMkheYQVOBcaErJeTZga8fAR
7CIpYH/tVlrVwqstQeGsywbIecaZKD2jV0ekqM6+w57/GmRjgOKTCM7gscEMimdy
U6x7LiFmyajtGU15mYFJ/i01k4v6/eBgacNFQfsf3xSxg1Htos2pI5bw43ti60KL
e27cx+vY/V4tlS2pTzvIwZ4iqCI0HziysTCRjcE0i2WMHrWJQNrnX7lLv4nMMPc7
h7jwOkUT5q5IphzJIfBvPsEQoSIRzomxOkkXRd6J62yDhR31WIJTuvGq5CaWYBxV
2CkCAwEAAaNgMF4wHwYDVR0jBBgwFoAUUXo4lFANrNPqaj3s48cmxpYgEyIwHQYD
VR0OBBYEFLXkvl/UGzSqi0AA7EAnsjJQV70sMAwGA1UdEwEB/wQCMAAwDgYDVR0P
AQH/BAQDAgeAMA0GCSqGSIb3DQEBCwUAA4IBAQAU2wK1k6uphpMkv4U0gPQItmzP
MrnrQhaCkGrPeaXUgiDlbozzbXEHzjpxvmuUjDCV9Ipe06Usftid6QzlXsKUWJMG
G2uXXGhtPlNL1DL+c9UzNH/N8mMbly+yW6AjEHVsxoDC7Y4ftPT6+8QcCzi6Nmpq
0Lz92VYx9Ukq0WtN5/KM0XGaQfAcoQNTkWYLB5wEvluzCdu8zmdoroFWZgfOTU6E
CZcFWymBAVw9XVIaO/sNbXXN/fyDytUi+nTUdPb7ac8GVJIVfHBqAd6VUd9peELB
abEI30N0NltTWuVfWiMzzh0DMhGYORzriPGfnmM/X0R40WCCObTa/ax1Zx4n
-----END CERTIFICATE-----

)KEY";

// Device PRIVATE Key //change this
static const char AWS_CERT_PRIVATE[] PROGMEM = R"KEY(
    -----BEGIN RSA PRIVATE KEY-----
MIIEpgIBAAKCAQEA0A4pq++GFSBJ9c/xV3KU0ti22YiUOZBVsR59mbwlZkS/JfLb
50mLSM31sDTAySF5hBU4FxoSsl5NmBrx8BHsIilgf+1WWtXCqy1B4azLBsh5xpko
PaNXR6Sozr7Dnv8aZGOA4pMIzuCxwQyKZ3JTrHsuIWbJqO0ZTXmZgUn+LTWTi/r9
4GBpw0VB+x/fFLGDUe2izakjlvDje2LrQot7btzH69j9Xi2VLalPO8jBniKoIjQf
OLKxMJGNwTSLZYwetYlA2udfuUu/icww9zuHuPA6RRPmrkimHMkh8G8+wRChIhHO
ibE6SRdF3onrbIOFHfVYglO68arkJpZgHFXYKQIDAQABAoIBAQCoX13P/BaJkEjq
em84sszH2YQYhZRXBXyjyyYgPQgTPH1oy6K1CWqD79Ht2LNP0hxSDQ4IfBw3Z2Pq
PZwgCZEMkGm8/aiN+EIDX6vaY4kmoyUR2K6dO0wN+a53KiCL0q1cIr6SHiXZrjOM
JIb5cqdOhZ1ugI2gfMimT0swO15M3II8Ue2uIYNPBtrJHfzn8q7TqjPYSZfST9c7
i3vjZMWPJ7/6J8K2VzTFU9H5IfspXjm/ig8SZHipPvaxVCWTV5fcbR4u/uBlLw7c
H8BaTJsarbhi/Unnyz6Lm/E7V6HhdYJKVM8ugoQL05Ut77fUv1b9JNWuF8BEEMtZ
UpVjRWNRAoGBAOvDW3j1lbI1YtEznwE47m+xWVDUl3tUaGFLFrI+RNOygNGtZ/KY
ozXE4c3iBnTpPmdskTI5WU5QI+YuFLpi75KCPnfInlfV9hl1hBbT1Ec+t0XvbE9X
CCA/+x0rIAbC4eAikvTr8T6S3147omzmx4iwmarSxwDwXwL2VL1RmbcNAoGBAOHp
9NLWEcQCeIHbUsoqU0dq1546vtGhioh+1hbMyxk5a61oXR9X0o6m0MkqDQlj3eP1
YCEZzWYI5yzE9Qbzzo1yEeEOKu8HlPASz7RXJt/n6HAdbHy+odM6PDJFk/dNra+b
lus/PgX2WWrbEdOZAI1iRZKN9m6j1ti5/XBt+p6NAoGBAIHaF4eHu+trfAG9bNY/
hRP/mjHq5YQH+XWc5eNGaKIwrsLNv3LenwX+al/7HZNG5BgSs+X1sDpx6VPeDYya
8VjAY6eV16CJOALNtvLbuQ+Ee20JcZ5BUThyBN0L45fVvpK0eDxtt3G/c0dzkQJq
GXwvyHNNpE3gFnSLOCEN0JwBAoGBALu8rqWfG/hljTtsxeoXLknFMhXd/8E5m2Q+
8y7TVVxK6X6bofdwBhxh6FOjzF2nTjgoK5CWXqiScXo02uLCLT5CMzVxjqBBDrZL
C6x0WGvtzq2M5iDsUpK0bF3ikEoNlW6/v7UTQzm1NS2li7TqCxlzNxnJO6dKJDrK
pSCPZJvpAoGBAOi78xtC55IjwbNnVKz0qOISeQJvbfjmW1/6cc0l7fHehiOPpoiC
EBl2Mhl3hTnGUgnruoFnD0n7w8eWZxbia7kCqgl49dsVkSNVSIzQvbK/tQzN5zSb
lEh6qg3DfaoSL2Ji0kwkUcBjBkU8wfoifMPh1p8gnQfZeq7MCzLUlYMS
-----END RSA PRIVATE KEY-----


)KEY";

#define AWS_IOT_PUBLISH_TOPIC "nirman/01/pub"
#define AWS_IOT_SUBSCRIBE_TOPIC "nirman/+/sub"

WiFiClientSecure net;
PubSubClient client(net);

MPU6050 mpu6050(Wire);
DHT dht(DHTPIN, DHTTYPE);

long timer = 0;

void connectAWS() {
  WiFi.begin(ssid, password);

  Serial.println("Connecting to Wi-Fi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting....");
  }

  Serial.println("Connected to WiFi network");

  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  client.setServer(AWS_IOT_ENDPOINT, 8883);

  client.setCallback(messageHandler);

  Serial.println("Connecting to AWS IOT");

  while (!client.connect(THINGNAME)) {
    Serial.print(".");
    delay(1000);
  }

  if (!client.connected()) {
    Serial.println("AWS IoT Timeout!");
    return;
  }

  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);

  Serial.println("AWS IoT Connected!");
}

int deviceIdCounter = 10000;
String generateRandomDeviceID() {
  // Generate a random 5-digit integer
  deviceIdCounter = (deviceIdCounter % 99999) + 1;

  return String(deviceIdCounter);
}

void publishMessage() {
  
  StaticJsonDocument<200> doc;
  doc["temperature"]=  dht.readTemperature();
  doc["humidity"] = dht.readHumidity();
  doc["vibrationX"] = mpu6050.getAccX();
  doc["vibrationY"] = mpu6050.getAccY();
  doc["vibrationZ"] = mpu6050.getAccZ();
  doc["vibrationAngleX"] = mpu6050.getAngleX();
  doc["vibrationAngleY"] = mpu6050.getAngleY();
  doc["vibrationAngleZ"]= mpu6050.getAngleZ();
  
  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);
  client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
}

void messageHandler(char *topic, byte *payload, unsigned int length) {
  Serial.print("incoming: ");
  Serial.println(topic);

  StaticJsonDocument<200> doc;
  deserializeJson(doc, payload);
  const char *message = doc["message"];
  Serial.println(message);
}

String uint64ToHexString(uint64_t value) {
  char buf[17];
  snprintf(buf, sizeof(buf), "%016llx", value);
  return String(buf);
}





void setup() {
  
  
  Serial.begin(9600);
  connectAWS();

  Wire.begin();
  mpu6050.begin();
  mpu6050.calcGyroOffsets(true);
  dht.begin();
  pinMode(LED, OUTPUT);
}

void loop() {
  
  publishMessage();
  mpu6050.update();
  float ax = mpu6050.getAccX();
  float ay = mpu6050.getAccY();
  float az = mpu6050.getAccZ();

  float gx = mpu6050.getGyroAngleX();
  float gy = mpu6050.getGyroAngleY();
  float gz = mpu6050.getGyroAngleZ();

  float Ax = mpu6050.getAngleX();
  float Ay = mpu6050.getAngleY();
  float Az = mpu6050.getAngleZ();

  if (millis() - timer > 1000) {
    Serial.println("=======================================================");

    Serial.print("accX : ");
    Serial.print(ax);
    Serial.print("\taccY : ");
    Serial.print(ay);
    Serial.print("\taccZ : ");
    Serial.println(az);

    Serial.print("gyroAngleX : ");
    Serial.print(gx);
    Serial.print("\tgyroAngleY : ");
    Serial.print(gy);
    Serial.print("\tgyroAngleZ : ");
    Serial.println(gz);

    Serial.print("angleX : ");
    Serial.print(Ax);
    Serial.print("\tangleY : ");
    Serial.print(Ay);
    Serial.print("\tangleZ : ");
    Serial.println(Az);
    Serial.println("=======================================================\n");
    timer = millis();
  }

  delay(2000);
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);

  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  float hif = dht.computeHeatIndex(f, h);
  float hic = dht.computeHeatIndex(t, h, false);

  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.print(F("°C "));
  Serial.print(f);
  Serial.print(F("°F  Heat index: "));
  Serial.print(hic);
  Serial.print(F("°C "));
  Serial.print(hif);
  Serial.println(F("°F"));
  Serial.println("deviceID"+generateRandomDeviceID());

  if (t > 40.50) {
    digitalWrite(LED, HIGH);
  } else {
    digitalWrite(LED, LOW);
  }
}