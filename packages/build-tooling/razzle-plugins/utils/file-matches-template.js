module.exports = {
  fileMatchesTemplate,
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
function escapeRegExp(string) {
  return string.replace(/[$()*+.?[\\\]^{|}-]/g, "\\$&");
}

/**
 * This is used to verify that an assets filename matches the pattern defined by
 * a filename config of the loader
 *
 * @param {string} filePath name of the generated file during the webpack build
 * @param {string} nameTemplate webpack filename output template string EG. "file.[hash:8].js"
 */
function fileMatchesTemplate(filePath, nameTemplate) {
  const matches = [...nameTemplate.matchAll(/(\[[^\]]*])/g)].map(
    (match) => match[0],
  );

  const segments = [];
  const matchers = [];

  if (matches.length > 0) {
    const firstMatchStart = nameTemplate.indexOf(matches[0]);
    const segment1 = nameTemplate.slice(0, firstMatchStart);
    const matcher1 = escapeRegExp(segment1);
    segments.push(segment1);
    matchers.push(matcher1);
  }

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const nextMatch = matches[i + 1];
    segments.push(match);
    matchers.push(".*");

    const current = segments.join("");
    const remaining = nameTemplate.replace(current, "");
    const nextMatchIdx = nextMatch ? remaining.indexOf(nextMatch) : null;

    if (nextMatchIdx) {
      const segment = remaining.slice(0, nextMatchIdx);
      segments.push(segment);
      matchers.push(escapeRegExp(segment));
    }
  }

  const re = new RegExp(matchers.map((str) => `(${str})`).join(""));
  const result = re.test(filePath);

  // NOTE: this can be uncommented to create test fixtures more easily
  // console.log(`[${result}, "${filePath}", "${nameTemplate}"],`);

  return result;
}
