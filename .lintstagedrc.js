module.exports = {
  '*.{tsx,ts,js,jsx}': 'eslint --cache --fix --max-warnings=0',
  '*.{tsx,ts}': 'tsc-files --noEmit',
};
