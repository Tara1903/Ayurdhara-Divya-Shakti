export class AppError extends Error {
  public readonly code: string;
  public readonly details?: any;

  constructor(message: string, code: string, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 'DATABASE_ERROR', details);
  }
}

export class NetworkError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 'NETWORK_ERROR', details);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details);
  }
}

export class ConfigurationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 'CONFIGURATION_ERROR', details);
  }
}

export class UnknownError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 'UNKNOWN_ERROR', details);
  }
}
