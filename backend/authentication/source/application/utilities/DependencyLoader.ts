import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

function load(directory: string, recursive?: boolean): string[] {
    const directoryContent = fs.readdirSync(directory, {
        withFileTypes: true,
    });

    const files: string[] = [];

    for (const content of directoryContent) {
        const contentPath = path.join(directory, content.name);

        if (content.isDirectory() && recursive)
            files.push(...load(contentPath, true));
        else if (content.isFile()) files.push(contentPath);
    }

    return files;
}

async function dependencyLoader(
    directory: string,
    recursive?: boolean,
): Promise<unknown[]> {
    const dependencies = load(directory, recursive);

    const promises = dependencies.map(
        async (dependencyPath): Promise<unknown> => {
            const dependencyPathUrl = pathToFileURL(dependencyPath).href;
            const dependency = (await import(dependencyPathUrl)) as unknown;
            return dependency;
        },
    );

    const results = await Promise.all(promises);
    return results;
}

export { dependencyLoader };
