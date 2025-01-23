import React, { useState } from "react";
import { Search } from "lucide-react";

const BoardPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // 샘플 게시글 데이터
  const posts = [
    {
      id: 1,
      title: "취업 준비 꿀팁 공유합니다",
      author: "김멘토",
      category: "취업/진로",
      views: 128,
      likes: 25,
      comments: 12,
      createdAt: "2024-01-19",
    },
    {
      id: 2,
      title: "개발자 커리어 로드맵",
      author: "이선배",
      category: "IT/개발",
      views: 256,
      likes: 42,
      comments: 18,
      createdAt: "2024-01-18",
    },
    // 더미 데이터 추가
    ...Array.from({ length: 8 }, (_, i) => ({
      id: i + 3,
      title: `게시글 제목 ${i + 3}`,
      author: `작성자${i + 3}`,
      category: i % 2 === 0 ? "일반" : "질문",
      views: Math.floor(Math.random() * 200),
      likes: Math.floor(Math.random() * 50),
      comments: Math.floor(Math.random() * 20),
      createdAt: "2024-01-17",
    })),
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* 상단 배너 */}
      <div className="bg-gradient-to-r from-blue-600 to-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">커뮤니티</h1>
          <p className="mt-2 text-white/90">선배들과 함께 나누는 이야기</p>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 검색 및 필터 영역 */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          {/* 카테고리 필터 */}
          <div className="flex gap-2">
            <CategoryButton active>전체</CategoryButton>
            <CategoryButton>취업/진로</CategoryButton>
            <CategoryButton>IT/개발</CategoryButton>
            <CategoryButton>일반</CategoryButton>
          </div>

          {/* 검색바 */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* 게시글 목록 */}
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    제목
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    카테고리
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작성자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    조회
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    날짜
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {post.title}
                        </span>
                        <span className="text-xs text-gray-500">
                          댓글 {post.comments}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {post.author}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {post.views}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {post.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 하단 버튼 및 페이지네이션 */}
        <div className="mt-6 flex justify-between items-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            글쓰기
          </button>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded-md ${
                  page === 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryButton = ({ children, active }) => (
  <button
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
      ${
        active
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
  >
    {children}
  </button>
);

export default BoardPage;
