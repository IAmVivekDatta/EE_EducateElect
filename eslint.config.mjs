import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        files: ["js/**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                window: "readonly",
                document: "readonly",
                localStorage: "readonly",
                console: "readonly",
                setTimeout: "readonly",
                HashChangeEvent: "readonly",
                fetch: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "error",
            "no-console": ["warn", { "allow": ["warn", "error"] }],
            "eqeqeq": "error",
            "no-var": "error",
            "prefer-const": "error",
            "object-shorthand": "warn"
        }
    }
];
