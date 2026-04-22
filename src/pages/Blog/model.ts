// src/model.ts
import { message } from "antd";

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  tags: string[];
  status: "draft" | "published";
  createdAt: string;
  author: string;
  views: number;
};

export type TagType = {
  id: string;
  name: string;
};

// Mock Data
let posts: Post[] = [
  {
    id: "1",
    title: "Lập trình React với TypeScript",
    slug: "lap-trinh-react-voi-typescript",
    content: "React là một thư viện JavaScript phổ biến để xây dựng giao diện người dùng. Khi kết hợp với TypeScript, nó mang lại trải nghiệm phát triển tuyệt vời với khả năng kiểm tra kiểu dữ liệu tĩnh, giúp giảm thiểu lỗi và cải thiện khả năng bảo trì code.\n\n## Tại sao nên dùng TypeScript?\n- **An toàn hơn**: Phát hiện lỗi khi biên dịch.\n- **Tự động hoàn thành**: IDE hỗ trợ tốt hơn.\n- **Dễ dàng tái cấu trúc**: Thay đổi code an toàn hơn.\n\n## Kết luận\nHãy bắt đầu sử dụng TypeScript cho dự án React của bạn ngay hôm nay!",
    thumbnail: "https://picsum.photos/id/0/300/200",
    tags: ["react", "typescript"],
    status: "published",
    createdAt: "2024-01-15",
    author: "Nguyễn Văn A",
    views: 120,
  },
  {
    id: "2",
    title: "Hướng dẫn sử dụng Ant Design",
    slug: "huong-dan-su-dung-ant-design",
    content: "Ant Design là một thư viện UI mạnh mẽ và phổ biến cho React. Nó cung cấp một bộ component đẹp mắt, dễ sử dụng và có khả năng tùy biến cao.\n\n### Cài đặt\n```bash\nnpm install antd\n```\n\n### Sử dụng\nChỉ cần import component và sử dụng. Hệ thống design của Ant Design giúp bạn xây dựng ứng dụng chuyên nghiệp một cách nhanh chóng.",
    thumbnail: "https://picsum.photos/id/1/300/200",
    tags: ["antd", "react"],
    status: "published",
    createdAt: "2024-01-20",
    author: "Trần Thị B",
    views: 85,
  },
  {
    id: "3",
    title: "Quản lý state với Redux Toolkit",
    slug: "quan-ly-state-voi-redux-toolkit",
    content: "Redux Toolkit là cách được khuyến nghị để viết logic Redux. Nó đơn giản hóa quy trình làm việc với Redux, giảm boilerplate code và tích hợp sẵn các best practices.\n\n**Các tính năng chính:**\n- `configureStore()`: Cấu hình store với các middleware mặc định.\n- `createSlice()`: Tạo actions và reducers một cách dễ dàng.\n- `createAsyncThunk`: Xử lý các tác vụ bất đồng bộ.",
    thumbnail: "https://picsum.photos/id/2/300/200",
    tags: ["redux", "react"],
    status: "draft",
    createdAt: "2024-01-25",
    author: "Lê Văn C",
    views: 45,
  },
  {
    id: "4",
    title: "Tối ưu hiệu suất React",
    slug: "toi-uu-hieu-suat-react",
    content: "Hiệu suất là một yếu tố quan trọng trong ứng dụng React. Dưới đây là một số mẹo giúp tối ưu hóa:\n\n1. **Sử dụng React.memo()** để tránh render lại không cần thiết.\n2. **Sử dụng useMemo và useCallback** để ghi nhớ giá trị và hàm.\n3. **Code splitting** với React.lazy và Suspense.\n4. **Virtualization** cho danh sách dài.\n5. **Tránh inline functions** trong props nếu có thể.",
    thumbnail: "https://picsum.photos/id/3/300/200",
    tags: ["react", "performance"],
    status: "published",
    createdAt: "2024-02-01",
    author: "Nguyễn Văn A",
    views: 210,
  },
  {
    id: "5",
    title: "Giới thiệu về Next.js",
    slug: "gioi-thieu-ve-nextjs",
    content: "Next.js là framework React phổ biến cho phép render phía server (SSR) và tạo trang tĩnh (SSG). Nó giải quyết nhiều vấn đề của Single Page Application (SPA) như SEO và thời gian tải trang ban đầu.\n\n**Các tính năng nổi bật:**\n- Server-side rendering\n- Static site generation\n- API routes\n- File-based routing\n- Built-in CSS support",
    thumbnail: "https://picsum.photos/id/4/300/200",
    tags: ["nextjs", "react"],
    status: "published",
    createdAt: "2024-02-10",
    author: "Trần Thị B",
    views: 150,
  },
  {
    id: "6",
    title: "Làm việc với REST API trong React",
    slug: "lam-viec-voi-rest-api-trong-react",
    content: "Gọi API là một phần không thể thiếu trong ứng dụng React hiện đại. Bạn có thể sử dụng `fetch` hoặc các thư viện như Axios.\n\n**Ví dụ với Axios:**\n```javascript\nimport axios from 'axios';\n\nconst fetchData = async () => {\n  const response = await axios.get('https://api.example.com/posts');\n  console.log(response.data);\n};\n```\n\nQuản lý trạng thái loading và error cũng rất quan trọng để có trải nghiệm người dùng tốt.",
    thumbnail: "https://picsum.photos/id/5/300/200",
    tags: ["api", "javascript"],
    status: "published",
    createdAt: "2024-02-15",
    author: "Lê Văn C",
    views: 95,
  },
  {
    id: "7",
    title: "CSS-in-JS với Styled Components",
    slug: "css-in-js-voi-styled-components",
    content: "Styled Components là một thư viện CSS-in-JS phổ biến, cho phép bạn viết CSS trực tiếp trong JavaScript. Nó giúp tạo ra các component có style riêng biệt, tránh xung đột class và dễ dàng quản lý theme.\n\n**Ví dụ:**\n```javascript\nimport styled from 'styled-components';\n\nconst Button = styled.button`\n  background: palevioletred;\n  border-radius: 3px;\n  border: none;\n  color: white;\n  padding: 8px 16px;\n`;\n```",
    thumbnail: "https://picsum.photos/id/6/300/200",
    tags: ["css", "javascript"],
    status: "draft",
    createdAt: "2024-02-20",
    author: "Nguyễn Văn A",
    views: 60,
  },
  {
    id: "8",
    title: "Testing React với Jest và React Testing Library",
    slug: "testing-react-voi-jest-va-react-testing-library",
    content: "Testing giúp đảm bảo chất lượng ứng dụng. Jest là framework testing phổ biến, và React Testing Library cung cấp các công cụ để test component theo cách người dùng tương tác.\n\n**Nguyên tắc chính:** Test hành vi, không test chi tiết triển khai. Viết test đơn giản, dễ bảo trì.\n\n**Ví dụ test:**\n```javascript\nimport { render, screen } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\n\ntest('click button increments count', async () => {\n  render(<Counter />);\n  const button = screen.getByRole('button');\n  await userEvent.click(button);\n  expect(screen.getByText('Count: 1')).toBeInTheDocument();\n});\n```",
    thumbnail: "https://picsum.photos/id/7/300/200",
    tags: ["testing", "react"],
    status: "published",
    createdAt: "2024-03-01",
    author: "Trần Thị B",
    views: 78,
  },
  {
    id: "9",
    title: "Xây dựng Custom Hooks trong React",
    slug: "xay-dung-custom-hooks-trong-react",
    content: "Custom Hooks cho phép bạn tái sử dụng logic stateful giữa các component. Một custom hook là một hàm JavaScript bắt đầu bằng 'use' và có thể gọi các hooks khác.\n\n**Ví dụ useWindowSize:**\n```javascript\nimport { useState, useEffect } from 'react';\n\nfunction useWindowSize() {\n  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });\n\n  useEffect(() => {\n    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });\n    window.addEventListener('resize', handleResize);\n    return () => window.removeEventListener('resize', handleResize);\n  }, []);\n\n  return size;\n}\n```",
    thumbnail: "https://picsum.photos/id/8/300/200",
    tags: ["react", "hooks"],
    status: "published",
    createdAt: "2024-03-10",
    author: "Lê Văn C",
    views: 110,
  },
  {
    id: "10",
    title: "React Router v6",
    slug: "react-router-v6",
    content: "React Router là thư viện định tuyến tiêu chuẩn cho React. Phiên bản 6 giới thiệu nhiều cải tiến như API `useRoutes`, component `<Outlet />` và hook `useNavigate`.\n\n**Các thay đổi chính:**\n- `<Switch>` được thay bằng `<Routes>`\n- `useHistory` được thay bằng `useNavigate`\n- Thêm `<Outlet />` cho nested routes\n- Route matching dựa trên pattern mới",
    thumbnail: "https://picsum.photos/id/9/300/200",
    tags: ["react", "router"],
    status: "published",
    createdAt: "2024-03-15",
    author: "Nguyễn Văn A",
    views: 130,
  },
  {
    id: "11",
    title: "Form handling với React Hook Form",
    slug: "form-handling-voi-react-hook-form",
    content: "React Hook Form là thư viện giúp xử lý form hiệu quả với hiệu suất cao. Nó sử dụng uncontrolled components và refs để giảm thiểu số lần render lại.\n\n**Ưu điểm:**\n- Giảm lượng code\n- Hiệu suất tốt\n- Dễ dàng tích hợp với các thư viện validation như Zod, Yup\n- Hỗ trợ TypeScript tốt",
    thumbnail: "https://picsum.photos/id/10/300/200",
    tags: ["react", "forms"],
    status: "draft",
    createdAt: "2024-03-20",
    author: "Trần Thị B",
    views: 55,
  },
  {
    id: "12",
    title: "Quản lý môi trường với dotenv",
    slug: "quan-ly-moi-truong-voi-dotenv",
    content: "Biến môi trường giúp bạn cấu hình ứng dụng cho các môi trường khác nhau (development, staging, production) mà không cần thay đổi code.\n\n**Với Create React App:** Tạo file `.env` với prefix `REACT_APP_`. Ví dụ: `REACT_APP_API_URL=https://api.example.com`. Truy cập qua `process.env.REACT_APP_API_URL`.\n\n**Best practices:**\n- Không commit file `.env` lên repository\n- Tạo file `.env.example` làm mẫu\n- Validate biến môi trường khi ứng dụng khởi động",
    thumbnail: "https://picsum.photos/id/11/300/200",
    tags: ["javascript", "configuration"],
    status: "published",
    createdAt: "2024-03-25",
    author: "Lê Văn C",
    views: 70,
  },
  {
    id: "13",
    title: "Lazy Loading trong React",
    slug: "lazy-loading-trong-react",
    content: "Lazy loading giúp cải thiện hiệu suất tải trang ban đầu bằng cách chỉ tải các component khi cần thiết. React cung cấp `React.lazy()` và `Suspense` để hỗ trợ điều này.\n\n**Ví dụ:**\n```javascript\nimport React, { Suspense } from 'react';\n\nconst OtherComponent = React.lazy(() => import('./OtherComponent'));\n\nfunction MyComponent() {\n  return (\n    <Suspense fallback={<div>Loading...</div>}>\n      <OtherComponent />\n    </Suspense>\n  );\n}\n```\n\nLazy loading đặc biệt hữu ích cho các ứng dụng lớn với nhiều routes.",
    thumbnail: "https://picsum.photos/id/12/300/200",
    tags: ["react", "performance"],
    status: "published",
    createdAt: "2024-04-01",
    author: "Nguyễn Văn A",
    views: 89,
  },
  {
    id: "14",
    title: "TypeScript Utility Types hữu ích",
    slug: "typescript-utility-types-huu-ich",
    content: "TypeScript cung cấp nhiều utility types giúp thao tác với kiểu dữ liệu dễ dàng hơn.\n\n**Một số utility types phổ biến:**\n- `Partial<Type>`: Tất cả thuộc tính thành optional\n- `Required<Type>`: Tất cả thuộc tính thành required\n- `Readonly<Type>`: Tất cả thuộc tính thành readonly\n- `Pick<Type, Keys>`: Chọn một tập con các thuộc tính\n- `Omit<Type, Keys>`: Loại bỏ một tập con các thuộc tính\n- `ReturnType<Type>`: Lấy kiểu trả về của hàm\n\nSử dụng utility types giúp code ngắn gọn và an toàn hơn.",
    thumbnail: "https://picsum.photos/id/13/300/200",
    tags: ["typescript"],
    status: "published",
    createdAt: "2024-04-05",
    author: "Trần Thị B",
    views: 140,
  },
  {
    id: "15",
    title: "State Management với Context API",
    slug: "state-management-voi-context-api",
    content: "Context API là giải pháp quản lý state có sẵn trong React, phù hợp cho các ứng dụng có nhu cầu chia sẻ state ở mức trung bình.\n\n**Các bước sử dụng:**\n1. Tạo context: `const MyContext = React.createContext(defaultValue);`\n2. Cung cấp giá trị: `<MyContext.Provider value={value}>...</MyContext.Provider>`\n3. Sử dụng giá trị: `const value = useContext(MyContext);`\n\nContext kết hợp với useReducer có thể thay thế Redux cho nhiều ứng dụng.",
    thumbnail: "https://picsum.photos/id/14/300/200",
    tags: ["react", "state-management"],
    status: "draft",
    createdAt: "2024-04-10",
    author: "Lê Văn C",
    views: 65,
  },
];

