export function generateCombinations(variations, existingCombinations) {
  return variations.reduce(
    (acc, { name, options }) => {
      const newCombinations = [];
      acc.forEach((oldCombination) => {
        options.forEach((option) => {
          const newCombination = { ...oldCombination, [name]: option };
          const existingCombination = existingCombinations.find((combination) =>
            Object.entries(combination).every(([key, value]) => {
              if (key === "price" || key === "quantity") return true;
              return newCombination[key] === value;
            })
          );
          newCombinations.push({
            ...newCombination,
            price: existingCombination ? existingCombination.price : "",
            quantity: existingCombination ? existingCombination.quantity : "",
          });
        });
      });
      return newCombinations;
    },
    [{}]
  );
}
