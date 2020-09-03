export default interface IGenerateHash {
  execute(payload: string): Promise<string>;
}