let tags: TagType[] = [
  { id: "1", name: "react" },
  { id: "2", name: "typescript" },
  { id: "3", name: "antd" },
  { id: "4", name: "redux" },
  { id: "5", name: "performance" },
  { id: "6", name: "nextjs" },
  { id: "7", name: "api" },
  { id: "8", name: "javascript" },
  { id: "9", name: "css" },
  { id: "10", name: "testing" },
  { id: "11", name: "hooks" },
  { id: "12", name: "router" },
  { id: "13", name: "forms" },
  { id: "14", name: "configuration" },
  { id: "15", name: "state-management" },
];

// Helper functions
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// API Functions
export const getPosts = (): Post[] => {
  return [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getPublishedPosts = (): Post[] => {
  return getPosts().filter((post) => post.status === "published");
};

export const getPostBySlug = (slug: string): Post | undefined => {
  return posts.find((post) => post.slug === slug);
};

export const searchPosts = (keyword: string): Post[] => {
  if (!keyword.trim()) return getPublishedPosts();
  const lowerKeyword = keyword.toLowerCase();
  return getPublishedPosts().filter(
    (post) =>
      post.title.toLowerCase().includes(lowerKeyword) ||
      post.author.toLowerCase().includes(lowerKeyword) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword))
  );
};

export const filterByTag = (tag: string): Post[] => {
  if (!tag) return getPublishedPosts();
  return getPublishedPosts().filter((post) => post.tags.includes(tag));
};

