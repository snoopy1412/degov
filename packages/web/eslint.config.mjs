import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // 添加 import 插件配置
  {
    plugins: {
      import: importPlugin,
      "@typescript-eslint": typescriptEslintPlugin,
    },
    rules: {
      // 导入排序规则
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node.js 内置模块
            "external", // node_modules 包
            "internal", // 以 @ 开头的内部别名路径
            "parent", // 父级目录的导入
            "sibling", // 同级目录的导入
            "index", // 当前目录的导入
            "object", // 对象导入
            "type", // 类型导入
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          "newlines-between": "always", // 不同组之间添加空行
          alphabetize: {
            order: "asc", // 按字母顺序排序
            caseInsensitive: true, // 忽略大小写
          },
        },
      ],
      
      // 强制使用显式类型导入
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports", // 优先使用 import type
          disallowTypeAnnotations: true, // 禁止在运行时导入语句中使用类型注释
          fixStyle: "separate-type-imports", // 使用单独的 import type 语句
        },
      ],
    },
  },
];

export default eslintConfig;
