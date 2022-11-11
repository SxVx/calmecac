const paddingBase = 'padding';
const marginBase = 'margin';

const baseValues = (spacingType: Spacing) =>
  ({
    [`${spacingType}X`]: ': 0 {{value}}',
    [`${spacingType}Y`]: ': {{value}} 0',
    [`${spacingType}Top`]: '-top: {{value}}',
    [`${spacingType}Bottom`]: '-bottom: {{value}}',
    [`${spacingType}Left`]: '-left: {{value}}',
    [`${spacingType}Right`]: '-right: {{value}}',
  } as SpacingProps);

const getSpacing = (
  map: `${Spacing}${SpacingValues}`,
  spacingType: Spacing,
) => {
  const margin = baseValues(spacingType);

  return Object.keys(margin)
    .map(key => ({
      key,
      value: map[key],
      transform: margin[key],
    }))
    .filter(({ value }) => !!value)
    .map(({ transform, value }) => {
      const result = transform.replace('{{value}}', value);

      return `${spacingType}${result}px;`;
    })
    .join('\n');
};

export default getSpacing;
