import styled from "styled-components";
import ButtonComponents from "../../components/ButtonComponents/ButtonComponents";

export const WrapperTypeProduct= styled.div`
    display: flex;
    align-item: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
`

export const WrapperButtonMore = styled(ButtonComponents)`
    &:hover {
        color: #fff;
        background: rgb(13, 93, 182);
        span {
            color: #fff;
        }
    }
    width: 100%;
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'}
`
// justify-content: center; muốn chỉnh giữa thì bỏ ái này vào
export const WrapperProducts = styled.div`
    display: flex;
    gap: 45px;
    margin-top: 20px;
    flex-wrap: wrap;
`