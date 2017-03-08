import { handleActions } from 'redux-actions';
import { action } from '../actions/';

const initialState = {
  // monthData: [], // 月数据
  month: '', // 当前月份
  total: 1, // 总指标个数
  index: 1, // 当前页数
  pageCount: 4, // 每页指标个数
  userOa: '', // 登陆者oa账号
  orderingRule: [], // 从手机端发送过来的排序规则
  personality: {}, // 个性化显示
  classify: [], // 分类
  err: {}, // 错误信息
};

const reducer = handleActions({
  // [action.QUERY_MONTH_DATA]: {
  //   next(state, action) {
  //     const { message, code, rows } = action.payload;
  //     if (code === '0') {
  //       return Object.assign({}, state, {
  //         monthData: rows,
  //         err: {},
  //       });
  //     }
  //     return Object.assign({}, state, {
  //       monthData: [],
  //       err: Object.assign({}, state.err, {
  //         monthData: message,
  //       }),
  //     });
  //   },
  //   throw(state, action) {
  //     const err = action.payload;
  //     return {
  //       err: Object.assign({}, state.err, {
  //         monthData: err,
  //       }),
  //     };
  //   },
  // },
  [action.SET_MONTH]: (state, action) => {
    return Object.assign({}, state, {
      month: action.payload,
    });
  },
  [action.SET_INDEX]: (state, action) => {
    return Object.assign({}, state, {
      index: action.payload,
    });
  },
  [action.SET_USEROA]: (state, action) => {
    return Object.assign({}, state, {
      userOa: action.payload,
    });
  },
  [action.SET_ORDERING_RULE]: (state, action) => {
    return Object.assign({}, state, {
      orderingRule: action.payload,
    });
  },
}, initialState);

export default reducer;
