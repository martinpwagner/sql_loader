export default class SqlManager {
    static loadDir(dirName: string): Promise<void>;
    static loadFile(fileName: string): Promise<void>;
    static getQuery(queryName: string): string;
}
