export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHasc(payload: string, hashed: string): Promise<boolean>;
}
