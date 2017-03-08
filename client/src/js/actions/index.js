import { createAction } from 'redux-actions';

import * as api from '../api';

export const action = {
  QUERY_YEAR_DATA: 'QUERY_YEAR_DATA', // 查询年数据
  // QUERY_MONTH_DATA: 'QUERY_MONTH_DATA', // 查询月数据
  QUERY_DIM_INDEX_USER: 'QUERY_DIM_INDEX_USER',

  SET_INDEX: 'SET_INDEX', // 设置当前页码

  SET_USEROA: 'SET_USEROA', // 设置登陆者oa
  SET_MONTH: 'SET_MONTH', // 设置当前月份

  SET_ORDERING_RULE: 'SET_ORDERING_RULE', //设置排序规则
};

export const queryYearData = createAction(action.QUERY_YEAR_DATA, api.queryYearData);
// export const queryMonthData = createAction(action.QUERY_MONTH_DATA, api.queryMonthData);
export const queryDimIndexUser = createAction(action.QUERY_DIM_INDEX_USER, api.queryDimIndexUser);

export const setMonth = createAction(action.SET_MONTH);
export const setIndex = createAction(action.SET_INDEX);
// export const setForm = createAction(action.SET_FORM);
export const setUserOa = createAction(action.SET_USEROA);

export const setOrderingRule = createAction(action.SET_ORDERING_RULE);
