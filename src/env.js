(function (window) {
    window.__env = window.__env || {};
  
    // Project variables
    window.__env.infraStreamUrl = 'http://192.168.1.48:8080/stream';
    window.__env.busStreamUrl = 'http://192.168.1.48:8081/bus';
  
    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;
  }(this));
  