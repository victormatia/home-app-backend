interface IService<T = string | { token: string; userId: string; }> {
  result?: T | null,
  message?: string
  userId?: string
}

export default IService;