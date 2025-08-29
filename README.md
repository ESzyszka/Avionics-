# Aviation Panel Project

A comprehensive implementation of an aviation "six-pack" instrument panel featuring essential flight instruments for aircraft navigation and flight monitoring.

<img width="481" height="326" alt="Screenshot 2025-08-29 at 17 02 24" src="https://github.com/user-attachments/assets/8ca0774f-1ba5-4e97-9e6e-1d357049ba25" />


## Project Structure

```
aviation-panel-project/
├── aviation-panel/              # JavaScript Implementation
│   └── ...                     # JS source files
├── aviation-panel-TypeScript/   # TypeScript Implementation  
│   └── ...                     # TS source files
└── README.md                   # This file
```

## Implementations

### aviation-panel (JavaScript)
The original JavaScript implementation of the avionics six-pack, developed using **Grok Code Fast 1** model. This version provides a fully functional flight instrument panel with real-time updates and interactive controls.

**Features:**
- Complete six-pack instrument implementation
- Real-time flight data visualization
- Interactive controls and indicators
- Responsive design for various screen sizes

### aviation-panel-TypeScript (TypeScript)
A TypeScript port of the JavaScript implementation, offering enhanced type safety and improved developer experience while maintaining all the functionality of the original version.

**Features:**
- Full type definitions for aviation data structures
- Enhanced IDE support and autocomplete
- Compile-time error checking
- Improved code maintainability
- All features from the JavaScript version

## The Aviation Six-Pack

The traditional aviation six-pack consists of six essential flight instruments:

1. **Airspeed Indicator** - Displays aircraft's speed through the air
2. **Attitude Indicator (Artificial Horizon)** - Shows aircraft's orientation relative to the horizon
3. **Altimeter** - Indicates altitude above sea level
4. **Turn Coordinator** - Shows rate of turn and coordination
5. **Heading Indicator (Directional Gyro)** - Displays aircraft's magnetic heading
6. **Vertical Speed Indicator** - Shows rate of climb or descent

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser with HTML5 Canvas support

### Installation

#### JavaScript Version
```bash
cd aviation-panel
npm install
npm start
```

#### TypeScript Version
```bash
cd aviation-panel-TypeScript
npm install
npm run dev
```

## Usage

Both implementations provide the same core functionality:
- Real-time instrument updates
- Customizable flight parameters
- Responsive instrument layout
- Realistic instrument behavior and animations

## Development

### JavaScript Version
- Built with vanilla JavaScript
- Uses HTML5 Canvas for instrument rendering
- Modular architecture for easy maintenance

### TypeScript Version
- Strongly typed interfaces for all aviation data
- Enhanced error handling and validation
- Improved code organization and documentation
- Backward compatible with JavaScript implementation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both implementations if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
