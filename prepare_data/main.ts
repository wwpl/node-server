import { fakerJA } from '@faker-js/faker';

console.log('id,first_name,last_name');
for (let i = 1; i <= 100; i++) {
  console.log(
    `${i},${fakerJA.person.firstName()},${fakerJA.person.lastName()}`,
  );
}
