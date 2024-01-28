#define Led 13
unsigned long randNumber;

void setup() {
  pinMode(Led, OUTPUT);
  digitalWrite(Led, LOW);
  randomSeed(analogRead(A0));
  Serial.begin(9600);
}

void loop() {
  digitalWrite(Led, HIGH);
  randNumber = random(100);
  Serial.println(randNumber);
  delay(1000);
  digitalWrite(Led, LOW);
  delay(1000);
}
