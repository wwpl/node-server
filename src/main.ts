import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';
import * as _cluster from 'cluster';
const cluster = _cluster as unknown as _cluster.Cluster; // typings fix
async function bootstrap() {
  if (cluster.isMaster) {
    // ここを isMaster → isPrimary に変更
    console.log(`Master process ${process.pid} is running`);

    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died, restarting...`);
      cluster.fork();
    });
  } else {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    await app.listen(3000);
    console.log(`Worker process ${process.pid} started on port 3000`);
  }
}

bootstrap();
