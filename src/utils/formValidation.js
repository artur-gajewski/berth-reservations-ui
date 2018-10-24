import Joi from 'joi';

export default schema => values => {
  const { error } = Joi.validate(values, schema, { abortEarly: false, allowUnknown: true });

  if (error && error.details) {
    const { details } = error;
    console.log('ERROOR', details);
    return details.reduce(
      (reduction, current) => ({
        ...reduction,
        [current.context.key]: current.message
      }),
      {}
    );
  }
  console.log('KAIKKI OK!');
  return {};
};