export const incrementView = (postId: string): void => {
  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.views += 1;
  }
};

// Post CRUD
export const addPost = (post: Omit<Post, "id" | "slug" | "views" | "createdAt">): void => {
  const newPost: Post = {
    ...post,
    id: Date.now().toString(),
    slug: generateSlug(post.title),
    views: 0,
    createdAt: new Date().toISOString().split("T")[0],
  };
  posts = [newPost, ...posts];
  message.success("Thêm bài viết thành công!");
};

export const updatePost = (id: string, updatedData: Partial<Post>): void => {
  const index = posts.findIndex((p) => p.id === id);
  if (index !== -1) {
    if (updatedData.title) {
      updatedData.slug = generateSlug(updatedData.title);
    }
    posts[index] = { ...posts[index], ...updatedData };
    message.success("Cập nhật bài viết thành công!");
  }
};

export const deletePost = (id: string): void => {
  posts = posts.filter((p) => p.id !== id);
  message.success("Xóa bài viết thành công!");
};

// Tag CRUD
export const getTags = (): TagType[] => {
  return [...tags];
};

export const getTagPostCount = (tagName: string): number => {
  return posts.filter((post) => post.tags.includes(tagName)).length;
};

export const addTag = (tagName: string): void => {
  if (tags.some((t) => t.name === tagName)) {
    message.error("Tag đã tồn tại!");
    return;
  }
  const newTag: TagType = {
    id: Date.now().toString(),
    name: tagName.toLowerCase(),
  };
  tags = [...tags, newTag];
  message.success("Thêm tag thành công!");
};

export const updateTag = (id: string, newName: string): void => {
  const index = tags.findIndex((t) => t.id === id);
  if (index !== -1) {
    const oldName = tags[index].name;
    tags[index] = { ...tags[index], name: newName.toLowerCase() };
    // Update posts that have this tag
    posts = posts.map((post) => ({
      ...post,
      tags: post.tags.map((t) => (t === oldName ? newName.toLowerCase() : t)),
    }));
    message.success("Cập nhật tag thành công!");
  }
};

export const deleteTag = (id: string): void => {
  const tagToDelete = tags.find((t) => t.id === id);
  if (tagToDelete) {
    tags = tags.filter((t) => t.id !== id);
    // Remove tag from posts
    posts = posts.map((post) => ({
      ...post,
      tags: post.tags.filter((t) => t !== tagToDelete.name),
    }));
    message.success("Xóa tag thành công!");
  }
};