const { Encryptor } = require('./encryptor.class');

const getValidationResult = async (data) => {
  const hash = await Encryptor.encrypt(data);
  const validation = await Encryptor.validate(data, hash);
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