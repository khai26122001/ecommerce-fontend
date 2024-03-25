import { Checkbox, Rate } from "antd"
import React from "react"
import { WrapperLableText, WrapperContent, WrapperTextPrice } from './style'
import TypeProduct from "../TypeProduct/TypeProduct"

const NvaBarComponents = ({ typeProducts }) => {
    const onChange = () => { }
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                // lúc này --options-- là --typeProducts-- nên ta sẽ sỗ ra toàn bộ dữ liệu
                return options.map((option) => {
                    // console.log('option111', option)
                    return (
                        // <React.Fragment> được sử dụng để bao bọc phần tử <TypeProduct>. Trong trường hợp này, nó cho phép 
                        // bạn render ra một danh sách các phần tử <TypeProduct> mà không cần thêm bất kỳ phần tử HTML nào khác

                        // lúc này key={option}: tương ứng với mỗi cái --type-- để phân biệt hiển thị ra
                        <React.Fragment key={option}>
                            <TypeProduct name={option} key={option} />
                        </React.Fragment>
                    );
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px', marginBottom: '15px' }} onChange={onChange} >
                        {options.map((option, index) => {
                            return (
                                <Checkbox key={index} style={{ marginLeft: 0 }} value={option.value}>{option.label} Lựa Chọn</Checkbox>
                            )
                        })}
                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option, index) => {
                    return (
                        <div key={index} style={{ display: 'flex' }}>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span>&emsp; {`từ ${option} sao`} </span>
                        </div>
                    )
                })
            case 'price':
                return options.map((option, index) => {
                    return (
                        <WrapperTextPrice style={{ marginBottom: '-10px' }} key={index}>{option}</WrapperTextPrice>
                    )
                })
            default:
                return {}
        }
    }

    return (
        <div>
            <WrapperLableText>Lable</WrapperLableText>
            <WrapperContent>
                {renderContent('text', [...typeProducts])}
                {/* <div>
                    {typeProducts.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                </div> */}
            </WrapperContent>
            <WrapperContent>
                {renderContent('checkbox', [
                    { value: 'a', lable: 'A' },
                    { value: 'b', lable: 'B' }
                ])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('star', [3, 4, 5])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('price', ['duoi 40', 'tren 50.000'])}
            </WrapperContent>

        </div>
    )
}

export default NvaBarComponents