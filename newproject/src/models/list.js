export default {
  namespace: 'list',
  state: {
    listData:[
      // {
      //   img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
      //   title: '相约酒店',
      //   des: '不是所有的兼职汪都需要风吹日晒',
      //   id:1
      // },
      // {
      //   img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
      //   title: '食惠周',
      //   des: '不是所有的兼职汪都需要风吹日晒',
      //   id:2
      // }
    ],
  },
  /*订阅*/
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'add' });
    },
  },
  // reducers: {
  //   save(state, action) {
  //     return { ...state, ...action.payload };
  //   },
  // },

  reducers: {
    add( state, { payload } ) {
      return { ...state, listData: [ payload, ...state.listData ] }
    },
    update( state, { payload } ) {
      let newData = state.listData.map( (data) => {
        if(data.id === payload.id) {
          return { ...data , ...payload}
        }else {
          return data
        }
      } )
      return { ...state , listData: newData }
    },
    remove( state, { payload } ) {
      let newData = state.listData.filter( ( { id } ) => id !== payload.id );
      return { ...state, listData: newData }
    },
    updateDateValue( state, { payload }) {
      return { ...state, dateValue: payload }
    }
  },
};



