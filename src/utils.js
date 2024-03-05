import { error } from "./components/Message/Message"

// dừng để trả về kiểu dữ liệu Json
export const isJsonString = (data) => {
  try {
      JSON.parse(data)
  } catch (error) {
      return false
  }
  return true
}

// dùng để xử lý hình ảnh
// chuyển về kiểu --base64--
export const getBase64 = (file) => 
new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

// icon của trang admin
export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}

// cái bẳng type trong create sản phẩm
export const renderOption = (arr) => {
  let results = []
  if(arr) {
    results = arr?.map((opt) => {
      return {
        value: opt,
        label: opt
      }
    })
  }
  results.push({
    label: 'Them_type',
    value: 'Add_type'
  })
  return results
}


// xử lý phần price
// toLocaleString: phân biệt đơn vị tiền bằng dấu ngắn cách dấu phẩy
// replaceAll: đổi dấu phẩy thành dấu chấm
// chuyển dấu phẩy mặc định thành dấu chấm thôi thêm VND phía sau
export const convertPrice = (price) => {
  try {
    const result = price?.toLocaleString().replaceAll(',','.')
    return `${result} VND`
  } catch (error) {
    return null
  }
}
