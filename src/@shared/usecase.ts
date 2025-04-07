export interface Usecase<I, O> {
  execute(data: I): Promise<O>;
}
