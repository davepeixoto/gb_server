export default interface ICompareHasc {
  execute(payload: string, hashed: string): Promise<boolean>;
}
