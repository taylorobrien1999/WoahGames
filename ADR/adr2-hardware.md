# ADR #2 – Hardware

**Status:** Accepted  
**Date:** February 22nd, 2026

## Issue
Mobile devices offer a large variety of hardware components including a GPS, camera, microphone, fingerprint scanner, accelerometer, and a speaker/audio output. 
The GPArray team must decide which, if any, of these hardware features will be used or leveraged by our Woah Games app. This is ultimately to balance the app complexity against the project scope.


## Decision
The Woah Games app will not require any special hardware permissions or integrations. 
No GPS, camera, microphone or fingerprint scanner is needed. Furthermore, network connectivity is also not required as offline play will function seamlessly.
The device's speaker may optionally be used passively through React Native's standard audio API for optional sound effects such as game effects, button taps, or win/lose sounds. 
This will not require explicit hardware permissions on either Android or iOS.


## Rationale
Woah Games is a local, offline, simple gaming application. There is no scenario in which any of the listed hardware components are necessary to deliver core game functionality. 
Adding hardware integrations such as GPS or camera permissions would significantly increase scope complexity, development time, and does not align with the overall functions of our application. 
Keeping hardware usage minimal ensures the team can deliver a polished and stable app within the project scope and timeline.


## Alternatives Considered
Application speaker permissions were considered for background music, however adding a music layer was deemed unnecessary complexity. 
Fingerprint/biometrics for a login screen was considered but will not be applicable for our app as we don't intend to create user accounts or authentication for a simple game application.


## Consequences
No special permissions will need to be declared in the app's AndroidManifest.xml or iOS Info.plist. 
Sound effects, if implemented, will use the standard Expo Audio or React Native sound library without requiring runtime permission prompts. This keeps user onboarding simple.
