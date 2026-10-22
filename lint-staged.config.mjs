const config = {
  "*.{ts,tsx}": ["prettier --write", "eslint --fix"],
  "*.{json,md,css,mjs}": ["prettier --write"],
};

export default config;
