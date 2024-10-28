export const generateUniqueCode = (firstVal, secondVal) => {
  const year = new Date().getFullYear().toString().slice(-2); // mevcut yıl, 2 haneli
  const month =
    new Date().getMonth() < 10
      ? "0" + new Date().getMonth()
      : new Date().getMonth(); // mevcut ay, eğer 10 dan küçükse başına 0 ekle
  const timeInMs = Date.now().toString().slice(-5); // current Time'ın ms cinsinden son 5 rakamını al

  return (
    year + firstVal.toUpperCase() + month + secondVal.toUpperCase() + timeInMs
  );
};
