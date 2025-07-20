# Chesshook Minimal Enhanced 🚀

**A minimal version of Chesshook with arrow hints, simple UI, beta fish support, and auto move on key.**

This enhanced minimal version provides the essential features you need for chess analysis and assistance while keeping the codebase clean and lightweight.

## 🎯 Key Features

### 🎮 **Core Functionality**
- **Arrow Hints**: Visual arrows showing the best move suggestions
- **Simple UI**: Clean, minimal interface for easy control
- **Beta Fish Support**: High-strength JavaScript chess engine (2300+ ELO)
- **Auto Move on Key**: Press `Alt+M` to instantly play the best move
- **Multiple Engines**: Betafish, Random, CCCP, and External engine support

### 🎨 **Visual Enhancements**
- **Customizable Arrow Colors**: Change the color of suggestion arrows
- **Clean UI Design**: Modern, semi-transparent interface
- **Real-time Updates**: Live move suggestions as the position changes

### ⌨️ **Keyboard Controls**
- `Alt+M` - **Auto Move** (Play best move instantly)
- `Alt+T` - **Toggle Auto Move** (Enable/disable continuous play)
- `Alt+E` - **Switch Engine** (Cycle through available engines)
- `Alt+C` - **Clear Arrows** (Remove all arrow hints)
- `Alt+U` - **Toggle UI** (Show/hide the control panel)

## 🚀 Installation

1. **Install a userscript manager**:
   - [Tampermonkey](https://www.tampermonkey.net/) (Recommended)
   - [Violentmonkey](https://violentmonkey.github.io/get-it/)
   - [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)

2. **Install the script**:
   - Create a new script in your userscript manager
   - Copy the contents of `chesshook.minimal.enhanced.user.js`
   - Save and enable the script

3. **Navigate to chess.com** and enjoy!

## ⚙️ **Configuration**

The script includes a simple configuration object at the top that you can modify:

```javascript
const config = {
  engine: 'betafish',        // 'betafish', 'random', 'cccp', or 'external'
  autoMove: false,           // true to automatically play the best move
  arrowColor: '#77ff77',     // Color of the suggestion arrow
  showUI: true,              // Show simple UI controls
  autoMoveKey: 'Alt+M',      // Key to trigger auto move
  toggleAutoMoveKey: 'Alt+T', // Key to toggle continuous auto move
  engineSwitchKey: 'Alt+E',  // Key to switch engines
  clearArrowsKey: 'Alt+C'    // Key to clear arrows
};
```

## 🎮 **How to Use**

### **Basic Usage**
1. Load the script on chess.com
2. The UI panel will appear in the top-right corner
3. Select your preferred engine (Betafish recommended)
4. Press `Alt+M` to get move suggestions with arrows
5. Press `Alt+T` to enable continuous auto-play

### **Engine Options**
- **Betafish**: High-strength engine (~2300 ELO) - Best for analysis
- **Random**: Random legal moves - Good for casual play
- **CCCP**: Check, Capture, Check, Push priority - Tactical play
- **External**: Connect to external UCI engines via WebSocket

### **Arrow Hints**
- Green arrows show the engine's suggested best move
- Arrows automatically update when the position changes
- Use `Alt+C` to clear arrows manually
- Change arrow color in the UI panel

### **Auto Move Modes**
- **Manual**: Press `Alt+M` for each move suggestion
- **Continuous**: Enable auto move toggle for automatic play
- **Toggle**: Use `Alt+T` to quickly switch between modes

## 🔧 **Technical Details**

### **Supported Engines**
- **Betafish**: JavaScript chess engine with 2300+ ELO strength
- **Random**: Simple random move generator
- **CCCP**: Tactical engine prioritizing checks and captures
- **External**: Any UCI-compliant engine via WebSocket connection

### **Performance**
- Lightweight implementation
- Efficient DOM manipulation
- Background processing for engine analysis
- Reduced update frequency to prevent spam

### **Browser Compatibility**
- Chrome/Chromium (Recommended)
- Firefox
- Safari
- Edge

## 🛡️ **Safety & Ethics**

### **Detection Avoidance**
- Human-like timing patterns
- Variable move selection
- Realistic thinking delays
- Position-aware behavior

### **Responsible Usage**
- Use for educational purposes
- Respect fair play policies
- Avoid competitive abuse
- Maintain sportsmanship

## 📝 **Changelog**

### Version 1.0
- Initial release
- Arrow hints with customizable colors
- Simple, clean UI interface
- Beta fish engine integration
- Auto move on key functionality
- Multiple engine support
- Keyboard shortcuts for all features

## 🤝 **Contributing**

This is a minimal version designed for simplicity and ease of use. If you need more advanced features, consider using the full version of Chesshook.

## 📄 **License**

This project is licensed under the same terms as the original Chesshook project.

---

**Enjoy your enhanced chess experience!** ♟️