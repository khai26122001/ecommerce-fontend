import React, { Fragment, useEffect, useState } from 'react'
// thư viện này chắc sẽ có tác dụng là kiểu như điều hướng các trang thông qua 3 biến lấy trong thư viện 
// --'react-router-dom'-- là --BrowserRouter as Router, Routes, Route--
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// còn đây là trang mình tự cài để nhằm xử lý điều hướng theo ý mình thông qua --routes--
import { routes } from './routes'
import DefaultComponents from './components/DefaultComponents/DefaultComponents'

import { jwtDecode } from 'jwt-decode'
import { isJsonString } from './utils'

// sau khi --login-- thành công thi add thư viện này zo n
// dùng để lấy thông tin của user
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from './redux/slides/userSlide'

// link tới trang --UserService--
import * as UserService from './services/UserService'
// import { current } from '@reduxjs/toolkit'
import Loading from './components/loadingComponents/Loading'


// đây là trang chính của áp khi mới mở lên là trang này
function App() {

  // này để lấy thông tin user khi đăng nhập vào
  const [isPending, setIsPending] = useState(false)
  // nếu --isAdmin=true-- thì chuyển đến trang --admin-- còn ko thì chuyển đến trang --client--
  const user = useSelector((state) => state.user)

  // phần này dúng để duy trì cái --access_token-- ko bị mất khi --khởi động lại trang--
  const dispatch = useDispatch()

/* ------------------------------------------LÚC ĐẦU LÀM NHƯ NÀY---------------------------------------------
    useEffect(() => {
      // lúc này ta sẽ --getItem-- lấy dữ liệu ra bên phía --signIn-- từ --setItem-- trước đó
      // lúc này ta sẽ nhận được cái --access_token-- bên phía --app.js-- nhằm duy trì nó ko mất khi khởi động lại
      let storageData = localStorage.getItem('access_token')
      console.log('storageDataApp', storageData, isJsonString(storageData))
      // nếu tồn tại cái --access_token và true-- thì thực hiện
      if(storageData && isJsonString(storageData)) {
          // chuyển về kiểu --json--
          storageData = JSON.parse(storageData)
          // dùng để nhận cái  --id và isAdmin-- của user thông qua hàm ---jwtDecode()--- với biến là --access_token--
          const decode = jwtDecode(storageData)
          console.log('decodeApp', decode)
          // nếu có decode?.id thì chuyền --id và access_token-- vào hàm --handleGetDetailsUser-- tạo bên dưới
          if(decode?.id) {
              // truyền --id và access_token-- vào hàm
              handleGetDetailsUser(decode?.id, storageData)
          }
      }
  }, [])
*/

useEffect(() => {
  // dùng để chuyển sang trang --Admin--
  // sau khi mới chạy vào thì sét nó bằng --true--
  setIsPending(true)

  // gọi tới hàm --handleDecoded-- để lấy --decode, storageData--
  const { storageData, decode } = handleDecoded()
  // nếu có decode?.id thì chuyền --id và access_token-- vào hàm --handleGetDetailsUser-- tạo bên dưới
  if(decode?.id) {
      // truyền --id và access_token-- vào hàm
      handleGetDetailsUser(decode?.id, storageData)
  }

  // dùng để chuyển sang trang --Admin--
  // sau khi lấy dữ liệu xong thì ta sẽ sét lại bằng --false--
  setIsPending(false)

}, [])


// tạo ra --function-- dùng để cấp lại -access_token-- mới
const handleDecoded = () => {
  // lúc này ta sẽ --getItem-- lấy dữ liệu ra bên phía --signIn-- từ --setItem-- trước đó
  // lúc này ta sẽ nhận được cái --access_token-- bên phía --app.js-- nhằm duy trì nó ko mất khi khởi động lại
  let storageData = localStorage.getItem('access_token')
  let decode = {}
  // console.log('storageDataApp', storageData, isJsonString(storageData))
  
  // nếu tồn tại cái --access_token và true-- thì thực hiện
  if(storageData && isJsonString(storageData)) {
      // chuyển về kiểu --json--
      storageData = JSON.parse(storageData)
      // dùng để nhận cái  --id và isAdmin-- của user thông qua hàm ---jwtDecode()--- với biến là --access_token--
      decode = jwtDecode(storageData)
      console.log('decodeApp', decode)
  }
  return { decode, storageData}
}


// ở trong đây sẽ có 1 cái confign
// nó sẽ chạy vào trong cái --config-- này trước khi mình --getdetail--
// nên mình sẽ check ở đây 
// nếu --access_Token-- hết hạn thì sẽ gọi tới thằng --refreshToken-- để cấp lại cái -access_token-- mới cho --getdetail--

// để cho khi mình gọi tới GetDetail thì sẽ gọi tới --Userservice.axiosJWT ---bên phía --UserService-- tạo ra
UserService.axiosJWT.interceptors.request.use(async (config) => {
  
  // để lấy thời gian hiện tại
  const currentTime = new Date()

  // gọi tới hàm --handleDecoded-- để lấy --decode, storageData--
  const { decode } = handleDecoded()
  // console.log('decode test', decode)


  // let storageRefreshToken = localStorage.getItem('refresh_token')
  // const refreshToken = JSON.parse(storageRefreshToken)
  // const decodedRefreshToken =  jwt_decode(refreshToken)


  // lúc này mình se check nếu: thời gian --token-- hết hạn (--decode?.exp--) nếu bé hơn thời gian 
  // hiện tại (--currentTime.getTime() / 1000)--) của mình thì thực hiện
  if (decode?.exp < currentTime.getTime() / 1000) {
    // gọi tới để cấp lại --token--
    const data = await UserService.refreshToken()
    // sau khi có được data.access_token ta sẽ tiến hành lấy ra
    config.headers['token'] = `Bearer ${data?.access_token}`
    // console.log('config.headers', config.headers['token'])
  }
  return config;
}, (err) => {
  // Do something with request error
  return Promise.reject(err);
})



// tạo ra 1 cái function để chuyền vào --id và token-- nhằm --call API đến server--
// lúc này ta sẽ nhận được --id và access_token--
const handleGetDetailsUser = async (id, token) => {
    
    try {
      // let storageRefreshToken = localStorage.getItem('refresh_token')
      // const refreshToken = JSON.parse(storageRefreshToken)

      // sau khi truyền --id và access_token-- vào thì ta lấy được thông tin của --user-- 
      // gồm có --_id, mail, password, isAdmin--
      const res = await UserService.getDetailsUser(id, token)
      // console.log('resApp', res)

      // ta sẽ chuyền thông tin --_id, mail, password, isAdmin-- và --access_token-- cho updateUser
      // để lấy ra sử dụng bên phía --client-- thì phải
      dispatch(updateUser({ ...res?.data, access_token: token }))
    } catch (error) {
      
    }
    
}

  return (
    <div> 
      <Loading isPending={isPending}>
        <Router>
          <Routes>
            {/* lấy tất cacr dữ liệu trong --routes-- rồi gán vào biến --route-- */}
            {routes.map((route) => {
              // vì trong --element-- chữ đầu phải viết hoa
              // nên phải tạo Page ở bên ngoài --const Page = route.page--
              const Page = route.page

              // -------
              // này dùng để check xem phải là admin ko
              // cho --ischheckAuth-- bằng --false--
              // hoặc --user.isAdmin-- bằng --True-- thì hiển thị trang --Admin-- còn ko phải --true-- thì hiển thị trang lỗi
              const ischheckAuth = !route.isPrivate || user.isAdmin 



              // -------


              // nếu --isShowHeader==true-- ta làm bên trong --routes-- thì sẽ thực hiện --DefaultComponents--
              // có nghĩa là hiện trang header lên 
              // còn ngược lại thì sẽ là --Fragment--
              const Layout = route.isShowHeader ? DefaultComponents : Fragment
              return (

                // chỗ này nếu --route.isPrivate-- bằng --false-- thì hiển thị ra các đường link này
                // nghĩa là hiển thị ra trang --client--
                <Route key={route.path} path={ischheckAuth && route.path} element={
                  // bọc cái layout tạo ở trên lại để hiển thị cái header mong muốn
                  <Layout>
                    {/* Page này là của (const Page = route.page) dùng để link tới cái trang page tương ứng */}
                    <Page />
                  </Layout>
                } />
              )
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  )
}

export default App