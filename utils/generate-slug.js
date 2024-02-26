export function generateSlug(string) {
  let splitString = string.split(" ");
  let joinString = splitString.join("-");

  let slug = joinString.toLowerCase();
  return slug;
}
