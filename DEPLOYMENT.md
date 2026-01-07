部署到 CapRover — 说明

目标
- 在 GitHub Actions 中完成 CI（构建、测试）并在 `main` 分支 push 时自动部署到 CapRover（CD）。

已做的更改
- 更新了 `.github/workflows/build.yml`，添加了 `deploy` job，在 `main` 分支的 push 事件上触发，完成构建后调用 `caprover/gh-action-deploy@v1`。

必要的 GitHub Secrets
- `CAPROVER_URL` — 你的 CapRover 管理面板 URL，例如 `https://captain.example.com`
- `CAPROVER_APP_NAME` — 在 CapRover 上的应用名称（App 名称，不是 Docker 镜像名）
- `CAPROVER_PASSWORD` — CapRover 的 password（或部署 token / API key，取决于你的 CapRover 配置）

如果使用 `docker.yml` 中的 Docker image 自动推送并让 CapRover 拉取（示例文件中使用了 `caprover/deploy-from-github@v1.1.2`），请在仓库 Secrets 中设置：
- `CAPROVER_SERVER` — CapRover 管理面板 URL（示例中作为 `server` 传入 action）。
- `APP_NAME` — CapRover 应用名（示例中作为 `app` 传入 action）。
- `APP_TOKEN` — CapRover 部署 token（示例中作为 `token` 传入 action）。

如何在仓库中设置 Secrets
1. 打开 GitHub 仓库页面 → Settings → Secrets and variables → Actions
2. 点击 "New repository secret" 并添加上面的三个变量

注意与建议
- 本次 workflow 使用了 `caprover/gh-action-deploy@v1` 社区 Action。请根据你自己的 CapRover 版本与配置检查 Action 的输入需要项；如果你使用不同的认证（例如 API token），可能需要调整 `CAPROVER_PASSWORD` 的含义或更换成 `CAPROVER_API_KEY`。
- 如果你的部署方式是通过 Docker 镜像（比如先推镜像到 Docker Hub，再让 CapRover pull 镜像），建议把构建镜像并推送到注册表的步骤加入 workflow，并在 CapRover 上配置拉取镜像。
- 如果你希望我把 workflow 改为先构建镜像并推送到 Docker Hub（然后通过 CapRover 更新镜像）或使用 SSH/CLI 方式部署，请告诉我，我会按照你的首选方式修改并补充示例。

参考
- CapRover 官方文档: https://caprover.com/docs/ci-cd-integration/deploy-from-github.html

快速验证（在本地/远程）
1. 在 GitHub 仓库中添加上述 Secrets。
2. Push 到 `main` 分支，检查 Actions → build workflow 运行情况。
3. 若部署失败，打开 Actions 的 "Deploy to CapRover" 步骤日志，复制报错给我我来定位并修复。
