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
  COMMUNITY_EVENT_NOT_FOUND = 'COMMUNITY_EVENT_NOT_FOUND',
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
  [AppErrorType.COMMUNITY_EVENT_NOT_FOUND]: 404,
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

export function UserNotFoundError(): AppError {
  return new AppError('Usuário não encontrado', AppErrorType.USER_NOT_FOUND);
}

export function CommunityAlreadyExistsError(): AppError {
  return new AppError(
    'Comunidade já existe',
    AppErrorType.COMMUNITY_ALREADY_EXISTS,
  );
}

export function CommunityNotFoundError(): AppError {
  return new AppError(
    'Comunidade não encontrada',
    AppErrorType.COMMUNITY_NOT_FOUND,
  );
}

export function UserAlreadyExistsError(): AppError {
  return new AppError('Usuário já existe', AppErrorType.USER_ALREADY_EXISTS);
}

export function UserUnauthorizedError(): AppError {
  return new AppError('Usuário não autorizado', AppErrorType.USER_UNAUTHORIZED);
}

export function CommunityUnauthorizedError(): AppError {
  return new AppError(
    'Comunidade não autorizada',
    AppErrorType.COMMUNITY_UNAUTHORIZED,
  );
}

export function UserAlreadyJoinedError(): AppError {
  return new AppError(
    'Usuário já está na comunidade',
    AppErrorType.USER_ALREADY_JOINED,
  );
}

export function OwnerCannotJoinError(): AppError {
  return new AppError(
    'O dono não pode entrar na comunidade',
    AppErrorType.OWNER_CANNOT_JOIN,
  );
}

export function NotMemberError(): AppError {
  return new AppError(
    'Usuário não é membro da comunidade',
    AppErrorType.NOT_MEMBER,
  );
}

export function CommunityEventNotFoundError(): AppError {
  return new AppError(
    'Evento não encontrado',
    AppErrorType.COMMUNITY_EVENT_NOT_FOUND,
  );
}
