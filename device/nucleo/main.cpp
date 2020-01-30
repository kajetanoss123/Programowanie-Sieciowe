/* Copyright C2014 ARM, MIT License
 *
 * Author: Doug Anson (doug.anson@arm.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files the "Software", to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

#include "mbed.h"
#include "EthernetInterface.h"
#include "Websocket.h"
#include "XNucleoIKS01A2.h"

// Blinky
DigitalOut led(LED1);
DigitalOut led_sending(LED2);
DigitalOut led_connecting(LED3);


/* Instantiate the expansion board */
static XNucleoIKS01A2 *mems_expansion_board = XNucleoIKS01A2::instance(D14, D15, D4, D5);

static HTS221Sensor *hum_temp = mems_expansion_board->ht_sensor;
static LPS22HBSensor *press_temp = mems_expansion_board->pt_sensor;

int main() {   
    float temperature;
    float humidity;
    float pressure;
    // announce
    led_connecting =true;
    printf("Websocket Example v1.0.0\n\r");
    hum_temp->enable();
    press_temp->enable();
    // Create a network interface and connect
    EthernetInterface eth;
    eth.connect();
    printf("IP Address is %s\n\r", eth.get_ip_address());

    // Create a websocket instance
    Websocket ws("ws://192.168.1.102:8080/", &eth);
    int connect_error = ws.connect();
    led_connecting = false;
    // begin main loop
    while (true) {
        
        // blink... 
        led = !led; 
        wait(10);
        hum_temp->get_temperature(&temperature);
        hum_temp->get_humidity(&humidity);
        press_temp->get_pressure(&pressure);
        
        char tekst[71];
        sprintf(tekst, "{\"command\": \"save1\", \"temperature\": %5.2f, \"humidity\": %2.2f, \"pressure\": %5.1f}", temperature,humidity,pressure);
        printf(tekst);
        printf("<-koniec\n\r");
        led_sending = true;
        int error_c = ws.send(tekst);
        led_sending = false;
    }
}