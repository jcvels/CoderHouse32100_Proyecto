const { encrypt, validate } = require('../helpers/encryptor');

const getValidationResult = async (data) => {
  const hash = await encrypt(data);
  const validation = await validate(data, hash);
  return validation
}

test('Encriptación y validación #1', async () => {
  expect( await getValidationResult('prueba-de-encriptación') ).toBe( true )
});

test('Encriptación y validación #2', async () => {
  expect( await getValidationResult('Validación de encriptación y validación #2') ).toBe( true )
});

test('Encriptación y validación #3', async () => {
  expect( await getValidationResult('abcdefghyjklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890!@#$%^&*()_-=+[]":;,.<>/') ).toBe( true )
});