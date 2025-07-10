type LoggerTypes = "info" | "warn" | "error" | "success" | "debug";

interface LoggerStyle {
  label: string;
  labelStyle: string;
  textStyle: string;
}

interface LoggerConstructor {
  prefix: string;
}

export interface ILogger {
  info(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  error(...args: unknown[]): void;
  success(...args: unknown[]): void;
  debug(...args: unknown[]): void;
  log(...args: unknown[]): void;
}

class Logger implements ILogger {
  private readonly prefix: string;
  private static readonly styles: Record<LoggerTypes, LoggerStyle> = {
    info: {
      label: "INFO",
      labelStyle:
        "background: #2196F3; color: white; padding: 2px 6px; border-radius: 3px;",
      textStyle: "color: #2196F3;",
    },
    warn: {
      label: "WARN",
      labelStyle:
        "background: #FF9800; color: white; padding: 2px 6px; border-radius: 3px;",
      textStyle: "color: #FF9800;",
    },
    error: {
      label: "ERROR",
      labelStyle:
        "background: #F44336; color: white; padding: 2px 6px; border-radius: 3px;",
      textStyle: "color: #F44336;",
    },
    success: {
      label: "SUCCESS",
      labelStyle:
        "background: #4CAF50; color: white; padding: 2px 6px; border-radius: 3px;",
      textStyle: "color: #4CAF50;",
    },
    debug: {
      label: "DEBUG",
      labelStyle:
        "background: #9E9E9E; color: white; padding: 2px 6px; border-radius: 3px;",
      textStyle: "color: #9E9E9E;",
    },
  };

  constructor({ prefix }: LoggerConstructor) {
    this.prefix = prefix;
  }

  private getTime(): string {
    return new Date().toLocaleTimeString();
  }

  private _log(type: LoggerTypes, ...args: unknown[]): void {
    const style = Logger.styles[type];
    const time = this.getTime();
    const prefix = this.prefix ? `[${this.prefix}]` : "";

    console.log(
      `%c${style.label}%c ${time} ${prefix}`,
      style.labelStyle,
      style.textStyle,
      ...args
    );
  }

  public log(...args: unknown[]): void {
    this.debug(...args);
  }

  public info(...args: unknown[]): void {
    this._log("info", ...args);
  }

  public warn(...args: unknown[]): void {
    this._log("warn", ...args);
  }

  public error(...args: unknown[]): void {
    this._log("error", ...args);
  }

  public success(...args: unknown[]): void {
    this._log("success", ...args);
  }

  public debug(...args: unknown[]): void {
    this._log("debug", ...args);
  }
}

const createLogger = (config: LoggerConstructor): ILogger => {
  // if (import.meta.env.DEV) {
    return new Logger(config);
  // }
  // return new ProdLogger(config);
};

export const logger = createLogger({ prefix: "yascrobbler" });