# Alarm App 🕒

A modern, feature-rich alarm application built with vanilla JavaScript that offers multiple alarm settings, world time display, stopwatch functionality, and interactive sound features.

## ⚠️ Important Setup Note ⚠️

```diff
+ REQUIRED: Add your API key from ipgeolocation.io
+ Location: Line 105 in index.js file
```

> **API Setup:**
> 1. Get your API key from [ipgeolocation.io](https://ipgeolocation.io/)
> 2. Open `index.js`
> 3. Locate line 105
> 4. Replace `YOUR_API_KEY` with your actual API key

## Features 🌟

- **Multiple Alarm Support**
  - Set and manage multiple alarms simultaneously
  - Persistent storage of alarm settings using LocalStorage
  - Visual confirmation when alarms are set

- **Interactive Notifications**
  - Audio alerts when alarms trigger
  - Easy-to-use dismiss button
  - Visual notifications for active alarms

- **World Time Display**
  - Real-time clock display for multiple time zones
  - Supported regions include:
    - Nepal
    - United States
    - India
    - Japan

- **Stopwatch Functionality**
  - Precise timing with millisecond accuracy
  - Start, stop, and reset capabilities
  - Clean, intuitive interface

- **Interactive Sound Features**
  - Scroll-triggered sound effects
  - Customizable alarm sounds
  - Audio feedback for user interactions

## Installation 💻

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/alarm-app.git
   cd alarm-app
   ```

2. No additional installation required! The application uses pure HTML, CSS, and JavaScript.(Put your APIKEY in line no. 105 of index.js file.)[API-source: <a>https://ipgeolocation.io/</a>]
3. Open `index.html` in your preferred web browser to start using the app.

## Usage Guide 📝

### Setting an Alarm

1. Navigate to the "Set Alarm" section
2. Select your desired time:
   - Choose hours (0-23)
   - Set minutes (0-59)
   - Configure seconds (0-59)
3. The alarm will be automatically saved and activated

### Managing Alarms

1. View all active alarms in the alarm list
2. When an alarm triggers:
   - An audio notification will play
   - Click the "Dismiss" button to stop the alarm
   - The alarm will be deactivated after dismissal

### Using the Stopwatch

1. Locate the Stopwatch section
2. Available controls:
   - Start: Begin timing
   - Stop: Pause the stopwatch
   - Reset: Return to 00:00:00

### World Time Feature

- Access the World Time section to view current times for:
  - Nepal Standard Time
  - US Eastern Time
  - Indian Standard Time
  - Japan Standard Time

## Technical Details 🔧

### Technologies

- **Frontend Stack**
  - HTML5
  - CSS3
  - Vanilla JavaScript
