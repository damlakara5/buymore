 const sizeOptionsConfig = {
    shoes: ["36", "37", "38"],
    clothing: ["S", "M", "L"],
    shirts: ["S", "M", "L"],
    sweaters: ["S", "M", "L"],
    pants: ["S", "M", "L"],
  };
  

 export function getSizeOptions(categories) {
    // `sizeOptionsConfig` içinde tanımlı olan kategorileri kontrol ediyoruz
    for (const category of categories) {
      if (sizeOptionsConfig[category]) {
        // Eğer kategori `sizeOptionsConfig` içinde varsa, ilgili beden ölçülerini dönüyoruz
        return sizeOptionsConfig[category];
      }
    }
  
    // Eğer hiçbir kategori `sizeOptionsConfig` içinde tanımlı değilse, boş bir dizi dönüyoruz
    return [];
  }


  export default sizeOptionsConfig