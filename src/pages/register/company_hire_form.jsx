import C_P_R_F from "./antd/C_P_Register_form";
export default function Company_register_form() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="sm:w-1/2 p-8 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-center items-center flex-col  m-0 sm: sm:w-full sm:max-w-5xl">
            <img
              alt="Your Company"
              src="https://jorim.in/wp-content/uploads/2020/10/cropped-Jorim-Logo.png"
              className=" w-64"
            />
            <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div className="m-0 mt-10  sm:w-full sm:max-w-5xl">
            <C_P_R_F />
          </div>
        </div>
      </div>
    </>
  );
}
