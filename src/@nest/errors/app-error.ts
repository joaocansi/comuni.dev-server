export enum AppErrorType {
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  USER_UNAUTHORIZED = 'USER_UNAUTHORIZED',
  COMMUNITY_NOT_FOUND = 'COMMUNITY_NOT_FOUND',
  COMMUNITY_ALREADY_EXISTS = 'COMMUNITY_ALREADY_EXISTS',
  COMMUNITY_UNAUTHORIZED = 'COMMUNITY_UNAUTHORIZED',
  USER_ALREADY_JOINED = 'USER_ALREADY_JOINED',
  OWNER_CANNOT_JOIN = 'OWNER_CANNOT_JOIN',
  NOT_MEMBER = 'NOT_MEMBER',
}

export const ERROR_STATUS_CODES: Record<AppErrorType, number> = {
  [AppErrorType.USER_NOT_FOUND]: 404,
  [AppErrorType.COMMUNITY_NOT_FOUND]: 404,
  [AppErrorType.USER_ALREADY_EXISTS]: 409,
  [AppErrorType.COMMUNITY_ALREADY_EXISTS]: 409,
  [AppErrorType.USER_ALREADY_JOINED]: 409,
  [AppErrorType.USER_UNAUTHORIZED]: 403,
  [AppErrorType.OWNER_CANNOT_JOIN]: 400,
  [AppErrorType.NOT_MEMBER]: 404,
  [AppErrorType.COMMUNITY_UNAUTHORIZED]: 401,
};

export const getStatusCode = (errorType: AppErrorType): number => {
  return ERROR_STATUS_CODES[errorType] || 500;
};

export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly type: AppErrorType,
  ) {
    super(message);
  }
}
