export function generateCombinations(variations) {
  if (variations.length === 0) return [];

  const result = variations.reduce((acc, variation) => {
    if (acc.length === 0)
      return variation.options.map((option) => ({
        [String(variation.type).toLowerCase()]: option,
      }));

    const newAcc = [];

    acc.forEach((item) => {
      variation.options.forEach((option) => {
        newAcc.push({
          ...item,
          [String(variation.type).toLowerCase()]: option,
        });
      });
    });

    return newAcc;
  }, []);

  return result;
}
