import projectEslintConfig from '../../eslint.config.mjs';

export default [
    {
        files: ['src/**/*.{js,ts,jsx,tsx}'],
    },
    ...projectEslintConfig
];