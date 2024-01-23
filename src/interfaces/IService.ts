interface IService<T> {
  result?: T | null,
  message?: string
  status?: number
}

export default IService;
