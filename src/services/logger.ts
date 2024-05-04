// services/logger.ts
class Logger {
    logs: string[] = [];
  
    log(message: string) {
      const formattedMessage = `${new Date().toISOString()}: ${message}\n`;
      this.logs.push(formattedMessage);
  
      if (!this.isProduction()) {
        console.log(formattedMessage);
      }
    }
  
    error(message: string) {
      const formattedMessage = `ERROR: ${message}\n`;
      this.logs.push(formattedMessage);
  
      if (!this.isProduction()) {
        console.error(formattedMessage);
      }
    }
  
    getLogs() {
      return this.logs.join('');
    }
  
    private isProduction() {
      return process.env.NODE_ENV === 'production';
    }
  }
  
  const logger = new Logger();
  export default logger;
  