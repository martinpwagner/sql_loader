"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const util_1 = require("util");
const readDirAsync = (0, util_1.promisify)(fs_1.readdir);
const readFileAsync = (0, util_1.promisify)(fs_1.readFile);
const queries = new Map();
class SqlManager {
    static loadDir(dirName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileNames = yield readDirAsync(dirName);
                for (const fileName of fileNames) {
                    const fileNameWithoutExt = (0, path_1.basename)(fileName, '.sql');
                    if (!Boolean(queries.get(fileNameWithoutExt))) {
                        const file = yield readFileAsync((0, path_1.join)(dirName, fileName), 'utf-8');
                        queries.set(fileNameWithoutExt, file);
                    }
                }
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    static loadFile(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileNameWithoutExt = (0, path_1.basename)(fileName, '.sql');
                if (!Boolean(queries.get(fileNameWithoutExt))) {
                    const file = yield readFileAsync(fileName, 'utf-8');
                    queries.set(fileNameWithoutExt, file);
                }
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    static getQuery(queryName) {
        return queries.get(queryName);
    }
}
exports.default = SqlManager;
