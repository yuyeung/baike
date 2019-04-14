/**
 * 行内调用 tryCatch
 * @author Jason
 */
export default async function tryCatch<T = any, E = Error> (promise: Promise<T>): Promise<[T, E]> {
  try {
    const res = await promise
    return [res, null]
  } catch (e) {
    return [null, e]
  }
}
