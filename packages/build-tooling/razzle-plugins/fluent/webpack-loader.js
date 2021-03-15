const { getOptions } = require("loader-utils")
const { validate } = require('schema-utils');

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string',
    },
  },
};

function loader(source) {
  const options = getOptions(this);

  validate(schema, options, {
    name: 'Fluent loader',
    baseDataPath: 'options',
  });

  // Apply some transformations to the source...
  console.log('START----------');
  console.log(source);
  console.log('END----------');

  return source;
}

module.exports = {
  default: loader,
};
