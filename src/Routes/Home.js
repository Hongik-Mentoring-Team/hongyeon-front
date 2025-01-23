import React from "react";

const Navbar = () => (
  <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="text-2xl font-bold text-blue-600">캠퍼스 커넥트</div>
        <div className="hidden md:flex space-x-8">
          <NavLink href="/board">게시판</NavLink>
          <NavLink href="#mentors">멘토찾기</NavLink>
          <NavLink href="#about">서비스소개</NavLink>
          <NavLink href="/login">로그인</NavLink>
        </div>
      </div>
    </div>
  </nav>
);

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-700 hover:text-blue-600 transition-colors"
  >
    {children}
  </a>
);

const Hero = () => (
  <section className="pt-24 pb-16 bg-gradient-to-r from-blue-600 to-gray-800">
    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
        선배와 후배의 만남, 더 나은 미래로 가는 길
      </h1>
      <p className="text-xl text-white/90 mb-8">
        현직에서 활동 중인 선배들의 경험과 조언으로 여러분의 꿈에 한 걸음 더
        가까워지세요.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="primary">멘티로 시작하기</Button>
        <Button variant="secondary">멘토로 참여하기</Button>
      </div>
    </div>
  </section>
);

const Button = ({ variant, children }) => {
  const baseClasses =
    "px-6 py-3 rounded-lg font-semibold transition-transform hover:scale-105";
  const variants = {
    primary: "bg-white text-blue-600",
    secondary: "bg-transparent text-white border-2 border-white",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </button>
  );
};

const Features = () => (
  <section id="features" className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          title="1:1 멘토링"
          description="관심 분야의 현직자와 1:1 멘토링을 통해 실질적인 경력 개발 조언을 받으세요."
        />
        <FeatureCard
          title="커리어 로드맵"
          description="선배들의 경력 경로를 통해 나만의 커리어 로드맵을 설계해보세요."
        />
        <FeatureCard
          title="네트워킹"
          description="같은 목표를 가진 동문들과 네트워크를 형성하고 함께 성장하세요."
        />
      </div>
    </div>
  </section>
);

const FeatureCard = ({ title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <h3 className="text-xl font-semibold text-blue-600 mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Stats = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <StatItem number="1,000+" label="활동 멘토" />
        <StatItem number="5,000+" label="매칭 성사" />
        <StatItem number="50+" label="협력 대학" />
      </div>
    </div>
  </section>
);

const StatItem = ({ number, label }) => (
  <div>
    <h2 className="text-4xl font-bold text-blue-600 mb-2">{number}</h2>
    <p className="text-gray-600">{label}</p>
  </div>
);

const Testimonials = () => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-8">
        <TestimonialCard
          quote="현직 선배님과의 멘토링을 통해 진로를 확실히 정할 수 있었습니다. 실무 이야기를 들을 수 있어 매우 유익했어요."
          author="김철수"
          role="컴퓨터공학과 3학년"
        />
        <TestimonialCard
          quote="후배들에게 도움이 되는 경험을 공유할 수 있어서 보람찼습니다. 저 역시 많이 배우는 시간이었습니다."
          author="이영희"
          role="IT기업 5년차 개발자"
        />
      </div>
    </div>
  </section>
);

const TestimonialCard = ({ quote, author, role }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <p className="text-gray-600 mb-4">"{quote}"</p>
    <div>
      <strong className="text-gray-900">{author}</strong>
      <span className="text-gray-500 ml-2">- {role}</span>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">캠퍼스 커넥트</h3>
          <p className="text-gray-400">
            선배와 후배를 잇는 대학생 멘토링 플랫폼
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">문의하기</h3>
          <p className="text-gray-400">이메일: contact@campusconnect.kr</p>
          <p className="text-gray-400">전화: 02-123-4567</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">바로가기</h3>
          <div className="space-y-2 text-gray-400">
            <p>서비스 소개</p>
            <p>이용약관</p>
            <p>개인정보처리방침</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default App;
