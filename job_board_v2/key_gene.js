import crypto from 'crypto';

// Generate secret key
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString('hex'); // 32 bytes (256 bits)
  return secretKey;
};

const secretKey = generateSecretKey();
console.log(`Generated Secret Key: ${secretKey}`);
