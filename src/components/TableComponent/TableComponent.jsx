import { Table } from 'antd';
import React, { useMemo, useState } from 'react'
import Loading from '../loadingComponents/Loading';
// import { DownOutlined } from '@ant-design/icons'

// thư viện dùng để xuất dữ liệu ra excel
import { Excel } from 'antd-table-saveas-excel';

const TableComponent = (props) => {
  const { selectionType = 'checkbox', data: dataSource = [], isPending = false, columns = [], handleDeleteManyProduct } = props
  const [rowSelectedKeys, setRowSelectedKeys] = useState([])

  // bên trong colums nó có cái thằng --action-- là icon thì ko in ra dx excel
  // nên giờ ta phải loại bỏ nó đi bằng cách
  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== 'action')
    return arr
  }, [columns])


  const rowSelection = {
    // chỗ này sẽ hiển thị lên --selectedRowKeys-- chả về cho ta 1 mảng id khi chúng ta kik vào --checkbox--
    onChange: (selectedRowKeys, selectedRows) => {
      // --selectedRows-- dữ liệu
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows ', selectedRows);
      console.log(`selectedRowKeys: ${selectedRowKeys}`,);
      setRowSelectedKeys(selectedRowKeys)
    },
    // getCheckboxProps: (record) => ({
    //     disabled: record.name === 'Disabled User',
    //     name: record.name,
    // }),
  };

  // hàm dùng để xuất ra danh sách --ids-- để chuyển sang backend xóa
  const handleDeleteAll = () => {
    // lúc này ta sẽ chuyền cái mảng ids cho cái hàm --rowSelectedKeys--
    handleDeleteManyProduct(rowSelectedKeys)
  }


  // hàm dùng để lấy dữ liệu ra excel
  // ta phải tải trc mới dùng dx --npm i antd-table-saveas-excel --force--
  
  // console.log('dataSource', dataSource, columns)
  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataSource, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  };


  return (
    <Loading isPending={isPending} >
      {/* nếu cái số lượng vần xóa lớn hơn 0 thì sẽ hiện ra */}
      {rowSelectedKeys.length > 0 && (
        <div style={{
          background: '#1d1ddd',
          color: '#fff',
          fontWeight: 'bold',
          padding: '10px',
          cursor: 'pointer'
        }}
          onClick={handleDeleteAll}
        >
          Xóa tất cả
        </div>
      )}

      <button onClick={exportExcel}>Export Excel</button>

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        // rải ra để có thể nhận được cái --onRow--
        {...props}
      />
    </Loading>
  )
}

export default TableComponent
