import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as itemAPI from "../../lib/api/item";
export function* itemSaga() {
  yield takeLatest(actions.INPUT_IMAGE, inputImageSaga);
  yield takeLatest(actions.INPUT_ITEM, inputItemSaga);
yield takeLatest(actions.RELATE_ITEM,relationSaga);
}
function* relationSaga( action: ReturnType<typeof actions.relateItem.request>){
try{
const response:{data:string}=yield call(itemAPI.relate,action.payload);
yield put(actions.relateItem.success(response.data));

 
}catch(e:any){
console.error(e);
yield put(actions.relateItem.failure(e.response.data))
} 
}
function* inputImageSaga(
  action: ReturnType<typeof actions.inputImage.request>
) {
  try {
    const response: { data: { url: string }[] } = yield call(
      itemAPI.inputImage,
      action.payload
    );
    yield put(actions.inputImage.success(response.data));
  } catch (e: any) {
    console.error(e);
    yield put(actions.inputImage.failure(e.response.data));
  }
}
function* inputItemSaga(action: ReturnType<typeof actions.inputItem.request>) {
  try {
    const response: { data: string } = yield call(
      itemAPI.inputItem,
      action.payload
    );
    yield put(actions.inputItem.success(response.data));
  } catch (e: any) {
    console.error(e);

    yield put(actions.inputItem.failure(e.response.data));
  }
}
