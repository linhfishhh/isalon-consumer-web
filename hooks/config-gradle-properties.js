const { existsSync, appendFileSync, readFileSync } = require('fs');

module.exports = () => {
  const gradleExtPath = 'app/assets/mobile/android/gradle.properties';
  const gradlePath = 'platforms/android/gradle.properties';
  const encoding = 'utf8';
  const newContent = readFileSync(gradleExtPath, encoding);
  const content = readFileSync(gradlePath, encoding);
  if (existsSync(gradlePath) && !content.includes(newContent)) {
    appendFileSync(gradlePath, newContent, encoding);
  }
};
