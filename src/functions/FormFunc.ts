export const preventEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
};