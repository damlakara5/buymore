const { faker } = require('@faker-js/faker');

const generateProduct = () => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  quantity: faker.random.number({ min: 1, max: 5 }),
  brand: faker.company.buzzNoun()
  // ... other fields
});

const generateJSONData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(generateProduct());
  }
  return data;
};

const jsonData = generateJSONData(200); // Generate 200 products

console.log(JSON.stringify(jsonData, null, 2)); // Print the JSON data
