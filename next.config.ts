import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "ac.goit.global" },
      { protocol: "https", hostname: "aliiev-lomach.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/notes/filter/:slug", // маршрут сторінки
        locale: false,
        headers: [
          {
            key: "Cache-Control", // Заголовок
            value: "public, max-age=300, must-revalidate", // кешуємо на 5 хв
          },
        ],
      },
    ];
  },
};

export default nextConfig;
