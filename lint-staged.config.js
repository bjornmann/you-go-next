module.exports = {
  "**/*.ts?(x)": "eslint --fix",
  "**/*.ts?(x)": () => "tsc -p tsconfig.json --noEmit --pretty",
};
