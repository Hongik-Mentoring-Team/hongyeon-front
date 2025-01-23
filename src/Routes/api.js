import axios from "axios";

function api2() {
  const url = `http://localhost:8080/api/v1/members`;

  const getData = () => {
    axios
      .get(url)
      .then((result) => {
        // 성공한 경우 응답 처리
        console.log("응답 완료 : ", result.data);
      })
      .catch((err) => {
        console.error("에러 : ", err);
      });
  };

  return (
    <div className={`flex justify-center`}>
      <button
        className={`bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:outline-2 `}
        onClick={getData}
      >
        press api
      </button>
    </div>
  );
}
export default api2;
