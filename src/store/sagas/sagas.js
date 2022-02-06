import { all } from "redux-saga/effects";
import {
  listenCreateBillEntry,
  listenGetAllBillEntry,
  listenGetBillEntry
} from "./bill.sagas";
import {
  listenCreateLocations,
  listenGetLocationList,
  listenUpdateLocations
} from "./location.sagas";
import {
  listenCodeVerify,
  listenConfirmCodeVerify,
  listenEmailSent,
  listenGetUserProfile,
  listenLogin
} from "./login.sagas";
import {
  listenActivateDeactivateAdminById,
  listenAddAdmin,
  listenCodeVerifyRooms,
  listenDeleteAdmin,
  listenGetAdminById,
  listenGetUserList,
  listenUpdateAdmin
} from "./user.saga";
export default function* rootSaga() {
  yield all([
    /* Login Related Sagas */
    listenLogin(),
    listenGetUserProfile(),
    listenCodeVerify(),
    listenConfirmCodeVerify(),
    listenEmailSent(),

    /* User actions related Sagas */
    listenGetUserList(),
    listenActivateDeactivateAdminById(),
    listenDeleteAdmin(),
    listenAddAdmin(),
    listenCodeVerifyRooms(),
    listenGetAdminById(),
    listenUpdateAdmin(),

    /* Location Sagas */
    listenGetLocationList(),
    listenCreateLocations(),
    listenUpdateLocations(),

    /* BillBook Sagas */
    listenCreateBillEntry(),
    listenGetBillEntry(),
    listenGetAllBillEntry(),
  ]);
}
