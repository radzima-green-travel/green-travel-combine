const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const manifestPath = path.join(
  __dirname,
  'android/app/src/main/AndroidManifest.xml',
);

fs.readFile(manifestPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading AndroidManifest.xml:', err);
    return;
  }

  xml2js.parseString(data, (err, result) => {
    if (err) {
      console.error('Error parsing XML:', err);
      return;
    }

    // Find and remove the permissions
    const permissions = result.manifest['uses-permission'] || [];
    const filteredPermissions = permissions.filter(permission => {
      const permissionName = permission.$['android:name'];
      return (
        permissionName !== 'android.permission.READ_EXTERNAL_STORAGE' &&
        permissionName !== 'android.permission.WRITE_EXTERNAL_STORAGE'
      );
    });

    // Update the permissions in the result object
    result.manifest['uses-permission'] = filteredPermissions;

    // Convert the JS object back to XML
    const builder = new xml2js.Builder();
    const updatedXml = builder.buildObject(result);

    // Write the updated XML back to the file
    fs.writeFile(manifestPath, updatedXml, err => {
      if (err) {
        console.error('Error writing updated AndroidManifest.xml:', err);
      } else {
        console.log('AndroidManifest.xml updated successfully!');
      }
    });
  });
});
