import instance from "../utils/request";
// export  const  自定义接口名  =  (形参)  =>  instance.方法(路径，后端要的参数);
// post请求 ，没参数
export const LogoutAPI = () => instance.post("/admin/logout");

// post请求，有参数
export const loginAPI = (data: IloginParam): dataAPI<ILoginData> =>
  instance.post("/admin/login", data);

// post请求 ，没参数，但要路径传参
export const StatusAPI = (data: IupdateNavStatus): dataAPI<number> =>
  instance.post(`/productCategory?ids=${data.id}&navStatus=${data.navStatus}`);

//  get请求，没参数，
export const FlashSessionListApi = (): dataAPI<{}[]> =>
  instance.get("/flashSession/list");

// get请求，有参数，路径也要传参
export const ProductCategoryApi = (params: IUseTableParam): dataAPI<any> =>
  instance.get(`/productCategory/list/${params.parentId}`, { params });

// get请求，有参数，
export const AdminListAPI = (params: IAdminListParam): dataAPI<AdminListDate> =>
  instance.get("/admin/list", { params });

export function login(data) {
  return instance({
    url: "/sys/login",
    method: "post",
    data,
  });
}
