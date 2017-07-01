import React from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import {ListView,Button,SearchBar} from 'antd-mobile';
import moment from 'moment';
import DatePickerComponent  from '../../components/date-picker.jsx'
function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      {/*<span style={{ display: 'none' }}>you can custom body wrap element</span>*/} 
      {props.children}
    </div>
  );
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource.cloneWithRows( this.props.list.listData ),
      isLoading: true,
    };
  };
componentWillReceiveProps(nextProps) {
    this.setState( {
       dataSource: this.state.dataSource.cloneWithRows( nextProps.list.listData )
    } );
  }
/*添加*/
  goAddPage(id) {
    this.props.dispatch(
     routerRedux.push(`/add/${id ? id : 'undefined'}`)
    );
  }
/*删除*/
  handleRemove(rowData) {
    this.props.dispatch( {
      type: 'list/remove',
      payload: rowData
    } );
  }
/*模糊搜索*/
  handleChange(value) {
    let filterList = this.props.list.listData.filter( (data) => {
      return data.title.indexOf(value) !== -1;
    } );
    this.setState( {
       dataSource: this.state.dataSource.cloneWithRows( filterList )
    } );
  }

render() {

  {/*datepickerprops*/}
  let { dateValue } = this.props.list;
  let { dispatch } = this.props;
  const zhNow = moment().locale('zh-cn');
  const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
  const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);
  const datepickerprops={
    mode: 'date',
    title: '选择日期',
    extra: "日期显示处",
    value: dateValue,
    maxDate: maxDate,
    minDate: minDate,
    /*点击确定选择时间*/
    onOk: (val) => {
      dispatch( {
        type: 'list/updateDateValue',
        payload: val
      } );
    }
  }
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} 
           style={{
              backgroundColor: '#F5F5F9',
              height: 10,
              borderTop: '1px solid #dee',
              borderBottom: '1px solid #dee',
      }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
    return (
      <div key={rowData.id}
        style={{
          padding: '0.08rem 0.16rem',
          backgroundColor: 'white'
        }}>
        <h3 style={{ padding: 2, marginBottom: '0.08rem', borderBottom: '1px solid #F6F6F6' }} onClick={ () => this.goAddPage(rowData.id) }>
          {rowData.title}
        </h3>
        <div style={{ display: '-webkit-box', display: 'flex',padding:'0.3rem 0'}}>
          <img style={{ height: '1.28rem', marginRight: '0.08rem',width:'1.28rem' }} src={rowData.img} />
          <div style={{ display: 'inline-block' }}>
            <p style={{ margin: 0, marginTop: '0.1rem' }}>{rowData.des}</p>
            <Button type="ghost" size="small" inline style={{ marginTop:'15px' }} onClick={ () => this.handleRemove(rowData) }>删除</Button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Button type="ghost" inline style={{ margin: '10px' }} onClick={() => this.goAddPage()}>添加</Button>
      </div>
      <DatePickerComponent {...datepickerprops} />
      <div>
        <SearchBar
          placeholder="搜索"
          onChange={(value) => { this.handleChange(value) }} />
      </div>
      <ListView
        ref="lv"
        dataSource={this.state.dataSource}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        renderBodyComponent={() => <MyBody />}
        style={{
          height: document.documentElement.clientHeight * 3/4,
          overflow: 'auto',
          border: '1px solid #ddd',
          margin: '0.1rem 0',
        }}
        scrollRenderAheadDistance={50}
        scrollEventThrottle={20}
        onEndReachedThreshold={10} />
    </div>
  );
  };

}

function mapStateToProps ({ list }) {
  return { list };
}

export default connect(mapStateToProps)(Demo);