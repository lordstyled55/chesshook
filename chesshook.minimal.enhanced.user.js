// ==UserScript==
// @name        Chesshook Minimal Enhanced
// @include    	https://www.chess.com/*
// @grant       none
// @require     https://raw.githubusercontent.com/0mlml/chesshook/master/betafish.js
// @version     1.0
// @author      0mlml (Enhanced by AI)
// @description A minimal version of Chesshook with arrow hints, simple UI, beta fish support, and auto move on key.
// @run-at      document-end
// ==/UserScript==

(() => {
  // --- Configuration ---
  const config = {
    engine: 'betafish', // 'betafish', 'random', 'cccp', or 'external'
    autoMove: false,    // true to automatically play the best move
    arrowColor: '#77ff77', // Color of the suggestion arrow
    showUI: true,       // Show simple UI controls
    autoMoveKey: 'Alt+M', // Key to trigger auto move
    toggleAutoMoveKey: 'Alt+T', // Key to toggle continuous auto move
    engineSwitchKey: 'Alt+E', // Key to switch engines
    clearArrowsKey: 'Alt+C' // Key to clear arrows
  };
  // ---------------------

  try {
    const namespace = 'chesshook_minimal_enhanced';
    window[namespace] = {};

    // Floating Toggle Button
    class FloatingToggle {
      constructor() {
        this.button = null;
        this.isVisible = true;
        this.createButton();
        this.bindEvents();
      }

      createButton() {
        this.button = document.createElement('div');
        this.button.id = 'chesshook-floating-toggle';
        this.button.style.cssText = `
          position: fixed;
          top: 50%;
          left: 20px;
          transform: translateY(-50%);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Arial, sans-serif;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          z-index: 10001;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
          user-select: none;
          border: 2px solid rgba(255,255,255,0.3);
        `;
        this.button.innerHTML = 'Hi';
        this.button.title = 'Chesshook Enhanced - Click to toggle UI';

        // Add hover effects
        this.button.addEventListener('mouseenter', () => {
          this.button.style.transform = 'translateY(-50%) scale(1.1)';
          this.button.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
        });

        this.button.addEventListener('mouseleave', () => {
          this.button.style.transform = 'translateY(-50%) scale(1)';
          this.button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        });

        document.body.appendChild(this.button);
      }

      bindEvents() {
        this.button.addEventListener('click', () => {
          // Toggle the main UI
          if (window.chesshookUI) {
            window.chesshookUI.toggle();
          }
          
          // Add a small animation
          this.button.style.transform = 'translateY(-50%) scale(0.9)';
          setTimeout(() => {
            this.button.style.transform = 'translateY(-50%) scale(1)';
          }, 150);
        });
      }

      show() {
        this.button.style.display = 'flex';
        this.isVisible = true;
      }

      hide() {
        this.button.style.display = 'none';
        this.isVisible = false;
      }

      toggle() {
        if (this.isVisible) {
          this.hide();
        } else {
          this.show();
        }
      }
    }

    // Simple UI Component
    class SimpleUI {
      constructor() {
        this.container = null;
        this.isVisible = false;
        this.createUI();
        this.bindEvents();
      }

      createUI() {
        this.container = document.createElement('div');
        this.container.id = 'chesshook-ui';
        this.container.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 15px;
          border-radius: 8px;
          font-family: Arial, sans-serif;
          font-size: 14px;
          z-index: 10000;
          min-width: 200px;
          display: none;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        `;

        this.container.innerHTML = `
          <div style="margin-bottom: 10px; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 5px;">
            Chesshook Enhanced
          </div>
          <div style="margin-bottom: 8px;">
            <label style="display: block; margin-bottom: 3px;">Engine:</label>
            <select id="engine-select" style="width: 100%; padding: 3px; background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 3px;">
              <option value="betafish">Betafish</option>
              <option value="random">Random</option>
              <option value="cccp">CCCP</option>
              <option value="external">External</option>
            </select>
          </div>
          <div style="margin-bottom: 8px;">
            <label style="display: block; margin-bottom: 3px;">
              <input type="checkbox" id="auto-move-toggle" style="margin-right: 5px;">
              Auto Move
            </label>
          </div>
          <div style="margin-bottom: 8px;">
            <label style="display: block; margin-bottom: 3px;">Arrow Color:</label>
            <input type="color" id="arrow-color" value="${config.arrowColor}" style="width: 100%; height: 25px; border: none; border-radius: 3px;">
          </div>
          <div style="font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 5px;">
            <div>${config.autoMoveKey}: Auto Move</div>
            <div>${config.toggleAutoMoveKey}: Toggle Auto</div>
            <div>${config.engineSwitchKey}: Switch Engine</div>
            <div>${config.clearArrowsKey}: Clear Arrows</div>
            <div>Alt+U: Toggle UI</div>
            <div>Alt+H: Toggle Floating Button</div>
          </div>
        `;

        document.body.appendChild(this.container);
      }

      bindEvents() {
        // Engine selection
        const engineSelect = this.container.querySelector('#engine-select');
        engineSelect.value = config.engine;
        engineSelect.addEventListener('change', (e) => {
          config.engine = e.target.value;
          console.log(`[Chesshook] Engine switched to: ${config.engine}`);
        });

        // Auto move toggle
        const autoMoveToggle = this.container.querySelector('#auto-move-toggle');
        autoMoveToggle.checked = config.autoMove;
        autoMoveToggle.addEventListener('change', (e) => {
          config.autoMove = e.target.checked;
          console.log(`[Chesshook] Auto move ${config.autoMove ? 'enabled' : 'disabled'}`);
        });

        // Arrow color
        const arrowColor = this.container.querySelector('#arrow-color');
        arrowColor.addEventListener('change', (e) => {
          config.arrowColor = e.target.value;
          console.log(`[Chesshook] Arrow color changed to: ${config.arrowColor}`);
        });
      }

      show() {
        this.container.style.display = 'block';
        this.isVisible = true;
      }

      hide() {
        this.container.style.display = 'none';
        this.isVisible = false;
      }

      toggle() {
        if (this.isVisible) {
          this.hide();
        } else {
          this.show();
        }
      }
    }

    // Initialize UI and Floating Toggle
    const ui = new SimpleUI();
    const floatingToggle = new FloatingToggle();
    
    // Make UI accessible globally for the floating toggle
    window.chesshookUI = ui;
    
    if (config.showUI) {
      ui.show();
    }

    // External Engine Worker
    const externalEngineWorkerFunc = () => {
      const minIntermediaryVersion = 1;

      self.uciQueue = [];
      self.hasLock = false;
      self.wsPath = null;
      self.whatEngine = null;
      self.intermediaryVersionString = null;
      self.ws = null;
      self.enginePassKey = null;
      self.closeWs = () => {
        if (self.ws !== null) {
          self.ws.close();
          self.ws = null;
        }
      };
      self.openWs = (url) => {
        self.closeWs();
        self.ws = new WebSocket(url);
        self.ws.onopen = () => {
          self.postMessage({ type: 'DEBUG', payload: 'Connected to engine intermediary' });
          self.send('whoareyou');
        };
        self.ws.onclose = () => {
          self.postMessage({ type: 'DEBUG', payload: 'Disconnected from engine' });
          self.postMessage({ type: 'WSCLOSE' });
          self.intermediaryVersionString = null;
        };
        self.ws.onerror = (e) => {
          self.postMessage({ type: 'ERROR', payload: 'Error with engine: ', err: e });
        };
        self.ws.onmessage = (e) => {
          const data = e.data;
          if (data.startsWith('iam ')) {
            response = data.substring(4);
            self.intermediaryVersionString = response;
            self.postMessage({ type: 'MESSAGE', payload: 'Connected to engine intermediary version ' + response });
            let parts = response.split('v');
            if (!parts[1] || parseInt(parts[1]) < minIntermediaryVersion) {
              self.postMessage({ type: 'ERROR', payload: 'Engine intermediary version is too old or did not provide a valid version string. Please update it.' });
              self.closeWs();
            }
            self.send('whatengine');
          } else if (data.startsWith('auth')) {
            if (data === 'authok') {
              self.postMessage({ type: 'MESSAGE', payload: 'Engine authentication successful' });
            } else {
              if (!self.enginePassKey) {
                self.postMessage({ type: 'NEEDAUTH' });
              } else {
                self.postMessage({ type: 'ERROR', payload: 'Engine authentication failed' });
              }
            }
          } else if (data.startsWith('sub')) {
            if (data === 'subok') {
            } else {
              self.postMessage({ type: 'ERROR', payload: 'Engine subscription failed' });
            }
          } else if (data.startsWith('unsub')) {
            if (data === 'unsubok') {
            } else {
              self.postMessage({ type: 'ERROR', payload: 'Engine unsubscription failed' });
            }
          } else if (data.startsWith('lock')) {
            if (data === 'lockok') {
              self.hasLock = true;
              while (self.uciQueue.length > 0) {
                self.send(self.uciQueue.shift());
              }
            } else {
              self.postMessage({ type: 'ERROR', payload: 'Engine lock failed' });
            }
          } else if (data.startsWith('unlock')) {
            if (data === 'unlockok') {
              self.hasLock = false;
            } else {
              self.postMessage({ type: 'ERROR', payload: 'Engine unlock failed' });
            }
          } else if (data.startsWith('engine')) {
            self.whichEngine = data.split(' ')[1];
            self.postMessage({ type: 'ENGINE', payload: self.whichEngine });
          } else if (data.startsWith('bestmove')) {
            const bestMove = data.split(' ')[1];
            self.postMessage({ type: 'BESTMOVE', payload: bestMove });
            self.send('unsub');
            self.send('unlock');
          } else {
            self.postMessage({ type: 'UCI', payload: data });
          }
        };
      };
      self.send = (data) => {
        if (self.ws === null) return self.postMessage({ type: 'ERROR', payload: 'No connection to engine', err: null });
        self.ws.send(data);
      };
      self.addEventListener('message', e => {
        if (e.data.type === 'UCI') {
          if (!e.data.payload) return self.postMessage({ type: 'ERROR', payload: 'No UCI command provided' });
          if (!self.ws) return self.postMessage({ type: 'ERROR', payload: 'No connection to engine' });
          if (self.hasLock) {
            self.send(e.data.payload);
          } else {
            self.uciQueue.push(e.data.payload);
          }
        } else if (e.data.type === 'INIT') {
          if (!e.data.payload) return self.postMessage({ type: 'ERROR', payload: 'No URL provided' });
          if (!e.data.payload.startsWith('ws://')) return self.postMessage({ type: 'ERROR', payload: 'URL must start with ws://' });
          self.openWs(e.data.payload);
          self.wsPath = e.data.payload;
        } else if (e.data.type === 'AUTH') {
          if (!e.data.payload) return self.postMessage({ type: 'ERROR', payload: 'No auth provided' });
          self.enginePassKey = e.data.payload;
          self.send('auth ' + e.data.payload);
        } else if (e.data.type === 'SUB') {
          self.send('sub');
        } else if (e.data.type === 'UNSUB') {
          self.send('unsub');
        } else if (e.data.type === 'LOCK') {
          if (self.hasLock) return self.postMessage({ type: 'ERROR', payload: 'Already have lock' });
          self.send('lock');
        } else if (e.data.type === 'UNLOCK') {
          self.send('unlock');
        } else if (e.data.type === 'WHATENGINE') {
          self.send('whatengine');
        } else if (e.data.type === 'GETMOVE') {
          if (!e.data.payload?.fen) return self.postMessage({ type: 'ERROR', payload: 'No FEN provided' });
          if (!e.data.payload?.go) return self.postMessage({ type: 'ERROR', payload: 'No go command provided' });
          self.send('lock');
          self.send('sub');
          self.send('position fen ' + e.data.payload.fen);
          self.send(e.data.payload.go);
        } else if (e.data.type === 'STOP') {
          if (self.hasLock) {
            self.send('stop');
            self.send('unsub');
            self.send('unlock');
          }
        }
      });
    }

    const externalEngineWorkerBlob = new Blob([`(${externalEngineWorkerFunc.toString()})();`], { type: 'application/javascript' });
    const externalEngineWorkerURL = URL.createObjectURL(externalEngineWorkerBlob);
    const externalEngineWorker = new Worker(externalEngineWorkerURL);

    // Betafish Web Worker
    const betafishWebWorkerFunc = () => {
      self.instance = betafishEngine();
      self.thinking = false;

      const postError = (message) => self.postMessage({ type: 'ERROR', payload: message });
      const isInstanceInitialized = () => self.instance || postError('Betafish not initialized.');

      self.addEventListener('message', e => {
        if (!isInstanceInitialized()) return;

        switch (e.data.type) {
          case 'FEN':
            if (!e.data.payload) return postError('No FEN provided.');
            self.instance.setFEN(e.data.payload);
            break;
          case 'GETMOVE':
            if (self.thinking) return postError('Betafish is already calculating.');
            self.postMessage({ type: 'MESSAGE', payload: 'Betafish received request for best move. Calculating...' });
            self.thinking = true;
            const move = self.instance.getBestMove();
            self.thinking = false;
            self.postMessage({ type: 'MOVE', payload: { move, toMove: self.instance.getFEN().split(' ')[1] } });
            break;
          case 'THINKINGTIME':
            if (isNaN(e.data.payload)) return postError('Invalid thinking time provided.');
            self.instance.setThinkingTime(e.data.payload / 1000);
            self.postMessage({ type: 'DEBUG', payload: `Betafish thinking time set to ${e.data.payload}ms.` });
            break;
          default:
            postError('Invalid message type.');
        }
      });
    };

    const betafishWorkerBlob = new Blob([`const betafishEngine=${betafishEngine.toString()};(${betafishWebWorkerFunc.toString()})();`], { type: 'application/javascript' });
    const betafishWorkerURL = URL.createObjectURL(betafishWorkerBlob);
    const betafishWorker = new Worker(betafishWorkerURL);

    // CCCP Engine (Check, Capture, Check, Push)
    const cccpEngine = () => {
      const board = document.querySelector('wc-chess-board');
      if (!board?.game) return null;

      const legalMoves = board.game.getLegalMoves();
      if (!legalMoves || legalMoves.length === 0) return null;

      // Priority order: Check, Capture, Check, Push
      const checks = legalMoves.filter(move => {
        const tempBoard = board.game.clone();
        tempBoard.move(move.from + move.to + (move.promotion || ''));
        return tempBoard.isCheck();
      });

      const captures = legalMoves.filter(move => {
        const piece = board.game.getPiece(move.to);
        return piece && piece.type !== 'k';
      });

      if (checks.length > 0) {
        return checks[0].from + checks[0].to + (checks[0].promotion || '');
      }

      if (captures.length > 0) {
        return captures[0].from + captures[0].to + (captures[0].promotion || '');
      }

      // Return first legal move if no checks or captures
      const move = legalMoves[0];
      return move.from + move.to + (move.promotion || '');
    };

    // Utility functions
    const coordsToUCIMoveString = (from, to, promoted) => {
      const files = 'abcdefgh';
      const ranks = '12345678';
      return files[from[1]] + ranks[from[0]] + files[to[1]] + ranks[to[0]] + (promoted || '');
    };

    const addToConsole = (message) => {
      console.log(`[Chesshook] ${message}`);
    };

    // Handle engine move with arrow hints
    const handleEngineMove = (uciMove) => {
      const board = document.querySelector('wc-chess-board');
      if (!board?.game) return false;

      // Clear existing arrows
      board.game.markings.removeAll();
      
      // Add arrow hint
      const marking = { 
        type: 'arrow', 
        data: { 
          color: config.arrowColor, 
          from: uciMove.substring(0, 2), 
          to: uciMove.substring(2, 4) 
        } 
      };
      board.game.markings.addOne(marking);

      // Auto move if enabled
      if (config.autoMove) {
        board.game.move(uciMove);
        addToConsole(`Auto-moved: ${uciMove}`);
      } else {
        addToConsole(`Suggested move: ${uciMove}`);
      }
    };

    // Get engine move
    const getEngineMove = () => {
      const board = document.querySelector('wc-chess-board');
      if (!board?.game) return;

      const fen = board.game.getFEN();

      if (config.engine === 'betafish') {
        betafishWorker.postMessage({ type: 'FEN', payload: fen });
        betafishWorker.postMessage({ type: 'GETMOVE' });
      } else if (config.engine === 'random') {
        const legalMoves = board.game.getLegalMoves();
        if (legalMoves && legalMoves.length > 0) {
          const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
          const moveString = randomMove.from + randomMove.to + (randomMove.promotion ? randomMove.promotion : '');
          handleEngineMove(moveString);
        }
      } else if (config.engine === 'cccp') {
        const move = cccpEngine();
        if (move) handleEngineMove(move);
      } else if (config.engine === 'external') {
        externalEngineWorker.postMessage({ type: 'GETMOVE', payload: { fen: fen, go: 'go movetime 1000' } });
      }
    };

    // Clear arrows
    const clearArrows = () => {
      const board = document.querySelector('wc-chess-board');
      if (board?.game) {
        board.game.markings.removeAll();
        addToConsole('Arrows cleared');
      }
    };

    // Switch engine
    const switchEngine = () => {
      const engines = ['betafish', 'random', 'cccp', 'external'];
      const currentIndex = engines.indexOf(config.engine);
      const nextIndex = (currentIndex + 1) % engines.length;
      config.engine = engines[nextIndex];
      
      // Update UI
      const engineSelect = document.querySelector('#engine-select');
      if (engineSelect) {
        engineSelect.value = config.engine;
      }
      
      addToConsole(`Engine switched to: ${config.engine}`);
    };

    // Toggle auto move
    const toggleAutoMove = () => {
      config.autoMove = !config.autoMove;
      
      // Update UI
      const autoMoveToggle = document.querySelector('#auto-move-toggle');
      if (autoMoveToggle) {
        autoMoveToggle.checked = config.autoMove;
      }
      
      addToConsole(`Auto move ${config.autoMove ? 'enabled' : 'disabled'}`);
    };

    // Worker message handlers
    betafishWorker.onmessage = e => {
      switch (e.data.type) {
        case 'DEBUG':
        case 'MESSAGE':
          addToConsole(e.data.payload);
          break;
        case 'ERROR':
          console.error(`[Chesshook] ${e.data.payload}`);
          break;
        case 'MOVE':
          const { move, toMove } = e.data.payload;
          const squareToRankFile = sq => [Math.floor((sq - 21) / 10), sq - 21 - Math.floor((sq - 21) / 10) * 10];
          const from = squareToRankFile(move & 0x7f);
          const to = squareToRankFile((move >> 7) & 0x7f);
          const promoted = (move >> 20) & 0xf;
          const promotedString = promoted !== 0 ? Object.entries(betafishPieces).find(([key, value]) => value === promoted)?.[0].toLowerCase()[1] || '' : '';
          const uciMove = coordsToUCIMoveString(from, to, promotedString);
          addToConsole(`Betafish computed best for ${toMove === 'w' ? 'white' : 'black'}: ${uciMove}`);
          handleEngineMove(uciMove);
          break;
      }
    };

    externalEngineWorker.onmessage = e => {
      if (e.data.type === 'BESTMOVE') {
        handleEngineMove(e.data.payload);
      }
    };

    // Keyboard event handlers
    document.addEventListener('keydown', (e) => {
      // Alt+M: Auto move
      if (e.altKey && e.key === 'M') {
        e.preventDefault();
        getEngineMove();
      }
      
      // Alt+T: Toggle auto move
      if (e.altKey && e.key === 'T') {
        e.preventDefault();
        toggleAutoMove();
      }
      
      // Alt+E: Switch engine
      if (e.altKey && e.key === 'E') {
        e.preventDefault();
        switchEngine();
      }
      
      // Alt+C: Clear arrows
      if (e.altKey && e.key === 'C') {
        e.preventDefault();
        clearArrows();
      }
      
      // Alt+U: Toggle UI
      if (e.altKey && e.key === 'U') {
        e.preventDefault();
        ui.toggle();
      }
      
      // Alt+H: Toggle floating button
      if (e.altKey && e.key === 'H') {
        e.preventDefault();
        floatingToggle.toggle();
      }
    });

    // Main update loop
    const updateLoop = () => {
      const board = document.querySelector('wc-chess-board');
      if (!board?.game) return;

      if (board.game.getPositionInfo().gameOver) {
        externalEngineWorker.postMessage({ type: 'STOP' });
        return;
      }
      
      // Only get engine move if not in auto move mode (to avoid spam)
      if (!config.autoMove) {
        getEngineMove();
      }
    };

    // Start the update loop
    setInterval(updateLoop, 2000); // Reduced frequency to avoid spam

    addToConsole('Chesshook Minimal Enhanced loaded successfully!');
    addToConsole(`Press ${config.autoMoveKey} for auto move, ${config.toggleAutoMoveKey} to toggle continuous auto move`);

  } catch (error) {
    console.error('[Chesshook Minimal Enhanced] Script initialization error:', error);
  }
})();