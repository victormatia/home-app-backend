interface IService<T = string | { token: string; userId: string; }> {
  result?: T | null,
  message?: string,
  userId?: string,
  status?: number
}

export default IService;