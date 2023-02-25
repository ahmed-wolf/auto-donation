#include <LiquidCrystal.h>
LiquidCrystal ahmedlcd( 8 , 9 , 4 , 5 , 6 , 7 );

#include <SoftwareSerial.h>
// SoftwareSerial sim(10, 11);
// int _timeout;
// String _buffer;
// String number = "+6282222222222"; //-> change with your number

void setup() {
 ahmedlcd.begin(16,2);
 Serial.begin(9600);
 ahmedlcd.print("tazza project");
  delay(3000);
  ahmedlcd.clear();

// ---------------

  //  delay(7000); //delay for 7 seconds to make sure the modules get the signal
  // _buffer.reserve(50);
  Serial.println("Sistem Started...");
  // sim.begin(9600);
  delay(1000);
  // Serial.println("Type s to send an SMS");

// ---------------

}

void loop() {

 if ( Serial.available() > 0){
   delay(100);
   ahmedlcd.clear();
   ahmedlcd.setCursor(0,0);
   while( Serial.available() > 0){
    ahmedlcd.write(Serial.read());
    delay(3000)
   ahmedlcd.clear();
   }
// ---------------

//  if (Serial.available() > 0)
//     switch (Serial.read())
//     {
//       case 's':
//         SendMessage();
//         break;
//     }
//   if (sim.available() > 0)
//     Serial.write(sim.read());

//  }
// ---------------


}



// void SendMessage()
// {
//   //Serial.println ("Sending Message");
//   sim.println("AT+CMGF=1");    //Sets the GSM Module in Text Mode
//   delay(1000);
//   //Serial.println ("Set SMS Number");
//   sim.println("AT+CMGS=\"" + number + "\"\r"); //Mobile phone number to send message
//   delay(1000);
//   String SMS = "Hello, how are you?";
//   sim.println(SMS);
//   delay(100);
//   sim.println((char)26);// ASCII code of CTRL+Z
//   delay(1000);
//   _buffer = _readSerial();
// }


// String _readSerial() {
//   _timeout = 0;
//   while  (!sim.available() && _timeout < 12000  )
//   {
//     delay(13);
//     _timeout++;
//   }
//   if (sim.available()) {
//     return sim.readString();
//   }
// }
