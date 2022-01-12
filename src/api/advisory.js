import request from "@/utils/request";

export function getRescueList(data) {
  return request({
    url: "BigScreen/Api/getRescueList",
    method: "post",
    data
  });
}
