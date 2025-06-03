# Frontend Integration Notes

This update introduces a new deep link route and extends mobile compatibility.

## Discussion Deep Links
- New dynamic route: `/discussion/[id]`.
- Navigating to this route attempts to open `echo://discussion/{id}` in the Echo app.
- If the app is not installed, the user is sent to the App Store (iOS) or Google Play (Android) after a short delay.

## Android Compatibility
- The existing `/invite/[id]` and `/user/[displayname]` routes now attempt to open their respective `echo://` links on both iOS and Android.
- Fallback logic now directs users to the appropriate store based on the detected platform.

Ensure the mobile clients handle these deep links (`echo://invite/`, `echo://user/`, `echo://discussion/`). The Android store URL currently points to `https://play.google.com/store/apps/details?id=app.echo` and may need updating if the actual package id differs.
