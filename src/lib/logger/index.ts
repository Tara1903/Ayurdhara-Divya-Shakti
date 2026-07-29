export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogPayload {
  message: string;
  context?: string;
  data?: any;
  duration?: number;
}

class Logger {
  private formatLog(level: LogLevel, payload: LogPayload) {
    const timestamp = new Date().toISOString();
    const durationStr = payload.duration ? ` [${payload.duration.toFixed(2)}ms]` : '';
    const contextStr = payload.context ? ` [${payload.context}]` : '';
    
    // In production, we might want to structure this as pure JSON for a log aggregator
    // For now, we use a clean structured console output
    return `${timestamp} ${level.toUpperCase()}${contextStr}${durationStr}: ${payload.message}`;
  }

  public info(payload: LogPayload) {
    console.log(this.formatLog('info', payload));
    if (payload.data && process.env.NODE_ENV !== 'production') {
      console.log(JSON.stringify(payload.data, null, 2));
    }
  }

  public warn(payload: LogPayload) {
    console.warn(this.formatLog('warn', payload));
    if (payload.data) {
      console.warn(payload.data);
    }
  }

  public error(payload: LogPayload) {
    console.error(this.formatLog('error', payload));
    if (payload.data) {
      console.error(payload.data);
    }
  }

  public debug(payload: LogPayload) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.formatLog('debug', payload));
      if (payload.data) {
         console.debug(payload.data);
      }
    }
  }
}

export const logger = new Logger();
