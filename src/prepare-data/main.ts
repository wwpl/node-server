import { fakerJA } from '@faker-js/faker';
import { writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { exec } from 'child_process';
// ユーザーテーブルの事前条件準備
let data = 'id,first_name,last_name\n';
for (let i = 1; i <= 100; i++) {
  data += `${i},${fakerJA.person.firstName()},${fakerJA.person.lastName()}\n`;
}

const tableName = 'user';
const filePath = `${process.cwd()}/src/prepare-data/users.csv`;
if (!existsSync(filePath)) {
  writeFile(filePath, data)
    .then((result) => {
      console.log(result); // 非同期処理完了！
    })
    .catch((error) => {
      console.error('エラー:', error);
    });
}
execCommand(`truncate table "${tableName}"`);
execCommand(`\\copy "${tableName}" from '${filePath}' (format csv,header)`);

function execCommand(command: string) {
  exec(
    `export PGPASSWORD=postgres && psql -h service_postgres_efasdfasd -p 5432 -U postgres -d db01 -c '${command}';`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`エラーが発生しました: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`エラー出力: ${stderr}`);
        return;
      }
      console.log(`実行結果:\n${stdout}`);
    },
  );
}
