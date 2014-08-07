// Calculate heart rate ranges
if (!process.argv[2]) {
  console.log('Please enter your age, e.g. tessel run index.js 23');
  return;
}
var myAge = process.argv[2]; // Enter your age when you run the program
var maxHR = 220 - myAge; // Maximum heart rate
var targetMax = maxHR * 0.85; // Target max
var targetMin = maxHR * 0.50; // Target min
var bpm;

// Set up the hardware
var tessel = require('tessel');

var pulseLib = require('pulsesensor');
var pulse = pulseLib.use(tessel.port['GPIO'].pin['A1']);

// var servoLib = require('servo-pca9685');
// var servo = servoLib.use(tessel.port['A']);

var light = tessel.led[1];

// Wait until the pulse is ready
pulse.on('ready', function () {
  console.log('ready')
  // At each heartbeat
  pulse.on('beat', function () {
    light.toggle(); // Blink light on and off at each beat
    bpm = pulse.BPM;
    if (bpm > targetMax) {
      console.log('Too high! Take it easy. Your BPM is', bpm);
    } else if (bpm < targetMin) {
      console.log('Too low! Work harder. Your BPM is', bpm);
    } else {
      console.log('Right on target! Current BPM:', bpm);
    }
  });
});

// If we get any errors, log them
// servo.on('error', function (err) {
//   console.log(err);
// });
pulse.on('error', function (err) {
  console.log(err);
});