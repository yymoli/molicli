/**
 * [getUID description] 每个请求都需要带一个deviceId参数过去
 * @return {[type]} [description]
 */
export const getDeviceidAndToken = () => {

  // android ：69T7N15823020185867875020178155
  // ios ：796C4872-32FF-4F03-94AD-125D43BBD838
  var deviceId = summer.getDeviceInfo().deviceid || "69T7N15823020185867875020178155";

  var userinfo = summer.getStorage("userinfo");

  var token = userinfo ? userinfo.token : "ab48a8ce7e38a3e52d3dc57b0cc6252a";

  return { deviceId, token}
}
