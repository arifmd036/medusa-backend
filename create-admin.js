const { execSync } = require('child_process');

// Create admin user using Medusa CLI
try {
  console.log('Creating admin user...');
  
  // Try different approaches to create admin user
  const commands = [
    'npx medusa user create --email admin@medusa.com --password supersecret',
    'npx medusa user -e admin@medusa.com -p supersecret',
    'npx medusa exec "console.log(\'Creating user...\')"'
  ];
  
  for (const cmd of commands) {
    try {
      console.log(`Trying: ${cmd}`);
      const result = execSync(cmd, { encoding: 'utf8', timeout: 30000 });
      console.log('Success:', result);
      break;
    } catch (error) {
      console.log(`Failed: ${error.message}`);
    }
  }
  
} catch (error) {
  console.error('Error creating admin user:', error.message);
}

console.log('\nTry logging in with:');
console.log('Email: admin@medusa.com');
console.log('Password: supersecret');
console.log('Admin URL: http://localhost:9000/app');
