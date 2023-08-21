import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as itemAPI from "../../lib/api/item";
export function* itemSaga() {
  yield takeLatest(actions.INPUT_IMAGE, inputImageSaga);
  yield takeLatest(actions.INPUT_ITEM, inputItemSaga);
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
    yield put(actions.inputImage.failure(e));
  }
}
function* inputItemSaga(action: ReturnType<typeof actions.inputItem.request>) {
  try {
    yield call(itemAPI.inputItem, action.payload);
    // yield put(actions.inputItem.success(response.data));
  } catch (e: any) {
    console.error(e);
    yield put(actions.inputItem.failure(e));
  }
}
