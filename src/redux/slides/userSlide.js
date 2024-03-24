import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  avatar: '',
  access_token: '',
  refreshToken: '',
  id: '',
  // này dùng để check xem phải admin ko nếu phải chuyến sang trang admin
  isAdmin: false,
  city: '',
}

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // lúc này bên phía client đã có được dữ liệu 
    // ta sẽ sử dụng --const count = useSelector((state) => state.counter.value)-- bên phía headerComponent.jsx để hiển thị
    updateUser: (state, action) => {
        // name = '': nếu ko có thì bằng rổng
        const { name = '', email = '', phone = '', address = '', avatar = '', access_token = '', _id = '', isAdmin, city = '',
        refreshToken = '' } = action.payload
        // do chưa có name nên cho nó bằng email luôn
        // state.name = name || email;
        state.name = name;
        state.email = email;
        state.phone = phone;
        state.address = address;
        state.avatar = avatar;
        state.id = _id;
        state.access_token = access_token;
        state.refreshToken = refreshToken;
        state.isAdmin = isAdmin;
        state.city = city;
        // sau khi kiểm tra ta sẽ thấy --action-- chưa toàn bộ 
        // bao gồm --_id, mail, password, isAdmin-- và --access_token-- 

        console.log('action111', action)
        console.log('state111', state)
    },
    // dùng để đăng xuất
    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.avatar = '';
      state.id = '';
      state.access_token = '';
      state.refreshToken = ''
      state.isAdmin = false;
      state.city = '';
    }, 
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer