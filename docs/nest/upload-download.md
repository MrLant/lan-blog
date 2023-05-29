---
title: 文件上传与下载
date: 2023/05/29
---

## 文件上传

为了处理文件上传，Nest 提供了一个内置的基于 multer 中间件包的 Express 模块。Multer 处理以 multipart/form-data 格式发送的数据，该格式主要用于通过 HTTP POST 请求上传文件。这个模块是完全可配置的，您可以根据您的应用程序需求调整它的行为。

> npm i -D @types/multer

```js
// upload.module.ts
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../images'),
        filename: (_, file, cb) => {
          const filename = `${
            new Date().getTime() + extname(file.originalname)
          }`;
          return cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}

// upload.controller.ts
@Post('album')
@UseInterceptors(FileInterceptor('file'))
upload(@UploadedFile() file) {
  console.log(file);
  return true;
}
// 设置访问前缀
app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/static',
  });
```

## 文件下载

### 直接下载

```js
@Get('export')
download(@Res() res) {
  res.download(join(__dirname, '../images/1685350370767.jpg'));
}
```

### 流文件下载

```js
@Get('stream')
downloadStream() {
  const file = createReadStream(
    join(__dirname, '../images/1685350370767.jpg'),
  );
  return new StreamableFile(file);
}
```