// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

/* eslint-disable-next-line no-restricted-syntax */
export default tseslint.config(
    // Ignores must be on top alone
    { ignores: ["./eslint.config.mjs", "**/generated/"] },

    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,

    {
        rules: {
            ...eslintConfigPrettier.rules,
            /* eslint-disable-next-line @typescript-eslint/naming-convention */
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "interface",
                    format: ["PascalCase"],
                    prefix: ["I"],
                },
            ],
            "no-restricted-syntax": [
                "error",
                {
                    selector: "ExportDefaultDeclaration",
                    message: "Only named exports are allowed",
                },
            ],
        },

        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: ["./tsconfig.json"],
            },
        },
    },
);
