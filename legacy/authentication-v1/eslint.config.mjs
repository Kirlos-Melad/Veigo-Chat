// @ts-check
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/naming-convention */

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
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "enumMember",
                    format: ["PascalCase"],
                },

                {
                    selector: "classProperty",
                    format: ["camelCase", "UPPER_CASE"],
                    leadingUnderscore: "require",
                },

                {
                    selector: ["typeLike"],
                    format: ["PascalCase"],
                },

                {
                    selector: ["memberLike", "variableLike"],
                    format: ["camelCase", "UPPER_CASE"],
                    leadingUnderscore: "allow",
                },
            ],

            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],
            "no-restricted-syntax": [
                "error",
                {
                    selector: "ExportDefaultDeclaration",
                    message: "Only named exports are allowed",
                },
            ],

            "@typescript-eslint/restrict-template-expressions": [
                "error",
                {
                    allowAny: true,
                    allowBoolean: true,
                    allowNullish: true,
                    allowNumber: true,
                    allowRegExp: true,
                },
            ],

            "@typescript-eslint/explicit-member-accessibility": ["error"],
            "@typescript-eslint/explicit-function-return-type": ["error"],
            "@typescript-eslint/no-non-null-assertion": ["off"],
        },

        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: ["./tsconfig.json"],
            },
        },
    },
);
