部署到 CapRover — 说明

目标
- 自动构建 Docker 镜像并推送到 GitHub Container Registry (GHCR)。
- 在每次 push 到 `master` 分支时，通过 CapRover Action 触发应用部署（拉取新镜像）。

工作流概览
1. **构建镜像** (`docker.yml`)：检出代码 → 登录 GHCR → 构建镜像 → 推送到 `ghcr.io/renkunx/socialify:master`。
2. **部署** (`docker.yml`)：通过先设置环境变量 `IMAGE_URL`，再用 `caprover/deploy-from-github@v1.1.2` action 部署（遵循官方示例做法）。

必要的 GitHub Secrets
在仓库 Settings → Secrets and variables → Actions 中添加：
- `CAPROVER_SERVER` — CapRover 管理面板 URL，例如 `https://captain.example.com`。
- `APP_NAME` — CapRover 上的应用名（可在 CapRover 仪表盘 → Apps 页面查看）。
- `APP_TOKEN` — CapRover API token（获取方式：在 CapRover 仪表盘点击用户头像 → API Token / 或通过 CapRover CLI 生成）。

关键做法
- **环境变量方式**：不在 `with` 中直接放置复杂表达式，而是先通过 `run` 步骤（或 `github env` 文件）设置环境变量，再在 action 的 `with` 中引用该变量。这样可以避免 action 参数解析的各种 PowerShell 陷阱。
- 官方示例参考：https://caprover.com/docs/ci-cd-integration/deploy-from-github.html

故障排查

1. **镜像推送失败**（GHCR 认证）：
   - 确保 GitHub Token 有 `write:packages` 权限。
   - 如果使用个人访问令牌 (PAT)，确保勾选了 `write:packages`。

2. **部署失败（action 返回错误）**：
   - 检查 `CAPROVER_SERVER` 是否以 `https://` 开头。
   - 确认 `APP_NAME` 与 CapRover 仪表盘中应用的名称完全一致（区分大小写）。
   - 验证 `APP_TOKEN` 是否有效且尚未过期。
   - 在 Actions 日志中查看 action 的完整输出。

3. **CapRover 未拉取新镜像**：
   - 确保镜像已成功推送到 GHCR（检查 GitHub Packages 页面）。
   - 在 CapRover 应用设置中，配置镜像源为 `ghcr.io/renkunx/socialify:master`。
   - 检查 CapRover 应用日志查看拉取镜像是否成功。

快速验证步骤

1. Push 到 `master` 分支触发工作流，在 GitHub Actions 页面观察：
   - Docker 构建日志（确认镜像推送到 GHCR）。
   - Deploy 步骤的输出（确认 action 调用成功）。

2. 检查 CapRover 仪表盘应用状态（是否已更新镜像并重新启动）。

参考

- CapRover 官方文档：https://caprover.com/docs/ci-cd-integration/deploy-from-github.html
