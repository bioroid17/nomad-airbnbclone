export const formatDate = (date: string) =>
  date
    .split(".")
    .filter((value, index) => index !== 3)
    .map((s) => {
      return s.trim();
    })
    .join("-");
