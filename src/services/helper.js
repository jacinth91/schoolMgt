export const reverseTransform = (array) => {
  if (!Array.isArray(array)) return {};

  return array.reduce((acc, { label, value }) => {
    const key = formatKey(label);
    acc[key] = value;
    return acc;
  }, {});
};

export const formatKey = (label) => {
  return label
    .toLowerCase()
    .replace(/\s(.)/g, (match) => match.toUpperCase()) // Convert spaces to camelCase
    .replace(/\s+/g, "") // Remove spaces
    .replace(/^[A-Z]/, (match) => match.toLowerCase()); // Ensure first letter is lowercase
};

export const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, " $1") // Convert camelCase to words
    .replace(/[_-]/g, " ") // Replace underscores/hyphens with space
    .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter
    .trim();
};

export const transform = (data, skipKeys, nonEditableFields) => {
  return Object.entries(data)
    .filter(([key, value]) => !skipKeys.includes(key)) // Exclude unnecessary fields
    .map(([key, value]) => ({
      label: formatLabel(key),
      value: value,
      editable: !nonEditableFields.includes(key),
    }));
};
