export const filterData = (data, filteringString) => {
  return data.filter((item) => {
    // 'item' objesinin valueları arasında gezin, eğer en az 1 tanesi filterInputValue değerini içeriyorsa true dön:

    return Object.values(item)?.some((elem) => {
      if (typeof elem == "string") {
        // value'nun type'ı string mi? eğer öyleyse içeriyor mu diye kontrol et, içeriyorsa true dön:
        return elem.toLowerCase().includes(filteringString.toLowerCase());
      } else if (typeof elem == "object") {
        // value'nun type'ı object ise onun da valueları arasında aynı şekilde dön (1 katman daha ekledik):
        return Object.values(elem)?.some((elemProp) => {
          if (typeof elemProp == "string") {
            return elemProp
              .toLowerCase()
              .includes(filteringString.toLowerCase());
          }
        });
      }
    });
  });
};
