export const getPlaceholdersText = (
  key: string,
  total: number,
  totalSelected: number,
  plural?: string
) => {
  const isAllSelected = total === totalSelected||totalSelected===0

  const pluralString = totalSelected > 1||isAllSelected ? (plural ? plural : `${key}s`) : key;

  return isAllSelected
    ? `All ${pluralString} selected`
    : totalSelected > 0
    ? `${totalSelected} ${pluralString} selected`
    : "Select";
};
