import { Steps } from 'antd'
import React from 'react'

const Step = ({ current = 0, items = [] }) => {
    return (
        <Steps
            current={current}
            items={items}
        />
    )
}

export default Step
