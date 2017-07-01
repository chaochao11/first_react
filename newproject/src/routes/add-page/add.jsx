import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

class Add extends React.Component {
	constructor(props) {
		super(props)
		if (this.props.params.id !== "undefined") {
			let { listData } = this.props.list ;
			listData.map( ( data ) => {
				if(data.id == this.props.params.id) {
					this.state = {
						title: data.title,
						des: data.des
					}
				}
			} )
		} else {
			this.state = {
				title: "",
				des: ""
			}
		}
	}

	submit() {
    this.props.form.validateFields((error, value) => {
    	let { id } = this.props.params;
    	let { listData } = this.props.list;
    	if(!error && id === 'undefined') {
    		this.props.dispatch({
    			type: 'list/add',
    			payload: { ...value , img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493094867118&di=84794e93680fca1ca304edb6f2bd0e9c&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F51%2F70%2F22D58PICIsw.jpg',id:listData
        }
    		})
    	}
    	this.props.dispatch(
    		routerRedux.goBack()
    	)
    });
  }

  goBack() {
  	this.props.dispatch(
  		routerRedux.goBack()
  	)
  }


  render() {
  	const { getFieldProps, getFieldError } = this.props.form;
    return (
    	<div>
    		<div style={{textAlign: 'left'}}>
    			<Button type="ghost" inline style={{margin:"10px"}} onClick={::this.goBack}>返回</Button>
    		</div>
        <List renderHeader={() => '请输入标题和简介'}>
          <InputItem
            {...getFieldProps('title',{
                rules: [{
                  required: true,
                  message: '必填',
                }],
                initialValue: this.state.title ? this.state.title : ''
              })}
            clear
            placeholder="输入标题"
          >标题</InputItem>
        <InputItem
          {...getFieldProps('des',{
              rules: [{
                required: false,
                message: '非必填',
              }],
              initialValue: this.state.des ? this.state.des : ''
            })}
          clear
          placeholder="简介"
        >简介</InputItem>
      </List>

        <WhiteSpace/>
        <Button className="btn" type="primary" onClick={::this.submit}>提交</Button>
      </div>
    )
  }
}

function mapStateToProps ({ list }) {
  return { list }
}

Add= createForm()(Add);

export default connect(mapStateToProps)(Add);