import path from "path";
import { fileURLToPath } from "url";

function absolutePath(url: string | URL): string {
    const fileName = fileURLToPath(url);

    return path.dirname(fileName);
}

export { absolutePath };
